<script setup>
import { useList } from "@/libs/hooks/useList";
import SvgIcon from "@/libs/components/svgIcon";

import { getBalanceHistory } from "@/api/wallet";
import DateForm from "./DateForm.vue";
import RadioSelect from "./RadioSelect.vue";
import { useAccountDetails } from "@/views/wallet/history/enum.js";
import { formatRangePickerTime } from "@/views/wallet/history/formatRangePickerTime";
const { getText, getList } = useAccountDetails();
const filterOptions = reactive({
  direction: undefined,
  type: undefined,
  createTime: new Array(2),
});

const showDateSelect = ref(false);
const showAccountSelect = ref(false);
const options = [
  {
    label: "全部",
    value: undefined,
  },
  {
    label: "增加",
    value: 0,
  },
  {
    label: "减少",
    value: 1,
  },
];

const flowType = computed(() => {
  const list = getList().map((item) => {
    const [value, label] = item;
    return { value, label };
  });
  return [{ label: "全部", value: undefined }, ...list];
});

const fetchOptions = computed(() => ({
  ...filterOptions,
  createTime:
    formatRangePickerTime(filterOptions.createTime?.map((time) => time.join("-"))) ||
    undefined,
}));
const { fetch, list: dataSource, loading, pageID } = useList(
  getBalanceHistory,
  fetchOptions
);

const onConfirm = async () => {
  fetch();
  showAccountSelect.value = false;
};

onMounted(() => {
  fetch();
});

const refreshLoading = ref(false);
const onRefresh = async () => {
  await fetch();
  refreshLoading.value = false;
};
const onDateConfirm = () => {
  showDateSelect.value = false;
  fetch();
};
</script>

<template>
  <div class="px-4">
    <div class="flex mb-4">
      <div class="flex-grow">
        <a-button
          type="text"
          class="text-primary text-base bg-slate-100"
          style="border-radius: 24px"
          @click="showAccountSelect = true"
        >
          <span>全部账单</span><caret-down-outlined class="ml-1" />
        </a-button>
      </div>
      <a-button type="text" class="text-primary text-base" @click="showDateSelect = true">
        <span>选择时间</span><down-outlined class="ml-1" />
      </a-button>
    </div>
    <div>
      <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
        <a-list :dataSource="dataSource" :loading="loading">
          <template #renderItem="{ item }">
            <a-list-item class="rounded px-2 mb-2">
              <template #actions>
                <span :class="[item.direction ? ' text-danger' : 'text-primary']"
                  >{{ item.direction ? "-" : "+" }}{{ item.operateAmount }}
                  {{ item.currency }}</span
                >
              </template>
              <a-list-item-meta>
                <template #title> {{ getText(item.type) }} </template>
                <template #description>{{ item.createTime }} </template>
                <template #avatar>
                  <SvgIcon :name="`coin-${item.currency}`" class="w-10 h-10" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </van-pull-refresh>
    </div>
  </div>
  <van-popup v-model:show="showAccountSelect" position="bottom" round>
    <div class="p-4">
      <h3>选择筛选项</h3>
      <div>
        <RadioSelect
          :options="options"
          title="類型"
          v-model:value="filterOptions.direction"
        />
        <RadioSelect
          :options="flowType"
          title="流水類型"
          v-model:value="filterOptions.type"
        />
      </div>
      <div class="flex justify-center gap-x-4 my-8">
        <a-button size="large" @click="showAccountSelect = false">取消</a-button>
        <a-button type="primary" size="large" @click="onConfirm">確定</a-button>
      </div>
    </div>
  </van-popup>
  <van-popup v-model:show="showDateSelect" position="bottom" round>
    <DateForm v-model:value="filterOptions.createTime" @confirm="onDateConfirm" />
  </van-popup>
</template>

<style scoped lang="less"></style>
