export interface devLike {
  _id : string;
  user : string;
  post : string;
  createdAt : string;
  updatedAt : string;
}

export function ExtractLikeFromJson(json: any): devLike {
  return {
    _id: json._id,
    user: json.user,
    post: json.post,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
  };
}
