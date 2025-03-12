import devAPI from "@/config/axiosDevConfig";
import { USER } from "@/apis/devcourse/endpoints";
import { type devUser, ExtractUserFromJson } from "@/types/devcourse/devUser";

export interface UploadPhotoRequest {
  isCover : boolean;
  image : File;
}
export interface UploadPhotoResponse {
  user : devUser;
}

export async function uploadPhoto(request: UploadPhotoRequest): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  formData.append("image", request.image);
  formData.append("isCover", request.isCover.toString());
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + USER.updatePhoto, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  return {
    user: ExtractUserFromJson(response.data),
  };
};
