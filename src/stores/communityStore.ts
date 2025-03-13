import { defineStore } from 'pinia'
import { fetchPosts, createPost, updatePost, deletePost } from '../apis/community/post'
import type { Post } from '../types/community/communityType'

export const useCommunityStore = defineStore('community', {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    async loadPosts() {
      this.posts = await fetchPosts()
    },
    async addPost(post: Post, imageFile: File | null) {
      await createPost(post, imageFile)
      await this.loadPosts()
    },
    async editPost(postId: string, post: Post, imageFile: File | null) {
      await updatePost(postId, post, imageFile)
      await this.loadPosts()
    },
    async removePost(postId: string) {
      await deletePost(postId)
      await this.loadPosts()
    },
  },
})
