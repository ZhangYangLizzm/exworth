<script setup>
import { useAppStore } from "@/libs/stores/modules/app";
import Functions from "@/views/member/member/common/Functions.vue";

const { isMobile } = useAppStore();
const { t } = useI18n();

defineProps({
  dataSource: Array,
  loading: Boolean,
});

const router = useRouter()
const columns = computed(() => [
  {
    title: "郵箱",
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
    key: "manipulate",
    align: "right",
  },
]);
</script>

<template>
  <a-table :dataSource="dataSource" :columns="columns" :pagination="false" :loading="loading" v-if="!isMobile">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'memberFunction'">
        <Functions :functions="record.memberFunction" />
      </template>
      <template v-if="column.key === 'manipulate'">
        <a-button type="text" class="text-primary" @click="
          router.push({
            name: 'MemberProfile',
            params: { uuid: record.uuid },
          })
          ">
          {{ $t("4qOuSSUuFfw7tfi2LHgoz") }}
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<style scoped lang="less"></style>
