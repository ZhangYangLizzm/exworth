<script setup>
import DateForm from "./DateForm.vue";
import RadioSelect from "./RadioSelect.vue";
const showDateSelect = ref(false);
const showAccountSelect = ref(true);
const options = [
  {
    label: "全部",
    value: undefined,
  },
  {
    label: "支出",
    value: 0,
  },
  {
    label: "收入",
    value: 1,
  },
];
</script>

<template>
  <div class="px-4">
    <div class="flex">
      <div class="flex-grow">
        <a-button
          type="text"
          class="text-primary text-base bg-slate-100"
          style="border-radius: 24px"
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
  </div>
  <van-popup v-model:show="showAccountSelect" position="bottom" round>
    <div class="p-4">
      <h3>选择筛选项</h3>
      <div>
        <RadioSelect :options="options" title="類型" />
        <RadioSelect :options="options" title="訂單類型" />
      </div>
      <div class="mt-20 mb-10 flex justify-center gap-x-4">
        <a-button size="large">取消</a-button>
        <a-button type="primary" size="large">確定</a-button>
      </div>
    </div>
  </van-popup>
  <van-popup v-model:show="showDateSelect" position="bottom" round>
    <DateForm />
  </van-popup>
</template>

<style scoped lang="less"></style>
