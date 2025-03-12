import { type devChannel, ExtractChannelFromJson } from "@/types/devcourse/devChannel";
import { CHANNEL } from '@/apis/devcourse/endpoints';
import devAPI from "@/config/axiosDevConfig";

export interface GetChannelRequest {
  name : string;
}
export interface GetChannelResponse {
  channel : devChannel;
}

export async function getChannel(request : GetChannelRequest): Promise<GetChannelResponse> {
  const response = await devAPI.get(import.meta.env.VITE_API_BASE_URL + CHANNEL.getChannel(request.name));
  console.log(response);
  return {
    channel: ExtractChannelFromJson(response.data)
  }
}
