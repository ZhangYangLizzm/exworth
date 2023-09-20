<script setup lang="ts">
defineProps({
  title: String,
  amount: String,
  currency: String,
});
</script>

<template>
  <div class="text-gray-400 flex justify-between mt-2">
    <span class="title">{{ title }}</span>
    <span>{{ amount }} {{ currency }}</span>
  </div>
</template>

<style scoped lang="less">
.title::after {
  content: ":";
}
</style>
