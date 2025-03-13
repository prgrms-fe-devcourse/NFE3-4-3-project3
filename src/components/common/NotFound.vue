<template>
  <div class="not-found">
    <h6>{{ props.title }}</h6>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px dashed #ccc;

  h6 {
    font-size: 20px;
    padding: 130px 0;
  }
}
</style>
