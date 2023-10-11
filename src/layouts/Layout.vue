<script setup lang="ts">
import Sider from "./Sider.vue";
</script>

<template>
  <div class="flex w-full">
    <Sider />
    <ALayoutContent class="relative overflow-hidden p-4 ">
      <router-view v-slot="{ Component, route }">
        <transition name="slide-page">
          <!-- vue3组件中可没有根组件，避免在子组件没有根组件时候transition失效的情况 -->
          <div
            :key="route.path"
            class="h-full flex flex-col bg-white p-4 rounded-xl"
          >
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </ALayoutContent>
  </div>
</template>

<style scoped lang="less"></style>
