<script setup lang="ts">
import Functions from "@/views/member/components/Functions.vue";

defineProps({
  dataSource: Array,
  loading: Boolean,
  activeUUID: String,
});

const emit = defineEmits(["fetchMore", "click"]);

const onClick = (uuid: string) => {
  emit("click", uuid);
};

const columns = reactive([
  {
    title: "郵箱",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "PROUID",
    dataIndex: "uuid",
    key: "PROUID",
  },
  {
    title: "已開通功能",
    dataIndex: "memberFunction",
    key: "functions",
  },
  {
    title: "操作",
    key: "actions",
  },
]);
</script>

<template>
  <ATable
    :loading="loading"
    :dataSource="dataSource"
    :columns="columns"
    :pagination="false"
  >
    <template #bodyCell="{ column, value, record }">
      <template v-if="column.key === 'functions'">
        <Functions :functions="value" />
      </template>
      <template v-if="column.key === 'actions'">
        <a-button @click="onClick(record.uuid)" type="text" class="text-primary"
          >詳情</a-button
        >
      </template>
    </template>
  </ATable>
</template>
