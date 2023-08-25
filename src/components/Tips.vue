<script setup>
const { title, contents } = defineProps({
  title: {
    type: String,
  },
  contents: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="text-green-600 py-2 px-4 bg-emerald-100 rounded-lg mb-2">
    <p class="mb-2">
      <exclamation-circle-outlined />
      <span class="ml-2">{{ title }}</span>
    </p>
    <p class="mb-2" v-for="(content, index) in contents">
      {{ index + 1 + "、" + content }}
    </p>
  </div>
</template>

<style scoped lang="less"></style>
