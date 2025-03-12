export interface devChannel {
  authRequired : boolean;
  posts : string[];
  _id : string;
  name : string;
  description : string;
  createdAt : string;
  updatedAt : string;
}

export function ExtractChannelFromJson(json : any) : devChannel {
  return {
    authRequired : json.authRequired,
    posts : json.posts,
    _id : json._id,
    name : json.name,
    description : json.description,
    createdAt : json.createdAt,
    updatedAt : json.updatedAt,
  }
}
