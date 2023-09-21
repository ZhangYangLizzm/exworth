<script setup lang="ts">
import { getCardPropety } from "@/api/card";
onMounted(() => {
  getCardPropety();
});
</script>

<template>
  <div class="flex h-full gap-x-4">
    <div class="basis-[300px] bg-white rounded-xl flex flex-col"></div>
    <div class="flex-grow bg-white rounded-xl">

      <InfiniteScroll></InfiniteScroll>
    </div>
  </div>
</template>
