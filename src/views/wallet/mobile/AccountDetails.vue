<script setup>
import { useList } from "@/libs/hooks/useList";
import SvgIcon from "@/libs/components/svgIcon";
import { getBalanceHistory } from "@/api/wallet";
import RadioSelect from "./RadioSelect.vue";
import { useFlowType } from "@/utils/useFlowType.js";
import { formatRangerPickerTime } from "@/utils/formatRangerPickerTime";
import { Format } from "@/libs/hooks/useUtil.js";
import { useIntersectionObserver } from "@vueuse/core";
import { getDirectionClass } from "@/utils/styles";
const { FlowTypeLable, FLOW_TYPE_GROUPS } = useFlowType();

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

const fetchOptions = computed(() => ({
  ...filterOptions,
  createTime:
    formatRangerPickerTime(
      filterOptions.createTime?.map((time) => time.join("-"))
    ) || undefined,
}));
const {
  fetch,
  list: dataSource,
  loading,
  fetchMore,
  refresh,
} = useList(getBalanceHistory, fetchOptions, { mode: "list", pageSize: 15 });

const onConfirm = async () => {
  filterOptions.direction = tempOptions.direction;
  filterOptions.type = tempOptions.type;
  await fetch();
  showAccountSelect.value = false;
};

onMounted(() => {
  fetch();
});

const refreshDisabled = ref(false);
const refreshLoading = ref(false);

const onRefresh = async () => {
  await refresh();
  refreshLoading.value = false;
};

const onDateConfirm = async () => {
  showDateSelect.value = false;
  Object.assign(filterOptions, tempOptions);
  await fetch();
};

const onDateCancel = async () => {
  showDateSelect.value = false;
};

const loadObserver = ref();

useIntersectionObserver(loadObserver, ([{ isIntersecting }]) => {
  if (!loading.value && isIntersecting) {
    fetchMore();
  }
});
</script>

<template>
  <div class="px-4 billing-container">
    <div class="flex mb-4">
      <div class="flex-grow">
        <a-button
          type="text"
          class="text-primary text-base bg-slate-100"
          style="border-radius: 24px"
          @click="showAccountSelect = true"
        >
          <span>全部賬單</span><caret-down-outlined class="ml-1" />
        </a-button>
      </div>
      <a-button
        type="text"
        class="text-primary text-base"
        @click="showDateSelect = true"
      >
        <span>選擇日期</span><down-outlined class="ml-1" />
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
          @scroll="(e) => (refreshDisabled = e.target.scrollTop > 0 ?? false)"
        >
          <template #renderItem="{ item }">
            <a-list-item class="px-2">
              <template #actions>
                <span :class="[getDirectionClass(item?.direction)]"
                  >{{ Format(item.operateAmount) }} {{ item.currency }}</span
                >
              </template>
              <a-list-item-meta>
                <template #title> {{ FlowTypeLable(item.type) }} </template>
                <template #description>{{ item.createTime }} </template>
                <template #avatar>
                  <SvgIcon :name="`coin-${item.currency}`" class="w-10 h-10" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>

        <a-spin :spinning="loading">
          <div ref="loadObserver" class="h-8 w-full"></div>
        </a-spin>
      </van-pull-refresh>
    </div>
  </div>

  <van-popup v-model:show="showAccountSelect" position="bottom" round>
    <div class="p-4">
      <h3>{{ $t("QA6w_BBqAnV0znUq8ttml") }}</h3>
      <div>
        <RadioSelect
          :options="options"
          :title="$t('Yph4bjKS0GEWYFbohwlfw')"
          v-model:value="tempOptions.direction"
        />
        <RadioSelect
          :options="FLOW_TYPE_GROUPS"
          :title="$t('10MvsZXdn3EOSKcFB4Fzf')"
          v-model:value="tempOptions.type"
        />
      </div>
      <div class="flex justify-center gap-x-4 my-8">
        <a-button size="large" @click="showAccountSelect = false">{{
          $t("cT1QFWPt_d3RzSaZhjCUO")
        }}</a-button>
        <a-button
          type="primary"
          size="large"
          @click="onConfirm"
          :loading="loading"
          >{{ $t("eDeGcfNGQKiDSBM98US4D") }}</a-button
        >
      </div>
    </div>
  </van-popup>

  <van-popup v-model:show="showDateSelect" position="bottom" round>
    <van-picker-group
      :tabs="['開始日期', '結束日期']"
      title="選擇日期"
      @confirm="onDateConfirm"
      @cancel="onDateCancel"
    >
      <van-date-picker v-model="tempOptions.createTime[0]" />
      <van-date-picker v-model="tempOptions.createTime[1]" />
    </van-picker-group>
  </van-popup>
</template>

<style scoped lang="less">
.billing-container {
  height: calc(100vh - 64px);
}
</style>
