<script setup lang="ts">
defineProps<{
  label: string;
  placeholder: string;
  ariaLabel: string;
}>();

const model = defineModel<string>();
</script>

<template>
  <label class="d-flex justify-content-between align-items-start px-3">
    <span class="fs-6 fw-bold">{{ label }}</span>
    <textarea
      class="form-control input-size"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      v-model="model"
    ></textarea>
  </label>
</template>

<style scoped>
.input-size {
  width: 270px;
  height: 60px;
}
</style>
