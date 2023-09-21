<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
const props = defineProps({
  dataSource: Array,
  loading: Boolean,
});

const loadObserver = ref();
const emit = defineEmits(["fetchMore"]);

useIntersectionObserver(loadObserver, ([{ isIntersecting }]) => {
  if (!props.loading && isIntersecting) {
    emit("fetchMore");
  }
});
</script>

<template>
  <a-list
    class="overflow-y-auto overflow-x-hidden"
    :dataSource="dataSource"
  >
    <template #renderItem="{ item }">
      <slot name="renderItem" :item="item" />
    </template>
    <a-spin :spinning="loading">
      <div ref="loadObserver" class="h-8 w-full"></div>
    </a-spin>
  </a-list>
</template>
