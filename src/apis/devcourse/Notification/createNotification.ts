import { type devNotification, ExtractNotificationFromJson } from '@/types/devcourse/devNotification';
import { NOTIFICATION } from '@/apis/devcourse/endpoints';
import devAPI from '@/config/axiosDevConfig';

export interface CreateNotificationRequest {
  notificationType : 'COMMENT' | 'LIKE' | 'FOLLOW' | 'MESSAGE';
  notificationTypeId : string;
  userId : string;
  postId : string;
}
export interface CreateNotificationResponse {
  notification : devNotification;
}

export async function createNotification(request: CreateNotificationRequest) : Promise<CreateNotificationResponse>{
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + NOTIFICATION.create, {
    ...request
  });
  console.log(response);
  return {
    notification : ExtractNotificationFromJson(response.data)
  }
}
