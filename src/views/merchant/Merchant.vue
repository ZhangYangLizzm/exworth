<script setup lang="ts">
import { useList } from "@/hooks/useList";
import { getMerchantList } from "@/api/merchant";
import { useMerchantCheckStatus } from "@/hooks/useStatus";
import { TableProps } from "ant-design-vue";

const filterOptions: Record<string, any> = reactive({
  merchantId: undefined,
  email: undefined,
  createTime: undefined,
});
const {
  list: dataSource,
  fetch,
  loading,
  totalCount,
  pageID,
  pageSize,
  onPageChange,
} = useList(getMerchantList, filterOptions, {
  immediate: true,
});

const columns = reactive([
  {
    dataIndex: "merchantId",
    key: "MerchantId",
    title: "商戶編號",
  },
  {
    dataIndex: "merchantName",
    key: "MerchantName",
    title: "商戶名稱",
  },

  {
    dataIndex: "merchantGroupName",
    key: "MerchantGroupName",
    title: "商戶組",
  },
  {
    dataIndex: "createTime",
    key: "CreateTime",
    title: "創建時間",
  },
  {
    dataIndex: "checkStatus",
    key: "CheckStatus",
    title: "審核狀態",
  },
  {
    key: "Operation",
    title: "操作",
  },
]);

const { getStatusLabel, statusOptions } = useMerchantCheckStatus();

const renderOptions = [
  {
    label: "商户编号",
    component: "AInput",
    valueKey: "merchantId",
  },
  {
    label: "审核状态",
    component: "ASelect",
    valueKey: "checkStatus",
    options: statusOptions,
  },
];

const tableSelectedKeys = ref<Array<string | number>>([]);
const canAudit = ref(false);
const canBind = ref(false);
const canUnbind = ref(false);
const reset = () => {
  canAudit.value = false;
  canBind.value = false;
  canUnbind.value = false;
};
const rowSelection: TableProps["rowSelection"] = {
  getCheckboxProps: (record: any) => ({
    ...record,
    key: record.merchantId,
  }),
  onChange(selectedRowKeys, selectedRows) {
    tableSelectedKeys.value = selectedRowKeys;
    if (selectedRows.length === 0) reset();

    const hasGroup = selectedRows.some((row) =>
      Reflect.has(row, "merchantGroupName")
    );

    if (hasGroup) {
      canUnbind.value = true;
    }
    canBind.value = !canUnbind.value;
  },
};
</script>

<template>
  <div class="overflow-auto flex flex-col h-full">
    <FilterForm
      @search="fetch"
      :render-options="renderOptions"
      v-model:value="filterOptions"
    >
      <template #extra-button>
        <AButton type="primary">新增</AButton>
        <AButton type="primary" :disabled="!canAudit">审核</AButton>
        <AButton type="primary" :disabled="!canBind">绑定商户组</AButton>
        <AButton type="primary" :disabled="!canUnbind">解绑商户组</AButton>
      </template>
    </FilterForm>

    <ATable
      class="grow"
      :row-selection="rowSelection"
      :dataSource="dataSource"
      :loading="loading"
      :columns="columns"
      :pagination="false"
      row-key="merchantId"
    >
      <template #bodyCell="{ column, value }">
        <template v-if="!value">
          <span> - - </span>
        </template>
        <template v-if="column.key === 'CheckStatus'">
          {{ getStatusLabel(value) }}
        </template>
        <template v-if="column.key === 'Operation'">
          <ArrowRightOutlined class="hover:text-primary cursor-pointer" />
        </template>
      </template>
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
