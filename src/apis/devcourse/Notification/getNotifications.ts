import { type devNotification, ExtractNotificationFromJson } from '@/types/devcourse/devNotification';
import { NOTIFICATION } from '@/apis/devcourse/endpoints';
import devAPI from '@/config/axiosDevConfig';

export interface GetNotificationsResponse {
  notifications: devNotification[];
}

export async function getNotifications() : Promise<GetNotificationsResponse>{
  const response = await devAPI.get(import.meta.env.VITE_API_BASE_URL + NOTIFICATION.getNotification);
  console.log(response);
  return {
    notifications : response.data.map((e)=>ExtractNotificationFromJson(e))
  }
}
