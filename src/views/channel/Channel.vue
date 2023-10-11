<script setup lang="ts">
import { useList } from "@/hooks/useList";
import { getChannelList } from "@/api/channel";

const filterOptions: Record<string, any> = reactive({
  agentName: undefined,
  checkStatus: undefined,
  level: undefined,
  // 所属渠道
  parentName: undefined,
});

const {
  list: dataSource,
  loading,
  totalCount,
  pageID,
  pageSize,
  onPageChange,
} = useList(getChannelList, filterOptions, {
  immediate: true,
});

const columns = reactive([
  {
    dataIndex: "agentId",
    key: "agentId",
    title: "渠道編號",
  },
  {
    dataIndex: "agentName",
    key: "agentName",
    title: "渠道名称",
  },
  {
    dataIndex: "parentName",
    key: "parentName",
    title: "所屬渠道",
  },
  {
    dataIndex: "level",
    key: "level",
    title: "渠道層級",
  },
  {
    dataIndex: "checkStatus",
    key: "checkStatus",
    title: "審核狀態",
  },
  {
    dataIndex: "updateTime",
    key: "updateTime",
    title: "更新時間",
  },
]);
</script>

<template>
  <div class="overflow-auto">
    <ATable
      :rowKey="(record) => record.uuid"
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
