import { type devLike } from "./devLike";
import { type devComment } from "./devComment";
import { type devChannel } from "./devChannel";
import { type devUser } from "./devUser";

export interface devPost {
  likes : devLike[];
  comments : devComment[];
  _id : string;
  image : string | null;
  imagePublicId : string | null;
  title : string;
  channel : devChannel;
  author : devUser;
  createdAt : string;
  updatedAt : string;
}

export function ExtractPostFromJson(json: any): devPost {
  return {
    likes: json.likes,
    comments: json.comments,
    _id: json._id,
    image: json.image,
    imagePublicId: json.imagePublicId,
    title: json.title,
    channel: json.channel,
    author: json.author,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
  };
}
