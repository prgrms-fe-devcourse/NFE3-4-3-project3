<script setup lang="ts">
defineProps<{
  label: string;
  selectorLabel: string;
  ariaLabel: string;
  options: Array<{ value: string | null; name: string }>;
}>();
const model = defineModel();
</script>

<template>
  <label class="d-flex justify-content-between align-items-center px-3">
    <span class="fs-6 fw-bold">{{ label }}</span>
    <select class="form-select input-size" aria-label="Default select example" v-model="model">
      <!-- <option selected>옵션을 선택해주세요</option> -->
      <option v-for="op of options" :key="op.name" :value="op.value">{{ op.name }}</option>
    </select>
  </label>
</template>

<style scoped>
.input-size {
  width: 270px;
  height: 38px;
}
</style>
