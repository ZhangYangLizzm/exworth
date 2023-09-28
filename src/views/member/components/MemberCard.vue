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
import { useAppStore } from "@/stores/app";

const route = useRoute();

const props = defineProps({
  uuid: String,
  tabKey: String,
});

const emit = defineEmits(["update:tabKey"]);

const uuid = computed(() => props.uuid || route.params.uuid);

const selectdKey = computed({
  get() {
    return props.tabKey;
  },
  set(value) {
    emit("update:tabKey", value);
  },
});

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
      physicalList.value = [];
      virtualList.value = [];
      if (selectdKey.value === "PPC") {
        fetchPhysicalCard();
      } else if (selectdKey.value === "VCC") {
        fetchVirtualCard();
      }
    }
  );

  watch(
    () => selectdKey.value,
    (newVal) => {
      if (newVal === "PPC") {
        fetchPhysicalCard();
      } else if (newVal == "VCC") {
        fetchVirtualCard();
      }
    }
  );
} else if (uuid.value) {
  onMounted(() => {
    fetchPhysicalCard();
  });
}
</script>
<template>
  <div class="h-full bg-white rounded-xl p-4">
    <ComponentTitle title="成員卡片" />

    <a-tabs class="h-full w-full" v-model:active-key="selectdKey">
      <a-tab-pane :tab="$t('OnPSpwMATKuG2io4jQP3a')" key="PPC" class="p-2">
        <CardList
          :dataSource="physicalList"
          :loading="loading"
          :cardMode="CARD_MODE_PHYSICAL"
          @click="onClick"
        />
      </a-tab-pane>
      <a-tab-pane :tab="$t('S2OrYOKW-4S0okv_ixAu-')" key="VCC" class="p-2">
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
