<script setup>
const startDate = ref();
const endDate = ref();
</script>

<template>
  <van-picker-group :tabs="['开始日期', '结束日期']">
    <van-date-picker v-model="startDate" />
    <van-date-picker v-model="endDate" />
  </van-picker-group>
</template>
