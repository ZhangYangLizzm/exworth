<script setup>
import { useList } from "@/libs/hooks/useList";
import { loadMember } from "@/api/member";
import { loadInvitation, invite } from "@/api/member";
import MobileList from "./member/mobile/MobileList.vue";

import { useMember } from "@/stores/modules/member";

const { MEMBER_INVITATION_STATUS_TEXT, MEMBER_INVITATION_STATUS_BADGE } =
  useMember();

const memberFilterOptions = reactive({
  emailLike: undefined,
});

const {
  list: dataSource,
  fetch: fetchMember,
  loading: memberLoading,
} = useList(loadMember, memberFilterOptions);

const filterOptions = reactive({
  emailLike: undefined,
  status: undefined,
});

const {
  list: invitationDataSource,
  fetch: fetchInvitation,
  loading: invitationLoading,
} = useList(loadInvitation, filterOptions);

onMounted(async () => {
  await fetchMember();
  fetchInvitation();
});
</script>

<template>
  <div class="px-4">
    <ComponentTitle :text="$t('DJA8mXTnjyyt6SpiAbvhO')">
      <template #extra>
        <a-input placeholder="Search"> </a-input>
      </template>
    </ComponentTitle>

    <MobileList :dataSource="dataSource" :loading="memberLoading" />
    <ComponentTitle :text="$t('6e9lOmW7RuhrqYotHMpJ8')" class="mt-4">
      <template #extra>
        <div class="flex gap-x-2">
          <a-input placeholder="Search"> </a-input>
          <a-dropdown>
            <a-button type="text">More<down-outlined /></a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item> 邀請成員 </a-menu-item>
                <a-sub-menu title="狀態篩選">
                  <a-menu-item>已加入 </a-menu-item>
                  <a-menu-item>未註冊 </a-menu-item>
                  <a-menu-item>邀請中 </a-menu-item>
                </a-sub-menu>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </template>
    </ComponentTitle>

    <a-list :dataSource="invitationDataSource" :loading="invitationLoading">
      <template #renderItem="{ item }">
        <a-list-item class="rounded px-4 shadow w-[350px] mb-2">
          <a-list-item-meta>
            <template #title>
              <div class="flex">
                <div class="flex-grow">
                  {{ $t("kXAMWI86h-rooSEuCAow-") }}: {{ item.email }}
                </div>
                <a-badge
                  :status="MEMBER_INVITATION_STATUS_BADGE(item.status)"
                  :text="MEMBER_INVITATION_STATUS_TEXT(item.status)"
                />
              </div>
            </template>
            <template #description>
              <div>邀請時間: {{ item.sendTime }}</div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<style scoped lang="less"></style>
