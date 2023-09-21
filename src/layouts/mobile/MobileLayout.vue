<script setup lang="ts">
import MobileHeader from "@/layouts/mobile/header/MobileHeader.vue";
import { useDrawerProvide } from "@/hooks/useDrawer";
const { drawerVisible } = useDrawerProvide();
</script>

<template>
  <div class="relative w-full overflow-hidden h-full">
    <MobileHeader />

    <ALayoutContent
      class=" relative overflow-hidden p-4 !bg-[rgba(245,245,245,0.8)]"
    >
      <router-view v-slot="{ Component, route }">
        <transition name="slide-page">
          <!-- vue3组件中可没有根组件，避免在子组件没有根组件时候transition失效的情况 -->
          <div :key="route.path" class="h-full flex flex-col">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </ALayoutContent>

    <div
      id="ex-drawer"
      class="absolute rounded-r-xl bg-white w-full h-full top-0 left-0"
      :style="[`visibility:${drawerVisible ? 'visible' : 'hidden'}`]"
      :class="[drawerVisible ? 'ex-drawer-enter' : 'ex-drawer-exit']"
    ></div>
  </div>
</template>
