<script setup lang="ts">
import { loadMemberPhysicalCard, loadMemberVirtualCard } from "@/api/member";
import { useList } from "@/hooks";
import { CARD_MODE_PHYSICAL, CARD_MODE_VIRTUAL } from "@/hooks/useCard";
import {
  MEMBER_CARD_LOSS,
  MEMBER_CARD_REPLACE,
  MEMBER_CARD_TOPUP,
  useDrawerInject,
} from "@/hooks/useDrawer";
import CardList from "./CardList.vue";
import { CardLoss, Replace, Topup } from "./actions";
import { useAppStore } from "@/stores";

const route = useRoute();

const props = defineProps({
  uuid: String,
});

const uuid = computed(() => props.uuid || route.params.uuid);
const selectdKey = ref("PPC");

const filterOptions = computed(() => ({
  uuid: uuid.value,
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

const onClick = ({ item, type }: { item: any; type: string }) =>
  wrapClick(type, () => {
    {
      if (type === MEMBER_CARD_TOPUP) {
        if (selectdKey.value === "PPC") {
          topupMode.value = CARD_MODE_PHYSICAL;
        } else {
          topupMode.value = CARD_MODE_VIRTUAL;
        }
      }
      cardInfo.value = item;
    }
  });

const appStore = useAppStore();
if (!appStore.isMobile) {
  watch(
    () => uuid.value,
    () => {
      fetchPhysicalCard();
      selectdKey.value = "PPC";
    }
  );
} else if (uuid.value) {
  onMounted(() => {
    fetchPhysicalCard();
  });
}
</script>
<template>
  <div class="h-full flex bg-white rounded-xl px-4">
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

  <ExDrawer :open="drawerPattern === MEMBER_CARD_TOPUP">
    <Topup :cardInfo="cardInfo" :topupMode="topupMode" />
  </ExDrawer>
  <ExDrawer :open="drawerPattern === MEMBER_CARD_LOSS">
    <CardLoss :cardInfo="cardInfo" />
  </ExDrawer>
  <ExDrawer :open="drawerPattern === MEMBER_CARD_REPLACE">
    <Replace :cardInfo="cardInfo" />
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
