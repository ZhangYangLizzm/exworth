<script setup lang="ts">
import { getBalanceHistory } from "@/api/wallet";
import { useList } from "@/hooks";
import { AccountDetails, FilterForm } from "./components";
import { useDrawerInject, WALLET_FILTER } from "@/hooks/useDrawer";

const { wrapClick, drawerPattern, closeDrawer } = useDrawerInject();
const filterOptions = reactive({
  createTime: undefined,
  type: undefined,
  currency: undefined,
  affectOrderNo: undefined,
});
const {
  fetch,
  list: dataSource,
  loading,
  fetchMore,
} = useList(getBalanceHistory, filterOptions, {
  mode: "list",
  pageSize: 8,
  immediate: true,
});
</script>

<template>
  <div class="flex overflow-y-hidden flex-col bg-white p-4 rounded-xl">
    <ComponentTitle :title="$t('ovLktXuIHMUA7a1STIy3X')">
      <template #extra>
        <AButton type="primary" @click="wrapClick(WALLET_FILTER)">
          {{ $t("tBff95q02RqhzFr_gdFQp") }}
        </AButton>
      </template>
    </ComponentTitle>
    <AccountDetails
      :loading="loading"
      :dataSource="dataSource"
      @fetchMore="fetchMore"
    />
  </div>
  <ExDrawer :open="drawerPattern === WALLET_FILTER">
    <FilterForm
      v-model:options="filterOptions"
      @fetch="
        () => {
          fetch({ noAppend: true });
          closeDrawer();
        }
      "
    />
  </ExDrawer>
</template>

<style scoped lang="less"></style>
