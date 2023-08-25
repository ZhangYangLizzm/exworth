<script setup>
import BottomNavBar from "./BottomNavBar.vue";
import MobHeader from "./mobile/MobHeader.vue";
</script>
<template>
  <a-layout class="!bg-transparent relative">
    <MobHeader />
    <a-layout-content class="!bg-transparent !bg-white">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
      <!-- <BottomNavBar /> -->
    </a-layout-content>
  </a-layout>
</template>
