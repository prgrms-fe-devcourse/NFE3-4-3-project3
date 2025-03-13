<script setup lang="ts">
import type { LibraryInfoResult } from '@/types/library/library.types.ts'
import router from '@/router'

type LibraryResultListProps = Pick<LibraryInfoResult, 'libCode' | 'libName' | 'homepage' | 'address'>

defineProps<LibraryResultListProps>()
</script>

<template>
  <div class="result-list" @click="() => router.push({ name: 'library-detail', params: { id : libCode } })">
    <div class="place-info">{{ address.split(' ')[0] }}</div>
    <div class="library-name">{{ libName }}</div>
    <div class="library-address">{{ address }}</div>
    <a :href="homepage" target="_blank" class="router-link" @click.stop>
      <img src="/icons/library/link.svg" alt="link" width="22" height="22"/>
    </a>
  </div>
</template>

<style scoped lang="scss">
.result-list {
  display: flex;
  width: 936px;
  height: 68px;
  padding-left: 20px;
  padding-right: 30px;
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: 1px solid $text-color-100;
}

.library-name {
  width: 240px;
}

.library-address {
  width: 250px;
}

.place-info {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $secondary-color-300;
  width: 130px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid $secondary-color-300;
}

.router-link {
  width: 22px;
  height: 22px;
}
</style>
