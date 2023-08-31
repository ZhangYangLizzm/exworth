<script setup>
import { useList } from "@/libs/hooks/useList";
import SvgIcon from "@/libs/components/svgIcon";
import { getBalanceHistory } from "@/api/wallet";
import RadioSelect from "./RadioSelect.vue";
import { useFlowType } from "@/utils/useFlowType.js";
import { formatRangePickerTime } from "@/views/wallet/history/formatRangePickerTime";
import { Format } from "@/libs/hooks/useUtil.js";
import { useIntersectionObserver } from "@vueuse/core";
import { getDirectionStyle } from "@/utils/styles";
const { getFlowTypeLable, flowTypeList } = useFlowType();

// 使用暂时变量保存日期，只有当点击确认按钮才赋予新值并fetch
const tempOptions = reactive({
  direction: undefined,
  type: undefined,
  createTime: new Array(2).fill(new Date().toLocaleDateString().split("/")),
});
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
  const list = flowTypeList.value.map((item) => {
    const [value, label] = item;
    return { value, label };
  });
  return [{ label: "全部", value: undefined }, ...list];
});

const fetchOptions = computed(() => ({
  ...filterOptions,
  createTime:
    formatRangePickerTime(
      filterOptions.createTime?.map((time) => time.join("-"))
    ) || undefined,
}));
const {
  fetch,
  list: dataSource,
  loading,
  pageID,
  fetchMore,
} = useList(getBalanceHistory, fetchOptions, { mode: "list" });

const onConfirm = async () => {
  filterOptions.direction = tempOptions.direction;
  filterOptions.type = tempOptions.type;
  fetch();
  showAccountSelect.value = false;
};

onMounted(() => {
  fetch();
});

const refreshDisabled = ref(false);
const refreshLoading = ref(false);

const onRefresh = async () => {
  pageID.value = 1;
  await fetch();
  refreshLoading.value = false;
};

const onDateConfirm = () => {
  showDateSelect.value = false;
  Object.assign(filterOptions, tempOptions);
  fetch();
};

const onDateCancel = async () => {
  showDateSelect.value = false;
};

const loadObserver = ref();

useIntersectionObserver(loadObserver, () => {
  if (!loading.value) {
    fetchMore();
  }
});

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
      <a-button
        type="text"
        class="text-primary text-base"
        @click="showDateSelect = true"
      >
        <span>选择时间</span><down-outlined class="ml-1" />
      </a-button>
    </div>
    <div>
      <van-pull-refresh
        v-model="refreshLoading"
        @refresh="onRefresh"
        :disabled="refreshDisabled"
      >
        <a-list
          :dataSource="dataSource"
          class="overflow-y-auto"
          @scroll="(e) => (refreshDisabled = e.target.scrollTop > 0 ?? false)"
        >
          <template #renderItem="{ item }">
            <a-list-item class="px-4">
              <template #actions>
                <span :class="[getDirectionStyle(item?.direction)]"
                  >{{ Format(item.operateAmount) }} {{ item.currency }}</span
                >
              </template>
              <a-list-item-meta>
                <template #title> {{ getFlowTypeLable(item.type) }} </template>
                <template #description>{{ item.createTime }} </template>
                <template #avatar>
                  <SvgIcon :name="`coin-${item.currency}`" class="w-10 h-10" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
        <a-spin :spinning="loading" class="h-[24px]"
          ><div ref="loadObserver"></div
        ></a-spin>
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
          v-model:value="tempOptions.direction"
        />
        <RadioSelect
          :options="flowType"
          title="流水類型"
          v-model:value="tempOptions.type"
        />
      </div>
      <div class="flex justify-center gap-x-4 my-8">
        <a-button size="large" @click="showAccountSelect = false"
          >取消</a-button
        >
        <a-button type="primary" size="large" @click="onConfirm">確定</a-button>
      </div>
    </div>
  </van-popup>

  <van-popup v-model:show="showDateSelect" position="bottom" round>
    <van-picker-group
      :tabs="['开始日期', '结束日期']"
      title="选择日期"
      @confirm="onDateConfirm"
      @cancel="onDateCancel"
    >
      <van-date-picker v-model="tempOptions.createTime[0]" />
      <van-date-picker v-model="tempOptions.createTime[1]" />
    </van-picker-group>
  </van-popup>
</template>

<style scoped lang="less"></style>
