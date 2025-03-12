import { type devChannel, ExtractChannelFromJson } from "@/types/devcourse/devChannel";
import { CHANNEL } from '@/apis/devcourse/endpoints';
import devAPI from "@/config/axiosDevConfig";

export interface DeleteChannelRequest {
  id : string;
}
export interface DeleteChannelResponse {
  channel : devChannel;
}

export async function deleteChannel(request : DeleteChannelRequest) : Promise<DeleteChannelResponse> {
  const response = await devAPI.delete(import.meta.env.VITE_API_BASE_URL + CHANNEL.delete, {
    data: {
      ...request
    }
  });
  return {
    channel: ExtractChannelFromJson(response.data),
  };
}
