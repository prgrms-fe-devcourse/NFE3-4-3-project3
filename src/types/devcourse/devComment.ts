import { type devUser } from "./devUser";

export interface devComment {
  _id : string;
  comment : string;
  author : devUser;
  post : string;
  createdAt : string;
  updatedAt : string;
}

export function ExtractCommentFromJson(json: any): devComment {
  return {
    _id: json._id,
    comment: json.comment,
    author: json.author,
    post: json.post,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
  };
}
