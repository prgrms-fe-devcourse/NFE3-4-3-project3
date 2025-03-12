import { type devChannel, ExtractChannelFromJson } from "@/types/devcourse/devChannel";
import { CHANNEL } from '@/apis/devcourse/endpoints';
import devAPI from "@/config/axiosDevConfig";

export interface GetChannelsResponse {
  channels : devChannel[];
}

export async function getChannels(): Promise<GetChannelsResponse> {
  const response = await devAPI.get(import.meta.env.VITE_API_BASE_URL + CHANNEL.getChannelList);
  return {
    channels: response.data.map((e)=>ExtractChannelFromJson(e))
  }
}
