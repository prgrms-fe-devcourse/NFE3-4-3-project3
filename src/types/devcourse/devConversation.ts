import { type devUser } from "./devUser";

export interface devConversation {
  _id : string[];
  message : string;
  sender : devUser;
  receiver : devUser;
  seen : boolean;
  createdAt : string;
}

export function ExtractConversationFromJson(json: any): devConversation {
  return {
    _id: json._id,
    message: json.message,
    sender: json.sender,
    receiver: json.receiver,
    seen: json.seen,
    createdAt: json.createdAt,
  };
}
