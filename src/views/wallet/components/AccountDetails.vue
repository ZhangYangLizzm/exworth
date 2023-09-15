<script setup lang="ts">
import { getBalanceHistory } from "@/api/wallet";
import { useList, useOrderType } from "@/hooks/";
import { DirectionClass } from "@/utils/getClasses";
import { Format } from "@/utils/number";
import InfiniteScroll from "@/components/InfiniteScroll.vue";

const { FlowTypeLable } = useOrderType();

const filterOptions = reactive({
  createTime: undefined,
  type: undefined,
  currency: undefined,
  affectOrderNo: undefined,
});

const {
  // fetch,
  list: dataSource,
  loading,
  fetchMore,
  // refresh,
} = useList(getBalanceHistory, filterOptions, {
  mode: "list",
  pageSize: 16,
  immediate: true,
});
</script>

<template>
  <InfiniteScroll
    :dataSource="dataSource"
    :loading="loading"
    @fetchMore="fetchMore"
  >
    <template #renderItem="{ item }">
      <a-list-item class="p-2 shadow rounded">
        <a-list-item-meta>
          <template #title>
            <div class="flex">
              <div class="flex-grow">
                {{ FlowTypeLable(item.type) }}
              </div>
              <div :class="[DirectionClass(item?.direction)]">
                {{ Format(item.operateAmount) }} {{ item.currency }}
              </div>
            </div>
          </template>
          <template #description>{{ item.createTime }} </template>
          <template #avatar>
            <SvgIcon :name="`coin-${item.currency}`" class="w-10 h-10" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </InfiniteScroll>
</template>

<style scoped lang="less"></style>
@/utils/useUtils