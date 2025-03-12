<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';

const { currentPage, totalPages, goToPage } = defineProps<{
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}>();

const fixedPagesCount = 5;
const groupStart = ref(1);

const visiblePages = computed(() => {
  // 전체 페이지가 fixedPagesCount보다 작으면 실제 totalPages만큼 보여줌
  if (totalPages < fixedPagesCount) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // 전체 페이지가 fixedPagesCount 이상이면 groupStart부터 fixedPagesCount개 표시
  const groupEnd = Math.min(totalPages, groupStart.value + fixedPagesCount - 1);
  return Array.from({ length: groupEnd - groupStart.value + 1 }, (_, i) => groupStart.value + i);
});

function prevGroup() {
  if (groupStart.value > 1) {
    groupStart.value = Math.max(1, groupStart.value - fixedPagesCount);
    goToPage(groupStart.value);
  }
}

function nextGroup() {
  if (groupStart.value + fixedPagesCount <= totalPages) {
    groupStart.value = groupStart.value + fixedPagesCount;
    goToPage(groupStart.value);
  }
}
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 이전 그룹 버튼 -->
      <li class="page-item" :class="{ disabled: groupStart === 1 }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevGroup">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <!-- 그룹 내 페이지 번호 버튼 -->
      <li
        v-for="page in visiblePages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
      >
        <a class="page-link" href="#" @click.prevent="goToPage(page)">
          {{ page }}
        </a>
      </li>

      <!-- 다음 그룹 버튼 -->
      <li class="page-item" :class="{ disabled: groupStart + fixedPagesCount > totalPages }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="nextGroup">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination .page-link {
  color: var(--primary-green) !important;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* 활성 페이지 */
.pagination .page-item.active .page-link {
  background-color: var(--primary-green) !important;
  color: var(--gray-1) !important;
  border-color: var(--primary-green);
}

/* 호버 시 */
.pagination .page-link:hover {
  background-color: var(--primary-green) !important;
  color: var(--gray-1) !important;
}

.pagination .page-link:focus {
  outline: none;
  box-shadow: none;
}

</style>
