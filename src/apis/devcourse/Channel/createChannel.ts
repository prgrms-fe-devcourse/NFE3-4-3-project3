import { type devChannel, ExtractChannelFromJson } from "@/types/devcourse/devChannel";
import { CHANNEL } from '@/apis/devcourse/endpoints';
import devAPI from "@/config/axiosDevConfig";

export interface CreateChannelRequest {
  authRequired :  boolean;
  description : string;
  name : string;
}
export interface CreateChannelResponse {
  channel : devChannel;
}

export async function createChannel(request : CreateChannelRequest) : Promise<CreateChannelResponse> {
  const response = await devAPI.post(import.meta.env.VITE_API_BASE_URL + CHANNEL.create, {
    ...request
  });
  return {
    channel: ExtractChannelFromJson(response.data),
  };
}
