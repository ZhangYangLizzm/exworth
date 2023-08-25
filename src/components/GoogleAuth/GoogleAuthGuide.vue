<script setup>
import DownloadAuthenticator from "./DownloadAuthenticator.vue";
const { text } = defineProps({
  text: String,
});
</script>

<template>
  <a-popover placement="bottom">
    <template #content>
      <DownloadAuthenticator />
    </template>
    <span class="text-primary cursor-pointer">{{ text }}</span>
  </a-popover>
</template>

<style scoped lang="less"></style>
