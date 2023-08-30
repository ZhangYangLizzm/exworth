<script setup>
import Card from "@/core/card/components/card";
import { useList } from "@/libs/hooks/useList";
import {
  CARD_MODE_PHYSICAL,
  CARD_MODE_VIRTUAL,
} from "@/core/card/stores/models/card";
import { loadPhysicalCard } from "@/api/card";
const {
  list: physicalList,
  loading,
  fetch: fetchPhysicalCard,
} = useList(loadPhysicalCard);

const columns = computed(() => [
  {
    title: "卡ID",
    key: "cardKey",
    dataIndex: "cardKey",
    align: "center",
  },
  {
    title: "持卡人編號",
    key: "cardHolderId",
    dataIndex: "cardHolderId",
    align: "center",
  },
  {
    title: "狀態",
    key: "cardStatus",
    dataIndex: "cardStatus",
    align: "center",
  },
]);
onMounted(() => {
  fetchPhysicalCard();
});
</script>

<template>
  <div class="p-4">
    <div class="flex gap-x-4">
      <div class="flex-1 flex bg-slate-100 rounded-xl gap-x-4">
        <Card brand="masterCard" :mode="CARD_MODE_PHYSICAL" class="basis-2/5" />
        <div>实体卡数量</div>
      </div>
      <div class="flex-1">
        <div class="flex-1 flex bg-slate-100 rounded-xl gap-x-4">
          <Card
            brand="masterCard"
            :mode="CARD_MODE_VIRTUAL"
            class="basis-2/5"
          />
          <div>虚拟卡数量</div>
        </div>
      </div>
    </div>

    <a-form layout="inline">
      <a-form-item>
        <a-input autocomplete="off" placeholder="請輸入卡ID"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input autocomplete="off" placeholder="請輸入持卡人編號"></a-input>
      </a-form-item>
      <a-form-item class="w-48">
        <a-select placeholder="選擇狀態"></a-select>
      </a-form-item>
    </a-form>
    <a-table
      :loading="loading"
      :dataSource="physicalList"
      :columns="columns"
      :pagination="false"
    ></a-table>
  </div>
</template>

<style scoped lang="less"></style>
