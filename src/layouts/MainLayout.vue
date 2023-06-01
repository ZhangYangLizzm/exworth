<script setup>
import MobLayout from './MobLayout.vue'
import WebLayout from './WebLayout.vue'
import { useAppStore } from '@/stores/modules/app'
const appStore = useAppStore()
</script>
<template>
  <Transition name="fade-down">
    <MobLayout v-if="appStore.isMobile" />
    <WebLayout v-else />
  </Transition>
</template>

<style lang="less">
.fade-down-enter-active {
  transition: all 0.3s ease-in;
}

.fade-down-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
}
</style>