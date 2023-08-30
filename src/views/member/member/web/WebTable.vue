<script setup>
import { useAppStore } from "@/libs/stores/modules/app";
import Functions from "@/views/member/member/common/Functions.vue";
import useClipboard from "@/hooks/useClipboard.js";
const { copy } = useClipboard();

const { t } = useI18n();

defineProps({
  isMobile: Boolean,
  dataSource: Array,
  loading: Boolean,
});

const router = useRouter();
const columns = computed(() => [
  {
    title: t("kXAMWI86h-rooSEuCAow-"),
    key: "email",
    dataIndex: "email",
  },
  {
    title: "PROUID",
    key: "uuid",
    dataIndex: "uuid",
  },
  {
    // title: [t('OnPSpwMATKuG2io4jQP3a'), t('S2OrYOKW-4S0okv_ixAu-'), t('_iMQNMQatEhTi4yWkEjxs')].join(' / '),
    title: t("1fmAXeo8wqLzfyPwgBtUa"),
    key: "memberFunction",
    align: "center",
  },
  {
    title: t("oUrKjFtbUi26i0Ags3eCG"),
    key: "operate",
    align: "center",
  },
]);
</script>

<template>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    :pagination="false"
    :loading="loading"
    v-if="!isMobile"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="['email', 'uuid'].includes(column.key)">
        {{ record[column.key] }}
        <copy-outlined
          class="cursor-pointer ml-2"
          @click="copy(record[column.key])"
        />
      </template>
      <template v-if="column.key === 'memberFunction'">
        <Functions :functions="record.memberFunction" :isMobile="isMobile" />
      </template>
      <template v-if="column.key === 'operate'">
        <a-button
          type="text"
          class="text-primary"
          @click="
            router.push({
              name: 'MemberProfile',
              params: { uuid: record.uuid },
            })
          "
        >
          {{ $t("4qOuSSUuFfw7tfi2LHgoz") }}
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<style scoped lang="less"></style>
