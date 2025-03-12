import { type devPost } from "./devPost";
import { type devLike } from "./devLike";
import { type devFollow } from "./devFollow";
import { type devNotification } from "./devNotification";
import { type devMessage } from "./devMessage";

export interface devUser {
  _id : string;
  fullName : string;
  email : string;
  coverImage : string;
  image : string;
  role : string;
  emailVerified : string;
  banned : boolean;
  isOnline : boolean;
  posts : devPost;
  likes : devLike;
  comments : string[];
  followers : devFollow;
  following : devFollow;
  notifications : devNotification;
  messages : devMessage;
  createdAt : string;
  updatedAt : string;
}

export function ExtractUserFromJson(json : any) : devUser {
  return {
    _id : json._id,
    fullName : json.fullName,
    email : json.email,
    coverImage : json.coverImage,
    image : json.image,
    role : json.role,
    emailVerified : json.emailVerified,
    banned : json.banned,
    isOnline : json.isOnline,
    posts : json.posts,
    likes : json.likes,
    comments : json.comments,
    followers : json.followers,
    following : json.following,
    notifications : json.notifications,
    messages : json.messages,
    createdAt : json.createdAt,
    updatedAt : json.updatedAt,
  }
}
