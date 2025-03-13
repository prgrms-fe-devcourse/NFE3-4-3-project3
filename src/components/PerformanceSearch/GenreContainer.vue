<script setup lang="ts">
import { ref } from 'vue'
import { genres } from '@/constants/performanceGenre.ts'

export interface GenreEmit {
  genreName: string
  genreCode: string
}

const emit = defineEmits<{
  (e: 'handleGenreClick', genreEmit: GenreEmit): void
}>()

const handleGenreClick = (code: string) => {
  if (selectedGenreCode.value === code) {
    return
  } else {
    selectedGenreCode.value = code
  }

  let genreName = ''

  for (const item of genres) {
    if (item.code === selectedGenreCode.value) {
      genreName = item.genre
    }
  }
  emit('handleGenreClick', { genreName, genreCode: selectedGenreCode.value })
}

const selectedGenreCode = ref<string>('')
</script>

<template>
  <div class="keyword_container">
    <h2 style="margin-top: 30px">공연 장르</h2>
    <div class="keyword_badge_container">
      <div
        class="badge"
        v-for="genre in genres"
        :key="genre.code"
        :class="{ selected: selectedGenreCode === genre.code }"
        @click="() => handleGenreClick(genre.code)"
      >
        <span># {{ genre.genre }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.keyword_container {
  width: 100%;
  margin-bottom: 30px;

  h2 {
    font-size: $text-title-300;
    font-weight: bold;
    margin-bottom: 24px;
    display: inline-block;
  }

  small {
    display: inline-block;
    margin-left: 1rem;
    color: $text-color-300;
  }

  .keyword_badge_container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .badge {
      display: inline-block;
      border-radius: 30px;
      border: 1px solid #d3d0cb;
      padding: 0.5rem 1rem;
      color: #61605d;
      cursor: pointer;

      &.selected {
        background-color: $primary-color-100;
        color: #fff;
      }
    }
  }
}
</style>
