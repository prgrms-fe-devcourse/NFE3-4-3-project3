import adoAPI from '@/config/axiosAdoConfig';
import shelterAPI from '@/config/axiosShelterConfig';

export const getShelterListApi = async (upr_cd: string, org_cd: string) => {
  try {
    const response = await adoAPI.get('/shelter', {
      params: {
        // 이후 수정
        upr_cd,
        org_cd,
      },
    });
    console.log('res', response.data.response.body.items.item);
    return response.data.response.body.items.item;
    //return response.data;
  } catch (error) {
    console.log('[ERROR] 보호소 목록 조회 api', error);
  }
};

export const getShelterInfo = async (careRegNumber: number | string) => {
  console.log('보호소 번호', careRegNumber);
  try {
    const response = await shelterAPI.get('/shelterInfo', {
      params: {
        care_reg_no: careRegNumber,
      },
    });
    console.log('보호소 정보 조회 응답 입니다', response.data.response);

    return response.data.response;
  } catch (error) {
    console.log('[ERROR] 보호소 정보 조회 api', error);
  }
};

export const getShelterAniamls = async (careRegNumber: number | string) => {
  try {
    const response = await adoAPI.get('/abandonmentPublic', {
      params: {
        care_reg_no: careRegNumber,
      },
    });
    console.log('보호소 보유 동물 응답', response);
    return response.data.response.body.items.item;
  } catch (error) {
    console.log('[ERROR] 보호소 동물 조회 api', error);
  }
};
