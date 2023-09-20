<script setup lang="ts">
import { loadMemberPhysicalCard, loadMemberVirtualCard } from "@/api/member";
import { useList } from "@/hooks";
import {
  CardMode,
  CARD_MODE_PHYSICAL,
  CARD_MODE_VIRTUAL,
} from "@/hooks/useCard";
import {
  MEMBER_CARD_LOSS,
  MEMBER_CARD_REPLACE,
  MEMBER_CARD_TOPUP,
  useDrawerInject,
} from "@/hooks/useDrawer";
import CardList from "./CardList.vue";
import { CardLoss, Replace, Topup } from "./actions/";

const props = defineProps({
  uuid: String,
});

const selectdKey = ref("PPC");

const filterOptions = computed(() => ({
  uuid: props.uuid,
}));

const { drawerPattern, wrapClick } = useDrawerInject();
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
}) =>
  wrapClick(type, () => {
    {
      if (mode) {
        topupMode.value = mode;
      }
      cardInfo.value = item;
    }
  });

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
      <a-tab-pane :tab="$t('OnPSpwMATKuG2io4jQP3a')" key="PPC" class="p-4">
        <CardList
          :dataSource="physicalList"
          :loading="loading"
          :cardMode="CARD_MODE_PHYSICAL"
          @click="onClick"
        />
      </a-tab-pane>
      <a-tab-pane :tab="$t('S2OrYOKW-4S0okv_ixAu-')" key="VCC" class="p-4">
        <CardList
          :dataSource="virtualList"
          :loading="VCC_Loading"
          :cardMode="CARD_MODE_VIRTUAL"
          @click="onClick"
        />
      </a-tab-pane>
    </a-tabs>
  </div>

  <ExDrawer>
    <CardLoss v-if="drawerPattern === MEMBER_CARD_LOSS" :cardInfo="cardInfo" />
    <Topup v-if="drawerPattern === MEMBER_CARD_TOPUP" :cardInfo="cardInfo" />
    <Replace
      v-if="drawerPattern === MEMBER_CARD_REPLACE"
      :cardInfo="cardInfo"
    />
  </ExDrawer>
</template>

<style scoped>
:deep(.ant-badge-status-text) {
  color: #fff;
}

:deep(.ant-tabs-content-holder) {
  overflow-y: auto !important;
}
</style>
./actions/CardLossModal.vue
