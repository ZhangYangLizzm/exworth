<script setup lang="ts">
import { useOrderType } from "@/hooks/";
import { DirectionClass } from "@/utils/getClasses";
import { Format } from "@/utils/number";
import InfiniteScroll from "@/components/InfiniteScroll.vue";

defineProps({
  loading: Boolean,
  dataSource: Array,
});

const emit = defineEmits(["fetchMore"]);
const { FlowTypeLable } = useOrderType();
const fetchMore = emit("fetchMore");
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
