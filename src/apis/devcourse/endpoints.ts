export const serverURL = import.meta.env.VITE_API_BASE_URL;

/**
# ======================#
|         AUTH          |
# ======================#
*/
export const AUTH = Object.freeze({
  signup: '/signup',
  login: '/login',
  logout: '/logout',
  verify: '/auth-user', // 사용자가 인증되었는지 확인합니다.
});

/**
# ======================#
|         USER         |
# ======================#
*/

export const USER = Object.freeze({
  getUserList: '/users/get-users',
  getUser: (userId: string) => `/users/${userId}`,

  updateUser: '/settings/update-user',
  updatePassword: '/settings/update-password',
  updatePhoto: `/users/upload-photo`,

  deletePhoto: '/users/delete-photo',
  deleteUser: '/users/delete-user',
});

/**
# ======================#
|        CHANNEL        |
# ======================#
*/

export const CHANNEL = Object.freeze({
  getChannelList: '/channels',
  getChannel: (name: string) => `/channels/${name}`, // 채널명이 한글이라면 인코딩필요

  create: '/channels/create',
  delete: '/channels/delete',
});

/**
# ======================#
|          POST         |
# ======================#
*/

export const POST = Object.freeze({
  getChannelPost: (channelId: string) => `/posts/channel/${channelId}`,
  getAuthorPost: (userId: string) => `/posts/author/${userId}`,

  create: `/posts/create`,
  update: `/posts/update`,
  delete: `/posts/delete`,
});

/**
# ======================#
|         COMMENT       |
# ======================#
*/

export const COMMENT = Object.freeze({
  create: '/comments/create',
  delete: '/comments/delete',
});

/**
# ======================#
|        SEARCH         |
# ======================#
*/

export const SEARCH = Object.freeze({
  getUserPost: (query: string) => `/search/all/${query}`,
  getUser: (query: string) => `/search/users/${query}`,
});

/**
# ======================#
|         LIKE          |
# ======================#
*/

export const LIKE = Object.freeze({
  create: `/likes/create`,
  delete: `/likes/delete`,
});

/**
# ======================#
|     NOTIFICATION      |
# ======================#
*/

export const NOTIFICATION = Object.freeze({
  getNotification: `/notifications`,
  create: `/notifications/create`,
  seen: `/notifications/seen`,
});
