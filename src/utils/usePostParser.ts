import type { Post } from '../types/community/communityType'
import { computed } from 'vue'

export const usePostParser = (posts: Post[]) => {
  const parsedPosts = computed(() => {
    return posts.map((post) => {
      try {
        const parsed = JSON.parse(post.title)
        return {
          ...post,
          title: parsed.title,
          category: parsed.category,
          content: parsed.content,
        }
      } catch (e) {
        console.error('Failed to parse post:', e)
        return post
      }
    })
  })

  return { parsedPosts }
}
