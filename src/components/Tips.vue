<script setup>
defineProps({
  title: {
    type: String,
  },
  contents: {
    type: [Array, String],
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
    <p class="mb-2" v-for="(content, index) in contents" v-if="Array.isArray(contents)">
      {{ index + 1 + "、" + content }}
    </p>
    <p v-else>{{ contents }}</p>
  </div>
</template>

<style scoped lang="less"></style>
