<script setup lang="ts">
import Functions from "./Functions.vue";

defineProps({
  dataSource: Array,
  loading: Boolean,
  activeUUID: String,
});

const emit = defineEmits(["fetchMore", "click"]);

const onClick = (uuid: string) => {
  emit("click", uuid);
};

const onFetchMore = () => {
  emit("fetchMore");
};
</script>

<template>
  <InfiniteScroll
    :dataSource="dataSource"
    :loading="loading"
    @fetchMore="onFetchMore"
  >
    <template #renderItem="{ item }">
      <a-list-item
        class="rounded cursor-pointer hover:bg-slate-100 !px-2 !py-0"
        :class="[activeUUID === item.uuid ? 'bg-slate-100' : 'bg-white']"
      >
        <a-list-item-meta @click="onClick(item.uuid)">
          <template #title>
            <div class="flex flex-col gap-y-2">
              <div class="flex-grow tracking-wide">
                <MailOutlined class="mr-1" />
                {{ item.email }}
              </div>
              <div class="tracking-wide">
                RPOUID:
                <span class="ml-1">
                  {{ item.uuid }}
                </span>
              </div>
              <div class="flex justify-end">
                <Functions :functions="item.memberFunction" />
              </div>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </InfiniteScroll>
</template>
