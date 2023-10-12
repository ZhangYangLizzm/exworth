<script setup lang="ts">
import { getMerchantPrepaidCardList } from "@/api/merchant";
import { useList } from "@/hooks/useList";
import { TableColumnsType } from "ant-design-vue";

const { merchantId } = defineProps<{
  merchantId: string;
}>();

const {
  list: dataSource,
  loading,
  totalCount,
  pageID,
  pageSize,
  onPageChange,
} = useList(getMerchantPrepaidCardList, { merchantId }, { immediate: true });

const columns: TableColumnsType = [
  {
    dataIndex: "ownerId",
    key: "OwnerId",
    title: "持卡人编号",
  },
  {
    dataIndex: "cardKey",
    key: "CardKey",
    title: "卡Id",
  },
  {
    dataIndex: "cardNo",
    key: "CardNo",
    title: "卡號",
  },
  {
    dataIndex: "cardType",
    key: "CardType",
    title: "卡類型",
  },
  {
    dataIndex: "cardCurrency",
    key: "cardCurrency",
    title: "餘額幣種",
  },
  {
    dataIndex: "cardBalance",
    key: "CardBalance",
    title: "卡餘額",
  },
  {
    dataIndex: "topUpRate",
    key: "TopUpRate",
    title: "費率",
  },
  {
    dataIndex: "createTime",
    key: "CreateTime",
    title: "創建時間",
  },
  {
    dataIndex: "activationTime",
    key: "ActivationTime",
    title: "激活時間",
  },
  {
    key: "Operation",
    title: "操作",
    fixed: "right",
  },
];
</script>

<template>
  <ATable
    :dataSource="dataSource"
    :loading="loading"
    :columns="columns"
    :pagination="false"
    :scroll="{ x: 1500 }"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'Operation'">
        <ADropdown>
          <a class="text-primary">···</a>
          <template #overlay>
            <AMenu>
              <AMenuItem> 消费记录 </AMenuItem>
              <AMenuItem> 密码查询 </AMenuItem>
              <AMenuItem> 更新余额 </AMenuItem>
              <AMenuItem> 绑定持卡人 </AMenuItem>
              <AMenuItem> 修改充值费率 </AMenuItem>
            </AMenu>
          </template>
        </ADropdown>
      </template>
    </template>
  </ATable>
  <div class="text-right mt-4">
    <APagination
      show-less-items
      :total="totalCount"
      :current="pageID"
      :pageSize="pageSize"
      @change="onPageChange"
    >
    </APagination>
  </div>
</template>
