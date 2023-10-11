<script setup lang="ts">
import { useList } from "@/hooks/useList";
import { getUserList } from "@/api/user";
const filterOptions: Record<string, any> = reactive({
  uuid: undefined,
  email: undefined,
  createTime: undefined,
});
const {
  list: dataSource,
  loading,
  totalCount,
  pageID,
  pageSize,
  onPageChange,
} = useList(getUserList, filterOptions, {
  immediate: true,
});

const columns = reactive([
  {
    dataIndex: "uuid",
    key: "uuid",
    title: "用戶編號",
  },
  {
    dataIndex: "email",
    key: "email",
    title: "郵箱",
  },
  {
    dataIndex: "createTime",
    key: "createTime",
    title: "註冊時間",
  },
  {
    dataIndex: "status",
    key: "status",
    title: "狀態",
  },
]);
</script>

<template>
  <div class="overflow-auto">
    <ATable
      :dataSource="dataSource"
      :loading="loading"
      :columns="columns"
      :pagination="false"
    >
    </ATable>

    <div class="text-right mt-4">
      <APagination
        :total="totalCount"
        :current="pageID"
        :pageSize="pageSize"
        hideOnSinglePage
        @change="onPageChange"
      >
      </APagination>
    </div>
  </div>
</template>
