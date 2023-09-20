<script setup lang='ts'>
import {getCardPropety} from "@/api/card"
onMounted(()=>{
  getCardPropety()
})
</script>

<template>
CardManage
</template>

<style scoped lang="less">

</style>