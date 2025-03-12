import { type devNotification, ExtractNotificationFromJson } from '@/types/devcourse/devNotification';
import { NOTIFICATION } from '@/apis/devcourse/endpoints';
import devAPI from '@/config/axiosDevConfig';

export interface NotificationsSeenResponse {
  n : number;
  nModified : number;
  ok : number;
}

export async function notificationsSeen() : Promise<NotificationsSeenResponse>{
  const response = await devAPI.put(import.meta.env.VITE_API_BASE_URL + NOTIFICATION.seen);
  console.log(response);
  return {
    n : response.data.n,
    nModified : response.data.nModified,
    ok : response.data.ok
  }
}
