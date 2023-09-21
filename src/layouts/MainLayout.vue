<script setup lang="ts">
import WebLayout from "@/layouts/web/WebLayout.vue";
import MobileLayout from "@/layouts/mobile/MobileLayout.vue";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
</script>

<template>
  <MobileLayout v-if="appStore.isMobile" />
  <WebLayout v-else />
</template>
