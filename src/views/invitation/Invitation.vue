<script setup lang="ts">
import { useList } from "@/hooks";
import { useMember } from "@/hooks/useMember";
import { loadInvitation } from "@/api/member";
import InviteForm from "./InviteForm.vue";
import {
  MEMBER_INVITATION_STATUS_JOINED,
  MEMBER_INVITATION_STATUS_INVITED,
  MEMBER_INVITATION_STATUS_ACCEPTED,
} from "@/hooks/useMember";

const { MEMBER_INVITATION_STATUS_TEXT, MEMBER_INVITATION_STATUS_COLOR } =
  useMember();

const filterOptions = reactive({
  emailLike: "",
  status: "",
});

const {
  list: dataSource,
  fetch,
  loading,
  fetchMore,
} = useList(loadInvitation, filterOptions, { pageSize: 10, mode: "list" });

const hanldeInvitationMenuClick = (key: string) => {
  filterOptions.status = key;
  fetch({ noAppend: true });
};

onMounted(() => {
  fetch();
});
</script>

<template>
  <div class="flex relative h-full gap-x-4">
    <div class="flex-grow pr-4 flex flex-col bg-white rounded-xl p-4">
      <ComponentTitle title="邀請記錄">
        <template #extra>
          <div class="flex gap-x-2">
            <a-input
              allow-clear
              placeholder="Search"
              @keyup.enter="fetch({ noAppend: true })"
              v-model:value="filterOptions.emailLike"
            >
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
            <a-dropdown class="!bg-slate-100 text-slate-500 hover:text-black">
              <a-button type="text">Status<down-outlined /></a-button>
              <template #overlay>
                <a-menu
                  @click="({ key }) => hanldeInvitationMenuClick(key as string)"
                >
                  <a-menu-item :key="undefined">全部</a-menu-item>
                  <a-menu-item :key="MEMBER_INVITATION_STATUS_INVITED"
                    >邀請中
                  </a-menu-item>
                  <a-menu-item :key="MEMBER_INVITATION_STATUS_ACCEPTED"
                    >未註冊
                  </a-menu-item>
                  <a-menu-item :key="MEMBER_INVITATION_STATUS_JOINED"
                    >已加入
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
      </ComponentTitle>

      <InfiniteScroll
        :dataSource="dataSource"
        :loading="loading"
        @fetchMore="fetchMore"
      >
        <template #renderItem="{ item }">
          <a-list-item class="rounded">
            <a-list-item-meta>
              <template #title>
                <div class="flex items-center tracking-wider">
                  <MailOutlined class="mr-2 text-xl" />{{ item.email }}
                </div>
              </template>
              <template #description>
                <div class="flex flex-col">
                  <div class="flex items-center">
                    <SvgIcon name="time" class="w-5 h-5 !text-primary mr-2" />
                    {{ item.sendTime }}
                  </div>
                  <div
                    class="self-end rounded px-4 py-1 text-[rgb(203,212,99)]"
                    :style="{ ...MEMBER_INVITATION_STATUS_COLOR(item.status) }"
                  >
                    {{ MEMBER_INVITATION_STATUS_TEXT(item.status) }}
                  </div>
                </div>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </InfiniteScroll>
    </div>
    <div class="basis-2/5 p-4 bg-white rounded-xl">
      <ComponentTitle title="成員邀請" />
      <InviteForm @refresh="fetch" />
    </div>
  </div>
</template>
