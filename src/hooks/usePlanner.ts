import { createPost } from '@/apis/devcourse/Post/createPost';
import { getChannelPosts } from '@/apis/devcourse/Post/getChannelPosts';
import { updatePost } from '@/apis/devcourse/Post/updatePost';
import { useAuthStore } from '@/stores/auth';
import { deletePost } from "@/apis/devcourse/Post/deletePost";
import * as CHANID from '@/constants/communityConsts';

export interface TravelDestData {
  contentid: string;
  contentTypeId: string;
  name: string;
  mapx: number;
  mapy: number;
}
export interface TravelData {
  id: string;
  title: string;
  destData: TravelDestData[][];
  createdAt: string;
}

export default function usePlanner() {
  const auth = useAuthStore();
  if (!auth.isAuth) return null;

  async function GetMyPlans(): Promise<TravelData[]> {
    const allPlannerPosts = (await getChannelPosts({ channelId: CHANID.PlannerChannelId })).posts;
    const myPlannerPosts = allPlannerPosts.filter((post) => post.author._id === auth.user?._id);
    const travelData: TravelData[] = myPlannerPosts.map((post) => {
      const parsed = JSON.parse(post.title);
      return {
        id: post._id,
        title: parsed.title,
        destData: parsed.destData,
        createdAt: post.createdAt,
      } as TravelData;
    });
    return travelData;
  }
  async function UpdatePlanData(data: TravelData) {
    await updatePost({
      channelId: CHANID.PlannerChannelId,
      title: JSON.stringify({ title: data.title, destData: data.destData }),
      postId: data.id,
    });
  }
  async function CreatePlanData(title: string): Promise<TravelData> {
    const post = (
      await createPost({
        channelId: CHANID.PlannerChannelId,
        title: JSON.stringify({ title: title, destData: [[]] }),
      })
    ).post;
    const parsed = JSON.parse(post.title);
    const newPlan: TravelData = {
      id: post._id,
      title: parsed.title,
      destData: parsed.destData,
      createdAt: post.createdAt
    };
    return newPlan;
  }
  async function DeletePlan(id: string){
    deletePost({id: id});
  }
  return {
    GetMyPlans, UpdatePlanData, CreatePlanData, DeletePlan
  }
}
