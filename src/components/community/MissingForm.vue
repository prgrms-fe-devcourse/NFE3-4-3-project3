<script setup lang="ts">
import TitleText from '../common/TitleText.vue';
import TextInput from '@/components/community/TextInput.vue';
import TextareaInput from '@/components/community/TextareaInput.vue';
import SelecterInput from '@/components/community/SelecterInput.vue';
import KakaoMap from '@/components/community/KakaoMap.vue';
import { ANIMAL_TYPE_ARRAY, GENDER_ARRAY } from '@/constants/mock/community/formOptions';
import { reactive, ref, computed } from 'vue';
import usePostMissingForm from '@/composibles/tanstack-query/usePostMissingForm';
import { MissingChannelId } from '@/constants/communityConsts';
import { useRouter, useRoute } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import PATH from '@/constants/path';
import QUERY_KEY from '@/constants/queryKey';
import useFetchTargetMissing from '@/composibles/tanstack-query/useFetchTargetMissing';
import useUpdateMissingPost from '@/composibles/tanstack-query/useUpdateMissingPost';

// Page query 확인하기
const route = useRoute();
const { postId } = route.query;

// postId가 있으면 수정페이지이고 없으면 등록 페이지로 동작
// PostId에 해당하는 데이터를 받아와야함
const { post, isLoading, contents } = useFetchTargetMissing(postId ? postId : '');
const initialData = computed(() => {
  if (contents) {
    console.log('contetns', contents);
    return {
      name: contents.value?.name,
      phone: contents.value?.phone,
      species: contents.value?.species,
      age: contents.value?.age,
      furColor: contents.value?.furColor,
      RFID: contents.value?.RFID,
      feature: contents.value?.feature,
      animalType: contents.value?.animalType,
      gender: contents.value?.gender,
      date: contents.value?.date,
      placeFeature: contents.value?.placeFeature, // 실종 장소 특징
      region: contents.value?.region, // 관할지
    };
  } else {
    return {
      name: '',
      phone: '',
      species: '',
      age: '',
      furColor: '',
      RFID: '',
      feature: '',
      animalType: '',
      gender: '',
      date: '',
      placeFeature: '', // 실종 장소 특징
      region: '', // 관할지
    };
  }
});
const initialDoro = computed(() => {
  return post && contents && contents.value ? contents.value.address : '';
});
const initialImage = computed(() => {
  return post && post.value ? post.value[0].image : '';
});

const data = reactive({
  ...initialData.value,
});
const imageRef = ref<File | null>(initialImage.value); // 이미지 담을 배열
const imagePreviews = ref<string | null>(initialImage.value); // 이미지 미리보기 배열
const doroRef = ref<string>(initialDoro.value);
const postFormMutation = usePostMissingForm();
const updateFormMutation = useUpdateMissingPost();
const isValid = computed(() => {
  // data 배열을 돌면서 하나라도 비어있는 것이 있다면 false
  const dataResult = Object.values(data).every((value) => value.trim().length > 0);
  const imageResult = imageRef.value !== null; // 이미지가 있다면요
  const addressResult = doroRef.value.trim().length > 0;
  return dataResult && imageResult && addressResult;
});

const router = useRouter();
const queryClient = useQueryClient();
// 이미지 삭제
const removeImage = () => {
  imageRef.value = null;
  imagePreviews.value = null;
};
const handleImageChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  imageRef.value = null;
  if (input?.files) {
    const file = input.files[0];
    imagePreviews.value = URL.createObjectURL(file);
    imageRef.value = file;
  }
};
const handleSubmit = async () => {
  if (isValid.value) {
    // FormData만들기
    const post = {
      ...data,
      address: doroRef.value,
    };

    await postFormMutation.mutateAsync({
      title: JSON.stringify(post),
      channelId: MissingChannelId,
      image: imageRef.value ? imageRef.value : undefined,
    });

    if (postFormMutation.isSuccess) {
      alert('정상적으로 제출이 완료되었습니다.');
      // 기존 쿼리키를 무효화 하고 새롭게 데이터 요청
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.missingList,
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEY.missingList,
        type: 'all',
      });
      router.push(PATH.communityMissing);
    } else if (postFormMutation.isError) {
      alert('제출에 실패했습니다.');
      router.push(PATH.communityMissing);
    }
  } else {
    alert('작성하지 않은 제출란이 있습니다.');
  }
};
const handleUpdate = async () => {
  if (isValid.value) {
    const post = {
      ...data,
      address: doroRef.value,
    };
    console.log('전달될 image', imageRef.value);
    await updateFormMutation.mutateAsync({
      title: JSON.stringify(post),
      channelId: MissingChannelId,
      postId: postId,
      image: imageRef.value ? imageRef.value : undefined,
    });
    if (updateFormMutation.isSuccess) {
      alert('정상적으로 제출이 완료되었습니다.');
      // 기존 쿼리키를 무효화 하고 새롭게 데이터 요청
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.missingList,
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEY.missingList,
        type: 'all',
      });
      router.push(PATH.communityMissing);
    }
  } else {
    alert('아직 제출하지 않은 작성란이 있습니다.');
  }
};
</script>

<template>
  <div class="container overflow-hidden border border-light px-3 m-4 py-5">
    <div class="row gx-5">
      <div class="col px-5">
        <div class="d-flex flex-column gap-4">
          <TitleText size="32px" color="gray-10" weight="600" class="mb-3">
            👤 실종 신고자 정보
          </TitleText>
          <TextInput
            label="신고자"
            type="text"
            placeholder="성/이름"
            ariaLabel="이름"
            v-model="data.name"
          />
          <TextInput
            label="연락처"
            type="text"
            placeholder="- 없이 작성"
            ariaLabel="전화번호"
            v-model="data.phone"
          />
        </div>
        <div class="d-flex flex-column gap-4 mt-5">
          <TitleText size="32px" color="gray-10" weight="600" class="mb-3">
            🐻‍❄️ 실종동물 정보
          </TitleText>
          <!-- 이미지 업로드 -->
          <!-- <ImageUploader v-model="imageRef" /> -->
          <div>
            <div class="d-flex gap-3 mb-2">
              <!-- 사진 추가 -->
              <label
                for="image-upload"
                class="d-flex justify-content-center align-items-center border rounded-3"
                style="
                  width: 200px;
                  height: 200px;
                  cursor: pointer;
                  background-color: var(--gray-3);
                  border: 2px dashed var(--gray-7);
                "
              >
                <span class="text-center" style="font-size: 20px; color: #6c757d">+</span><br />
                <span style="font-size: 18px; color: #6c757d">이미지 업로드</span>
              </label>
              <input
                type="file"
                id="image-upload"
                @change="handleImageChange"
                class="d-none"
                multiple
              />
              <!-- 이미지 미리보기 -->
              <div class="position-relative" v-if="imagePreviews">
                <div class="d-flex justify-content-center align-items-center position-relative">
                  <img
                    :src="imagePreviews"
                    alt="Image preview"
                    style="width: 200px; height: 200px; object-fit: cover; border-radius: 8px"
                  />
                  <button
                    type="button"
                    class="btn btn-sm btn-danger position-absolute top-0 end-0"
                    @click="removeImage()"
                    style="z-index: 10; background-color: rgba(255, 255, 255, 0.5)"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          </div>
          <SelecterInput
            label="동물분류"
            selectorLabel="동물분류를 선택해주세요"
            ariaLabel="동물 타입 선택자"
            v-model="data.animalType"
            :options="ANIMAL_TYPE_ARRAY"
          />

          <TextInput
            label="품종"
            type="text"
            placeholder="예 ) 골든리트리버"
            ariaLabel="동물 품종"
            v-model="data.species"
          />
          <SelecterInput
            label="성별"
            selectorLabel="동물성별을 선택해주세요"
            ariaLabel="동물 성별 선택자"
            v-model="data.gender"
            :options="GENDER_ARRAY"
          />
          <TextInput
            label="나이"
            type="text"
            placeholder="예 ) 7개월"
            ariaLabel="동물 나이"
            v-model="data.age"
          />
          <TextInput
            label="털색상"
            type="text"
            placeholder="예 ) 갈색"
            ariaLabel="동물 털 색상"
            v-model="data.furColor"
          />
          <TextInput
            label="마이크로칩 (RFID) 번호"
            type="text"
            placeholder="번호"
            ariaLabel="RFID 번호"
            v-model="data.RFID"
          />
          <TextareaInput
            label="특징"
            type="text"
            placeholder="실종 당시 복장 등 개체를 특정할 수 있는 정보를 알려주세요."
            ariaLabel="동물 특징 입력"
            v-model="data.feature"
          />
        </div>
      </div>
      <div class="col px-5 position-relative">
        <div class="d-flex flex-column gap-3">
          <TitleText size="32px" color="gray-10" weight="600" class="mb-3">
            📌 실종 시간 및 장소
          </TitleText>

          <div class="map">
            <span class="fs-6"> * 마커를 움직여 실종장소를 선택할 수 있어요</span>
            <div :style="{ width: '400px', height: '400px' }" class="bg-primary-blue mb-3">
              <KakaoMap v-model="doroRef" />
            </div>
            <div class="d-flex justify-content-between align-items-center px-3">
              <span class="fs-6 fw-bold"> 실종장소 </span>
              <span class="fs-6 fw-medium">{{ doroRef }}</span>
            </div>
          </div>
          <TextInput
            label="실종 날짜"
            type="date"
            placeholder="실종된 날짜를 선택해주세요"
            ariaLabel="실종 날짜 입력"
            v-model="data.date"
          />
          <TextInput
            label="실종 장소 특징"
            type="text"
            placeholder="예 ) 홍대입구역 6번 출구"
            ariaLabel="실종 장소 특징 입력"
            v-model="data.placeFeature"
          />
          <TextInput
            label="관할지"
            type="text"
            placeholder="예 ) 서울 특별시 마포구"
            ariaLabel="관할지명"
            v-model="data.region"
          />
        </div>
        <div
          class="d-flex justify-content-end position-absolute bottom-0 end-0"
          :style="{ marginRight: '12%' }"
        >
          <button
            v-if="post !== undefined"
            class="bg-primary-blue border border-none rounded text-white"
            style="width: 120px; height: 43px"
            @click="handleUpdate"
          >
            수정
          </button>
          <button
            v-else
            class="bg-primary-blue border border-none rounded text-white"
            style="width: 120px; height: 43px"
            @click="handleSubmit"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
