import { type devUser } from "./devUser";
import { type devComment } from './devComment';

export interface devNotification {
  seen : boolean;
  _id : string;
  author : devUser;
  user : string;
  post : string;
  follow : string;
  comment : devComment;
  message : string;
  createdAt : string;
  updatedAt : string;
}

export function ExtractNotificationFromJson(json: any): devNotification {
  return {
    seen: json.seen,
    _id: json._id,
    author: json.author,
    user: json.user,
    post: json.post,
    follow: json.follow,
    comment: json.comment,
    message: json.message,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
  };
}
