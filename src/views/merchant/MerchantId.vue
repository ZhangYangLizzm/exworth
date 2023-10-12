<script setup lang="ts">
import {
  BaseInfo,
  TradSetting,
  VirtualCreditCard,
  PrepaidCard,
  CardBinSetting,
  MerchantSetting,
} from "./tabComponents";

const { merchantId, merchantName } = defineProps<{
  merchantId: string;
  merchantName: string;
}>();

const tabPaneItems = [
  {
    key: "BaseInfo",
    tab: "基础信息",
    component: BaseInfo,
    props: {
      merchantId: merchantId,
    },
  },
  {
    key: "TradSetting",
    tab: "交易设置",
    component: TradSetting,
    props: {
      merchantId: merchantId,
    },
  },
  {
    key: "PrepaidCard",
    tab: "实体卡",
    component: PrepaidCard,
    props: {
      merchantId: merchantId,
    },
  },
  {
    key: "VirtualCreditCard",
    tab: "虚拟卡",
    component: VirtualCreditCard,
    props: {
      merchantId: merchantId,
    },
  },
  {
    key: "CardBin",
    tab: "卡BIN设置",
    component: CardBinSetting,
  },
  {
    key: "MerchantSetting",
    tab: "商户设置",
    component: MerchantSetting,
  },
];
</script>

<template>
  <APageHeader
    @back="$router.push({ name: 'MerchantList' })"
    :title="`${merchantName} ( ${merchantId})`"
    class="!p-0"
  />

  <ATabs type="card" class="mt-4">
    <ATabPane
      v-for="tabPaneItem in tabPaneItems"
      :key="tabPaneItem.key"
      :tab="tabPaneItem.tab"
    >
      <component
        :is="tabPaneItem.component"
        :merchantId="tabPaneItem.props?.merchantId"
      />
    </ATabPane>
  </ATabs>
</template>
