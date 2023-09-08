<script setup>
import { loadMemberPhysicalCard, loadMemberVirtualCard } from "@/api/member";
import { useList } from "@/libs/hooks/useList";
import { ReChargeModal, ReplaceModal, CardLossModal } from "./modal";
import ImgTextContainer from "./modeContainer/ImgTextContainer.vue";
import ListContainer from "./modeContainer/ListContainer.vue";
import {
  CARD_MODE_PHYSICAL,
  CARD_MODE_VIRTUAL,
} from "@/core/card/stores/models/card";

defineProps({
  mode: String,
});

const route = useRoute();

const {
  list: physicalList,
  loading,
  fetch: fetchPhysicalCard,
} = useList(loadMemberPhysicalCard, { uuid: route.params.uuid });

const {
  list: virtualList,
  loading: VCC_Loading,
  fetch: fetchVirtualCard,
} = useList(loadMemberVirtualCard, { uuid: route.params.uuid });

const cardInfo = ref();

const rechargeModalRef = ref();
const replaceModalRef = ref();
const cardLossModalRef = ref();
const modalRefs = {
  recharge: rechargeModalRef,
  replace: replaceModalRef,
  cardLoss: cardLossModalRef,
};

const topupMode = ref();
const onClick = ({ item, type, topupMode: mode }) => {
  if (mode) {
    topupMode.value = mode;
  }
  cardInfo.value = item;
  const modalRef = modalRefs[type];
  modalRef?.value.show();
};

onMounted(async () => {
  await fetchPhysicalCard();
  fetchVirtualCard();
});
</script>

<template>
  <div class="p-4 shadow rounded  ">
    <ComponentTitle :text="$t('OnPSpwMATKuG2io4jQP3a')" class="text-xl mt-4" />
    <ImgTextContainer
      v-if="mode === 'imgTextMode'"
      :dataSource="physicalList"
      @onClick="onClick"
      :loading="loading"
      :type="CARD_MODE_PHYSICAL"
    />
    <ListContainer
      v-else-if="mode === 'listMode'"
      :dataSource="physicalList"
      @onClick="onClick"
      :loading="loading"
      :type="CARD_MODE_PHYSICAL"
    />

    <ComponentTitle :text="$t('S2OrYOKW-4S0okv_ixAu-')" class="text-xl mt-4" />
    <ImgTextContainer
      v-if="mode === 'imgTextMode'"
      :dataSource="virtualList"
      @onClick="onClick"
      :loading="VCC_Loading"
      :type="CARD_MODE_VIRTUAL"
    />
    <ListContainer
      v-else-if="mode === 'listMode'"
      :type="CARD_MODE_VIRTUAL"
      :dataSource="virtualList"
      @onClick="onClick"
      :loading="VCC_Loading"
    />
  </div>

  <ReChargeModal
    ref="rechargeModalRef"
    :cardInfo="cardInfo"
    :topupMode="topupMode"
  />
  <ReplaceModal ref="replaceModalRef" :cardInfo="cardInfo" />
  <CardLossModal ref="cardLossModalRef" :cardInfo="cardInfo" />
</template>

<style scoped>
:deep(.ant-badge-status-text) {
  color: #fff;
}
</style>
