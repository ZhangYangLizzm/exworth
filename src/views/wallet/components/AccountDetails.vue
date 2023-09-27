<script setup lang="ts">
import { useOrderType } from "@/hooks/";
import { DirectionClass } from "@/utils/getClasses";
import { Format } from "@/utils/formatUtil";

defineProps({
  loading: Boolean,
  dataSource: Array,
});

const emit = defineEmits(["fetchMore"]);
const { FlowTypeLable } = useOrderType();
const fetchMore = () => emit("fetchMore");
</script>

<template>
  <InfiniteScroll
    :dataSource="dataSource"
    :loading="loading"
    @fetchMore="fetchMore"
  >
    <template #renderItem="{ item }">
      <a-list-item class="rounded !px-4 !py-2">
        <SvgIcon :name="`coin-${item.currency}`" class="w-10 h-10 mr-4" />
        <a-list-item-meta class="flex">
          <template #title>
            <div class="flex">
              <div class="flex-grow text-base tracking-wide">
                {{ FlowTypeLable(item.type) }}
              </div>
              <div
                :class="[DirectionClass(item?.direction)]"
                class="tracking-wide"
              >
                {{ Format(item.operateAmount) }} {{ item.currency }}
              </div>
            </div>
          </template>
          <template #description
            ><span class="tracking-wide">{{ item.createTime }}</span>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </InfiniteScroll>
</template>
