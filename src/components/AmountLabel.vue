<script setup>
defineProps({
  title: String,
  amount: String,
  currency: String,
});
</script>

<template>
  <div class="mt-2 text-gray-400">
    <span class="title">{{ title }}</span>
    <span class="float-right">{{ amount }} {{ currency }}</span>
  </div>
</template>

<style scoped lang="less">
.title::after {
  content: ":";
}
</style>
