<script setup lang="ts">
import { useList } from "@/hooks/useList";
import { loadMember } from "@/api/member";
import MemberList from "./components/MemberList.vue";
import MemberCard from "./components/MemberCard.vue";
import { useDrawerInject, MEMBER_TRANSFER } from "@/hooks/useDrawer";
import Transfer from "./components/actions/Transfer.vue";

const memberFilterOptions = reactive({
  emailLike: undefined,
});

const {
  list: dataSource,
  fetch: fetchMember,
  loading: memberLoading,
  fetchMore,
} = useList(loadMember, memberFilterOptions, {
  mode: "list",
  immediate: true,
});

const uuid = ref<string>("");

// 获得列表数据时渲染第一个成员的卡片
const stopWatch = watch(
  () => dataSource.value,
  (newVal) => {
    if (newVal) {
      uuid.value = newVal[0].uuid;
      stopWatch();
    }
  }
);

const { drawerPattern, wrapClick } = useDrawerInject();
</script>

<template>
  <div class="flex h-full relative gap-x-4">
    <div class="flex-grow pr-4 bg-white p-4 rounded-xl">
      <ComponentTitle :title="$t('DJA8mXTnjyyt6SpiAbvhO')" class="mb-4">
        <template #extra>
          <div class="flex gap-x-2">
            <a-input
              allow-clear
              placeholder="Search"
              v-model:value="memberFilterOptions.emailLike"
              @keyup.enter="() => fetchMember()"
            >
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
            <a-button type="primary" @click="wrapClick(MEMBER_TRANSFER)" :disabled="drawerPattern===MEMBER_TRANSFER">
              轉帳
            </a-button>
          </div>
        </template>
      </ComponentTitle>

      <MemberList
        :dataSource="dataSource"
        :loading="memberLoading"
        @click="(id) => (uuid = id)"
        @fetchMore="fetchMore"
        :activeUUID="uuid"
      />
    </div>
    <div class="basis-[400px] shrink-0 bg-white p-4 rounded-xl">
      <MemberCard :uuid="uuid" />
    </div>
  </div>

  <ExDrawer>
    <Transfer v-if="drawerPattern === MEMBER_TRANSFER"></Transfer>
  </ExDrawer>
</template>
