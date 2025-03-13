<script setup lang="ts">
import { ref } from 'vue'

interface SearchTypeOption {
  value: string;
  label: string;
}

interface SearchBoxProps {
  searchTypeOptions: SearchTypeOption[];
}
const props = defineProps<SearchBoxProps>();
const emit = defineEmits<{
  (event: "submit", value: string): void;
}>();
const searchType = ref(props.searchTypeOptions[0].value);
const searchText = ref('');

const handleSubmit = (event: Event) => {
  event.preventDefault();
  emit("submit", searchText.value);
};

// TODO - 나중에 동현님 검색 박스와 같이 컴포넌트화
</script>

<template>
  <form @submit="handleSubmit" class="form">
    <select v-model="searchType" class="select">
      <option v-for="option in searchTypeOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <div class="line"></div>
    <div class="input_wrapper">
      <input v-model="searchText" placeholder="검색어를 입력해주세요." />
      <button type="submit">
        <img src="/icons/search.svg" alt="search-icon">
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #d3d0cb;
  border-radius: 30px;

  .select {
    border: none;
    border-radius: 30px;
    appearance: none;
    padding: 8px 40px;
    background-color: white;
    cursor: pointer;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  .line {
    width: 1px;
    height: 60%;
    background-color: #e8e8e8;
  }

  .input_wrapper {
    width: 100%;
    height: 100%;
    position: relative;

    input {
      border-radius: 30px;
      display: block;
      width: 100%;
      height: 100%;
      border: none;
      padding: 0 16px;
      font-size: 16px;
      padding: 1rem 0 1rem 1rem;

      &:focus {
        outline: none;
      }
    }

    button {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      background-color: transparent;
      width: 24px;
      height: 24px;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
