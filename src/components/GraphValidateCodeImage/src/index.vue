<template>
  <ATooltip placement="top" title="点击刷新">
    <img
      @click="refreshCode"
      class="graphValidateCodeImage"
      :src="graphValidateCode"
      alt="图形验证码"
      :style="{ width }"
    >
  </ATooltip>
</template>

<script setup>
import { authCode } from '@/api/user'
import defaultGraphCode from '@/assets/captcha.png'
import { watch } from 'vue'
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: () => {
      return '100px'
    }
  }
})

let graphValidateCode = ref(defaultGraphCode)

const refreshCode = async() => {
  if(props.open) {
    const { statusCode, content } = await authCode({'_t': Date.now()})
    if(statusCode === 200) {
      graphValidateCode.value = `data:image/png;base64,${content.strImg.replace(/[\n]/ig, '')}`
    } else {
      graphValidateCode.value = defaultGraphCode
    }
    console.log(graphValidateCode)
  }
}

onMounted(() => {
  watch(() => props.open,()=>{
  if(props.open) {
    refreshCode()
  }
  },{ immediate:true })
})

</script>

<style lang="less" scoped>
  .graphValidateCodeImage {
    cursor: pointer;
  }
</style>
