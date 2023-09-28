<script setup lang="ts">
import { getCardProperty } from "@/api/card";
import { CardProperty } from "@/api/types/card";

const property = ref<CardProperty>({
  totalCount: 0,
  totalBalance: 0,
  inactiveCount: 0,
});

const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const { content } = await getCardProperty();
  loading.value = false;
  property.value = content;
});
</script>

<template>
  <div class="bg-white p-4 rounded-xl">
    <ComponentTitle title="卡片統計"></ComponentTitle>
    <ASkeleton :loading="loading" active>
      <div class="flex mt-4">
        <div class="basis-1/3 text-base tracking-wider">
          <span class="label-colon">實體卡</span
          ><span class="text-primary">{{ property.totalCount }}</span> 張
        </div>
        <div class="basis-1/3 text-base tracking-wider">
          <span class="label-colon"> 已激活</span>
          <span class="text-primary">{{
            property.totalCount - property.inactiveCount
          }}</span>
          張
        </div>
        <div class="basis-1/3 text-base tracking-wider">
          <span class="label-colon">未激活</span>
          <span class="text-danger">{{ property.inactiveCount }}</span> 張
        </div>
      </div>
    </ASkeleton>
  </div>
</template>
