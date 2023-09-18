<script setup lang="ts">
import WebSider from "./sider/WebSider.vue";
import { useDrawerProvide } from "@/hooks/useDrawer.ts";

const { drawerFlexGrowClass, drawerVisible } = useDrawerProvide();
</script>

<template>
  <div class="flex bg-white relative w-full overflow-hidden rounded-xl">
    <WebSider class="!bg-white" />

    <ALayoutContent
      class="!flex-grow-[2] !basis-0 !shrink-0 relative overflow-hidden"
      :class="[drawerVisible ? 'rounded-none' : 'rounded-r-xl']"
    >
      <router-view v-slot="{ Component, route }">
        <transition name="slide-page">
          <!-- vue3组件中可没有根组件，避免在子组件没有根组件时候transition失效的情况 -->
          <div :key="route.path" class="py-4 h-full flex flex-col">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </ALayoutContent>

    <div
      id="ex-drawer"
      class="relative rounded-r-xl bg-white grow-transition"
      :class="[drawerFlexGrowClass]"
    ></div>
  </div>
</template>
