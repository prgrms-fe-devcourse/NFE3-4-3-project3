<script setup lang="ts">
defineProps({
  name: String,
})
</script>

<template>
  <div class="categorybtn" @click="$emit('click')">{{ name }}</div>
</template>

<style lang="scss" scoped>
.categorybtn {
  padding: 14px 16px;
  height: 42px;
  border-radius: 20px;
  border: 1px solid #e2e1e1;
  background: #ebebeb;
  color: #888888;
  text-align: center;
  box-sizing: border-box;
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
