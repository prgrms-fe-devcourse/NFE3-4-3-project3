import { ExtractPostFromJson, type devPost } from "@/types/devcourse/devPost";
import { type devUser, ExtractUserFromJson } from "@/types/devcourse/devUser";

import { SEARCH } from "../endpoints";

import devAPI from "@/config/axiosDevConfig";

export interface GetAllSearchQueryRequest {
  searchQuery: string;
}

export interface GetAllSearchQueryResponse {
  resultsUser: devUser[];
  resultsPosts: devPost[];
}

export async function getAllSearchQuery(request : GetAllSearchQueryRequest) : Promise<GetAllSearchQueryResponse> {
  const response = await devAPI.get(import.meta.env.VITE_API_BASE_URL + SEARCH.getUserPost(request.searchQuery));
  const ResultsUser : devUser[] = [];
  const ResultsPosts : devPost[] = [];
  for(let i = 0; i < response.data.length; i++){
    if(response.data[i].channel){
      ResultsPosts.push(ExtractPostFromJson(response.data[i]));
    }
    else{
      ResultsUser.push(ExtractUserFromJson(response.data[i]));
    }
  }
  return {
    resultsPosts: ResultsPosts,
    resultsUser: ResultsUser
  }
}
