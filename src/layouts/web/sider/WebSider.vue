<script setup lang="ts">
import LocaleDropdown from "@/components/LocaleDropdown.vue";
import NavigationMenu from "./NavigationMenu.vue";

import { useUserStore } from "@/stores/user.ts";
import { useFullscreen } from "@vueuse/core";

const userStore = useUserStore();
const { isSupported, isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <ALayoutSider class="p-4 h-full relative" theme="light">
    <div class="px-4 pb-4">
      <Logo  dark />
    </div>
    
    <NavigationMenu class="flex-grow" />

    <AMenu>
      <AMenuItem
        @click="toggle"
        key="Screen"
        class="rounded"
        v-if="isSupported"
      >
        <template #icon>
          <FullscreenOutlined v-if="!isFullscreen" />
          <FullscreenExitOutlined v-else />
        </template>
        {{ !isFullscreen ? "Fullscreen" : "Exit Fullscreen" }}
      </AMenuItem>

      <AMenuItem class="rounded" key="Locale">
        <template #icon>
          <global-outlined />
        </template>
        <LocaleDropdown />
      </AMenuItem>

      <AMenuItem class="rounded" key="Login" @click="userStore.logout()">
        <template #icon>
          <logout-outlined />
        </template>
        {{ $t("6b77_1yTm-gggQW0eZnOy") }}
      </AMenuItem>
    </AMenu>
  </ALayoutSider>
</template>

<style scoped lang="less">
:deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
}
</style>
