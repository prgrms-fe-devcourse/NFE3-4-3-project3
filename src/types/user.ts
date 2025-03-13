import type { Post } from './community/communityType'

// 유저 정보 타입
export interface UserType {
  _id: string
  email: string
  fullName: string
  coverImage: string
  image?: string
  role: 'user' | 'admin'
  isOnline: boolean
  posts: Post[]
  likes: LikesType[]
  comments: string[]
  followers: FollowersType[]
  following: FollowingType[]
  createdAt: string
}

// 좋아요 타입
export interface LikesType {
  _id: string
  user: string
  post: string
  createdAt: string
  updatedAt: string
}

// 팔로워 타입
export interface FollowersType {
  _id: string
  user: string
  follower: string
  createdAt: string
  updatedAt: string
}

// 팔로잉 타입
export interface FollowingType {
  _id: string
  user: string
  follower: string
  createdAt: string
  updatedAt: string
}

// 유저 메세지 타입
export interface MessageType {
  _id: string
  sender: string
  receiver: string
  message: string
  createdAt: string
  seen: boolean
}

// 유저 알림 타입
export interface NotificationType {
  _id: string
  seen: boolean
  type: string
  message: string
  createdAt: string
}

export interface UserLikedPostsType {
  _id: string
  user: string
  post: string
  createdAt: string
  updatedAt: string
}
