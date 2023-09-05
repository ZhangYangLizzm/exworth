<script setup>
import { useAppStore } from "@/libs/stores/modules/app";
import Functions from "@/views/member/member/common/Functions.vue";

const router = useRouter();
defineProps({
  isMobile: Boolean,
  dataSource: Array,
  loading: Boolean,
});
</script>

<template>
  <a-list :dataSource="dataSource" v-if="isMobile" :loading="loading">
    <template #renderItem="{ item }">
      <a-list-item
        class="rounded px-4 shadow"
        @click="
          router.push({
            name: 'MemberProfile',
            params: { uuid: item.uuid },
          })
        "
      >
        <a-list-item-meta>
          <template #title>
            <div class="flex">
              <div class="flex-grow">
                {{ $t("kXAMWI86h-rooSEuCAow-") }}: {{ item.email }}
              </div>
            </div>
          </template>
          <template #description>
            <div>RPOUID: {{ item.uuid }}</div>
            <Functions
              :functions="item.memberFunction"
              class="float-right"
              :isMobile="isMobile"
            />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
