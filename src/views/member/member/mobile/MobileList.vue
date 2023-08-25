<script setup>
import { useAppStore } from "@/libs/stores/modules/app";
import Functions from "@/views/member/member/common/Functions.vue";

const { isMobile } = useAppStore();
const { t } = useI18n();
const router = useRouter();
defineProps({
  dataSource: Array,
  loading: Boolean,
});
</script>

<template>
  <a-list :dataSource="dataSource" v-if="isMobile" :loading="loading">
    <template #renderItem="{ item }">
      <a-list-item class="rounded px-2 shadow" @click="
        router.push({
          name: 'MemberProfile',
          params: { uuid: item.uuid },
        })
        ">
        <a-list-item-meta>
          <template #title>
            <div class="flex">
              <div class="flex-grow">
                {{ t("kXAMWI86h-rooSEuCAow-") }}: {{ item.email }}
              </div>
            </div>
          </template>
          <template #description>
            <div>RPOUID: {{ item.uuid }}</div>
            <Functions :functions="item.memberFunction" class="float-right" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

