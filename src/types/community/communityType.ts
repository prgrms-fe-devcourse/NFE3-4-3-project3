// 커뮤니티

// 작성자 타입
// interface Author {
//   _id: string
//   fullName: string
// }

// Post 타입
export interface Post {
  id: string
  category: '도서' | '공연/행사'
  title: string
  content: string
  image: string | null
  imagePublicId?: string // 게시글 이미지 공개 ID
  createdAt: string
  userId: string // 작성자 ID
  authorName: string // 작성자 닉네임
  authorImage?: string | null // 작성자 프로필 이미지
  likes: Like[]
  comments: Comment[]
  liked?: Like
}

export interface Like {
  _id: string
  user: string
  post: string
}

export interface Comment {
  _id: string
  user: string
  post: string
  content: string
}

// id, createdAt, image 제외한 NewPost 타입
export type NewPost = Omit<Post, 'id' | 'createdAt' | 'image'>
