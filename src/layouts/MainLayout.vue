<script setup>
import MobLayout from './MobLayout.vue'
import WebLayout from './WebLayout.vue'
import { useAppStore } from '@/stores/modules/app'
const appStore = useAppStore()
</script>
<template>
  <MobLayout v-if="appStore.isMobile" />
  <WebLayout v-else />
</template>
