<script setup lang="ts">
import { useList } from "@/hooks";
import { useDrawerInject, MEMBER_INVITE } from "@/hooks/useDrawer";
import { useMember } from "@/hooks/useMember";
import { loadInvitation } from "@/api/member";
import InviteForm from "./InviteForm.vue";
import {
  MEMBER_INVITATION_STATUS_JOINED,
  MEMBER_INVITATION_STATUS_INVITED,
  MEMBER_INVITATION_STATUS_ACCEPTED,
} from "@/hooks/useMember";
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
const { wrapClick, drawerPattern } = useDrawerInject();
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
} = useList(loadInvitation, filterOptions, {
  mode: "list",
  immediate: true,
});

const hanldeInvitationMenuClick = (key: string) => {
  filterOptions.status = key;
  fetch({ noAppend: true });
};
</script>

<template>
  <div class="flex relative h-full gap-x-4">
    <div class="flex-grow pr-4 flex flex-col bg-white rounded-xl p-4">
      <ComponentTitle :title="$t('qaS2XVHmYe3vNdvtTQ7Ad')">
        <template #extra>
          <div class="flex gap-x-2">
            <a-input
              v-if="!appStore.isMobile"
              allow-clear
              :placeholder="$t('OcfJlH4QmIPpM8_XAtT0h')"
              @keyup.enter="fetch({ noAppend: true })"
              v-model:value="filterOptions.emailLike"
            >
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
            <a-dropdown class="!bg-slate-100 text-slate-500 hover:text-black">
              <a-button type="text"
                >{{ $t("2azhTayaBBC1zqWCc8lq5") }}<down-outlined
              /></a-button>
              <template #overlay>
                <a-menu
                  @click="({ key }) => hanldeInvitationMenuClick(key as string)"
                >
                  <a-menu-item :key="undefined">{{
                    $t("T8jku5XFeq-1ZPcuDe_7B")
                  }}</a-menu-item>
                  <a-menu-item :key="MEMBER_INVITATION_STATUS_INVITED"
                    >{{ $t("YQT7T9hm26PiwFUJvrxSm") }}
                  </a-menu-item>
                  <a-menu-item :key="MEMBER_INVITATION_STATUS_ACCEPTED"
                    >{{ $t("Iisyekt19U48nfo2BFypV") }}
                  </a-menu-item>
                  <a-menu-item :key="MEMBER_INVITATION_STATUS_JOINED"
                    >{{ $t("w_iPwp1wwma-yB2Ly5PW4") }}
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>

            <a-button
              type="primary"
              @click="() => wrapClick(MEMBER_INVITE)"
              v-if="appStore.isMobile"
              >{{ $t("VPTp-QATJSurGdzHeGrXT") }}</a-button
            >
          </div>
        </template>
      </ComponentTitle>

      <a-input
        v-if="appStore.isMobile"
        allow-clear
        :placeholder="$t('OcfJlH4QmIPpM8_XAtT0h')"
        @keyup.enter="fetch({ noAppend: true })"
        v-model:value="filterOptions.emailLike"
        class="mt-4"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input>

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
    <div class="basis-2/5 p-4 bg-white rounded-xl" v-if="!appStore.isMobile">
      <ComponentTitle :title="$t('6zx8lqftFQuNpgSzzlpUU')" class="mb-4" />
      <InviteForm @refresh="fetch" />
    </div>
    <ExDrawer
      :title="$t('6zx8lqftFQuNpgSzzlpUU')"
      v-else="appStore.isMobile"
      :open="drawerPattern === MEMBER_INVITE"
    >
      <InviteForm @refresh="fetch" />
    </ExDrawer>
  </div>
</template>
