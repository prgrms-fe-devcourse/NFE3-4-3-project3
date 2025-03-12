<script setup lang="ts">
defineProps<{
  label: string;
  type: string;
  placeholder: string;
  ariaLabel: string;
}>();
const model = defineModel();
</script>

<template>
  <label class="d-flex justify-content-between align-items-center px-3">
    <span class="fs-6 fw-bold">{{ label }}</span>
    <input
      :type="type"
      class="form-control input-size"
      :placeholder="placeholder"
      :aria-label="ariaLabel"
      v-model="model"
    />
  </label>
</template>

<style scoped>
.input-size {
  width: 270px;
  height: 38px;
}
</style>
