<script setup>
import { useVModel } from "@vueuse/core";
const props = defineProps({
  value: Array,
});
const emits = defineEmits(["update:value", "confirm"]);

const createTime = useVModel(props, "value", emits);

const onConfirm = () => {
  emits("confirm");
};
</script>

<template>
  <van-picker-group
    :tabs="['开始日期', '结束日期']"
    title="选择日期"
    @confirm="onConfirm"
  >
    <van-date-picker v-model="createTime[0]" />
    <van-date-picker v-model="createTime[1]" />
  </van-picker-group>
</template>
