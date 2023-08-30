<script setup>
import { loadMemberPhysicalCard } from "@/api/member";
import { useList } from "@/libs/hooks/useList";
import { ReChargeModal, ReplaceModal, CardLossModal } from "./modal";
import ImgTextContainer from "./modeContainer/ImgTextContainer.vue";
import ListContainer from "./modeContainer/ListContainer.vue";

defineProps({
  mode: String,
});

const route = useRoute();

const {
  list: physicalList,
  loading,
  fetch: fetchPhysicalCard,
} = useList(loadMemberPhysicalCard, { uuid: route.params.uuid });

onMounted(() => {
  fetchPhysicalCard();
});
const cardInfo = ref();

const rechargeModalRef = ref();
const replaceModalRef = ref();
const cardLossModalRef = ref();
const modalRefs = {
  recharge: rechargeModalRef,
  replace: replaceModalRef,
  cardLoss: cardLossModalRef,
};

const onClick = ({ item, type }) => {
  cardInfo.value = item;
  const modalRef = modalRefs[type];
  modalRef?.value.show();
};
</script>
<template>
  <div class="p-4 shadow rounded-sm">
    <ComponentTitle :text="$t('OnPSpwMATKuG2io4jQP3a')" class="text-xl mt-4" />

    <template v-if="mode === 'imgTextMode'">
      <ImgTextContainer :dataSource="physicalList" @onClick="onClick" :loading="loading" />
    </template>
    <template v-else-if="mode === 'listMode'">
      <ListContainer :dataSource="physicalList" @onClick="onClick" :loading="loading" />
    </template>

    <!-- <ComponentTitle :text="$t('S2OrYOKW-4S0okv_ixAu-')" class="text-xl mt-4" /> -->
  </div>

  <ReChargeModal ref="rechargeModalRef" :cardInfo="cardInfo" />
  <ReplaceModal ref="replaceModalRef" :cardInfo="cardInfo" />
  <CardLossModal ref="cardLossModalRef" :cardInfo="cardInfo" />
</template>

<style scoped>
:deep(.ant-badge-status-text) {
  color: #fff;
}
</style>
