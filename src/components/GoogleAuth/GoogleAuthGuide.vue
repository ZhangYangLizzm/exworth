<script setup lang="ts">
import DownloadAuthenticator from "./DownloadAuthenticator.vue";
defineProps({
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
