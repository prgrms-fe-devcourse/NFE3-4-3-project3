<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

export interface ExpandingMenuItemData {
  id: number;
  bgImage: string;
  title: string;
  content: string;

  contentId: number;
  contentTypeId: number;
}
interface ExpandingMenuProps {
  itemData: ExpandingMenuItemData[];
}

const router = useRouter();
const props = defineProps<ExpandingMenuProps>();
const focusedId = ref(0);
const prevFocusedId = ref(0);
const menuItemElement = useTemplateRef<HTMLDivElement[]>('menuItemElements');
const menuItemElementTitle = useTemplateRef<HTMLSpanElement[]>('menuItemElementTitles');
const menuItemElementTitle2 = useTemplateRef<HTMLSpanElement[]>('menuItemElementTitles2');
const menuItemElementContent = useTemplateRef<HTMLSpanElement[]>('menuItemElementContents');
const menuItemElementContent2 = useTemplateRef<HTMLSpanElement[]>('menuItemElementContents2');

function OnExpandEnd(e: TransitionEvent) {
  if (e.propertyName === 'width') {
    if (menuItemElement.value && menuItemElement.value[focusedId.value] === e.target) {
      if (e.target instanceof HTMLDivElement) {
        if (menuItemElementTitle.value) {
          const spanElement = menuItemElementTitle.value[focusedId.value] as HTMLSpanElement;
          spanElement.classList.remove('opacity-0');
          spanElement.classList.add('opacity-100');
        }
        if (menuItemElementContent.value) {
          const spanElement = menuItemElementContent.value[focusedId.value] as HTMLSpanElement;
          spanElement.classList.remove('opacity-0');
          spanElement.classList.add('opacity-100');
        }
      }
    }
    if (menuItemElement.value && menuItemElement.value[prevFocusedId.value] === e.target) {
      if (e.target instanceof HTMLDivElement) {
        if (menuItemElementTitle2.value) {
          const spanElement = menuItemElementTitle2.value[prevFocusedId.value] as HTMLSpanElement;
          spanElement.classList.remove('opacity-0');
          spanElement.classList.add('opacity-100');
        }
        if (menuItemElementContent2.value) {
          const spanElement = menuItemElementContent2.value[prevFocusedId.value] as HTMLSpanElement;
          spanElement.classList.remove('opacity-0');
          spanElement.classList.add('opacity-100');
        }
      }
    }
  }
}
function OnExpandStart(e: TransitionEvent) {
  if (menuItemElement.value && menuItemElement.value[prevFocusedId.value] === e.target) {
    if (e.target instanceof HTMLDivElement) {
      if (menuItemElementTitle.value) {
        const spanElement = menuItemElementTitle.value[prevFocusedId.value] as HTMLSpanElement;
        spanElement.classList.add('opacity-0');
        spanElement.classList.remove('opacity-100');
      }
      if (menuItemElementContent.value) {
        const spanElement = menuItemElementContent.value[prevFocusedId.value] as HTMLSpanElement;
        spanElement.classList.add('opacity-0');
        spanElement.classList.remove('opacity-100');
      }
    }
  }
  if (menuItemElement.value && menuItemElement.value[focusedId.value] === e.target) {
    if (e.target instanceof HTMLDivElement) {
      if (menuItemElementTitle2.value) {
        const spanElement = menuItemElementTitle2.value[focusedId.value] as HTMLSpanElement;
        spanElement.classList.add('opacity-0');
        spanElement.classList.remove('opacity-100');
      }
      if (menuItemElementContent2.value) {
        const spanElement = menuItemElementContent2.value[focusedId.value] as HTMLSpanElement;
        spanElement.classList.add('opacity-0');
        spanElement.classList.remove('opacity-100');
      }
    }
  }
}
function OnMouseEnter(e: Event, id: number) {
  if (focusedId.value === id) return;
  prevFocusedId.value = focusedId.value;
  focusedId.value = id;
}
function handleCategoryClick(data: ExpandingMenuItemData) {
  router.push({
    name: 'travelDetail',
    params: { contentId: data.contentId },
    query: { contenttypeid: data.contentTypeId },
  });
}
</script>

<template>
  <div class="container w-100 h-100 d-flex gap-1 position-relative p-0">
    <div
      v-for="item in props.itemData"
      :key="item.id"
      class="container h-100 rounded p-0 overflow-hidden"
      :class="focusedId === item.id ? 'flex-fill' : 'col-2'"
      ref="menuItemElements"
      style="
        transition: all 0.5s ease-in-out;
        background-blend-mode: multiply;
        background-color: rgb(0, 0, 0, 0.5);
        background-size: cover;
        background-position: center;
      "
      :style="{ backgroundImage: `url(${item.bgImage})` }"
      @mouseenter="(e) => OnMouseEnter(e, item.id)"
      @transitionend="(e) => OnExpandEnd(e)"
      @transitionstart="(e) => OnExpandStart(e)"
      @click="(e) => handleCategoryClick(item)"
    >
      <div class="px-5 py-4 position-absolute bottom-0">
        <span
          class="horizontal-text-title text-gray-1"
          :class="item.id === focusedId ? 'opacity-100' : 'opacity-0'"
          ref="menuItemElementTitles"
          >{{ item.title }}</span
        >
        <br />
        <span
          class="horizontal-text-content text-gray-1"
          :class="item.id === focusedId ? 'opacity-100' : 'opacity-0'"
          ref="menuItemElementContents"
          >{{ item.content }}</span
        >
      </div>
      <div class="p-2 d-flex">
        <span
          class="vertical-text-title text-gray-1"
          :class="item.id === focusedId ? 'opacity-0' : 'opacity-100'"
          ref="menuItemElementTitles2"
          >{{ item.title }}</span
        >
        <span
          class="vertical-text-content text-gray-6"
          :class="item.id === focusedId ? 'opacity-0' : 'opacity-100'"
          ref="menuItemElementContents2"
          >{{ item.content }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.horizontal-text-title {
  font-size: 40px;
  font-family: 'Paperlogy';
  font-weight: 800;
  transition: all 0.3s;
}
.horizontal-text-content {
  font-size: 24px;
  font-family: 'Paperlogy';
  font-weight: 500;
  transition: all 0.3s;
}
.vertical-text-title {
  font-size: 20px;
  font-weight: 800;
  font-family: 'Paperlogy';
  transition: all 0.3s;
  letter-spacing: 0.25rem;
  writing-mode: vertical-lr;
  text-orientation: upright;
}
.vertical-text-content {
  font-size: 20px;
  font-weight: 500;
  font-family: 'Paperlogy';
  transition: all 0.3s;
  letter-spacing: 0.25rem;
  writing-mode: vertical-lr;
  text-orientation: upright;
}
</style>
