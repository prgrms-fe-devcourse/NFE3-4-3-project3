export interface devFollow {
  _id	: string;
  user :	string;
  follower : string;
  createdAt : string;
  updatedAt : string;
}

export function ExtractFollowFromJson(json: any): devFollow {
  return {
    _id: json._id,
    user: json.user,
    follower: json.follower,
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
  };
}
