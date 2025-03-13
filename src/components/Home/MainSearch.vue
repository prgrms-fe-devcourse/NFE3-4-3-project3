<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue/es/vc-select'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const value = ref('도서')
const options = ref<SelectProps['options']>([
  {
    id: '도서',
    name: '도서',
  },
  {
    id: '공연/행사',
    name: '공연/행사',
  },
])
</script>

<template>
  <div class="search-bar">
    <a-select
      ref="select"
      v-model:value="value"
      style="width: 100px"
      :options="options"
      :field-names="{ label: 'name', value: 'id', options: 'children' }"
      class="custom-select"
    ></a-select>
    <!-- <div> -->
    <RouterLink v-if="value === '도서'" to="/book" style="display: flex; flex: 1">
      <input type="text" class="search-input" placeholder="검색어를 입력하세요" />
      <button type="button" class="searchbtn">검색</button>
    </RouterLink>
    <RouterLink v-if="value === '공연/행사'" to="/library-search" style="display: flex; flex: 1">
      <input type="text" class="search-input" placeholder="검색어를 입력하세요" />
      <button type="button" class="searchbtn">검색</button>
    </RouterLink>
    <!-- </div> -->
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  width: 579px;
  height: 51px;
  border-radius: 30px;
  box-shadow: 0 0 10px 0px rgb(121 121 121 / 50%);
  display: flex;
  align-items: center;
  padding: 14px 0 14px 14px;
  box-sizing: border-box;
  position: absolute;
  bottom: 54px;
  left: 170px;
  background: white;
}

.search-bar .custom-select.ant-select .ant-select-selector {
  background-color: lightblue !important; /* 배경 색상 변경 */
  border-radius: 8px !important; /* 둥근 테두리 */
  border-color: #1890ff !important; /* 테두리 색상 변경 */
}
.search-input {
  border: none;
  outline: none;
  flex: 1;
  margin: 0 15px 0 20px;
  font-size: 18px;
  font-family: 'Pretendard', sans-serif;
}

.search-input::placeholder {
  color: $text-color-200;
}

.searchbtn {
  width: 69px;
  height: 51px;
  font-size: 15px;
  color: white;
  background-color: $secondary-color-300;
  border-radius: 0px 20px 20px 0;
  font-weight: 500;
  border: 0;
  cursor: pointer;
}
</style>
