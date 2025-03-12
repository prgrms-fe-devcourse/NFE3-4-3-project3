import { type devUser } from "./devUser";

export interface devMessage {
  _id : string;
  message : string;
  sender : devUser;
  receiver : devUser;
  seen : boolean;
  createdAt : string;
  updatedAt : string;
}

export function ExtractMessageFromJson(json: any): devMessage {
  return {
    _id: json._id,
    message: json.message,
    sender: json.sender,
    receiver: json.receiver,
    seen: json.seen,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
  };
}
