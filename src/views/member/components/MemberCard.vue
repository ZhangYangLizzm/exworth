<script setup lang="ts">
import { loadMemberPhysicalCard, loadMemberVirtualCard } from "@/api/member";
import { useList } from "@/hooks";
import {
  CardMode,
  CARD_MODE_PHYSICAL,
  CARD_MODE_VIRTUAL,
} from "@/hooks/useCard";
import CardList from "./CardList.vue";

const props = defineProps({
  uuid: String,
});

const selectdKey = ref("PPC");

const filterOptions = computed(() => ({
  uuid: props.uuid,
}));

const {
  list: physicalList,
  loading,
  fetch: fetchPhysicalCard,
} = useList(loadMemberPhysicalCard, filterOptions);

const {
  list: virtualList,
  loading: VCC_Loading,
  fetch: fetchVirtualCard,
} = useList(loadMemberVirtualCard, filterOptions);

const cardInfo = ref<any>();

const rechargeModalRef = ref<any>();
const replaceModalRef = ref<any>();
const cardLossModalRef = ref<any>();

const modalRefs: Record<string, any> = {
  recharge: rechargeModalRef,
  replace: replaceModalRef,
  cardLoss: cardLossModalRef,
};

const onTabClick = (key: string) => {
  selectdKey.value = key;

  if (key === "PPC" && !physicalList.value.length && filterOptions.value.uuid) {
    fetchPhysicalCard();
  }
  if (key === "VCC" && !virtualList.value.length && filterOptions.value.uuid) {
    fetchVirtualCard();
  }
};

const topupMode = ref();
const onClick = ({
  item,
  type,
  mode,
}: {
  item: any;
  type: string;
  mode: CardMode;
}) => {
  if (mode) {
    topupMode.value = mode;
  }
  cardInfo.value = item;
  const modalRef = modalRefs[type];
  modalRef?.valueOf.show();
};

watch(
  () => props.uuid,
  () => {
    fetchPhysicalCard();
    selectdKey.value = "PPC";
  }
);
</script>
<template>
  <div class="h-full flex">
    <a-tabs
      @tabClick="(key) => onTabClick(key as string)"
      class="h-full w-full"
      :activeKey="selectdKey"
    >
      <a-tab-pane :tab="$t('OnPSpwMATKuG2io4jQP3a')" key="PPC">
        <CardList
          :dataSource="physicalList"
          :loading="loading"
          :cardMode="CARD_MODE_PHYSICAL"
          @click="onClick"
        />
      </a-tab-pane>
      <a-tab-pane :tab="$t('S2OrYOKW-4S0okv_ixAu-')" key="VCC">
        <CardList
          :dataSource="virtualList"
          :loading="VCC_Loading"
          :cardMode="CARD_MODE_VIRTUAL"
          @click="onClick"
        />
      </a-tab-pane>
    </a-tabs>
  </div>

  <!-- <ReChargeModal
    ref="rechargeModalRef"
    :cardInfo="cardInfo"
    :topupMode="topupMode"
  />
  <ReplaceModal ref="replaceModalRef" :cardInfo="cardInfo" />
  <CardLossModal ref="cardLossModalRef" :cardInfo="cardInfo" /> -->
</template>

<style scoped>
:deep(.ant-badge-status-text) {
  color: #fff;
}

:deep(.ant-tabs-content-holder) {
  overflow-y: auto !important;
}
</style>
