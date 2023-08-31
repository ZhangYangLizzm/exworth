<template>
  <a-tooltip placement="top" :title="$t('kFh6GIcqxV90k3QFVdol8')">
    <img
      @click="refreshCode"
      class="graphValidateCodeImage"
      :src="graphValidateCode"
      :alt="$t('9iorvdplaN7oMNsf6Ms-J')"
      :style="{ width }"
    >
  </a-tooltip>
</template>

<script setup>
import { authCode } from '@/api/user'
import defaultGraphCode from '@/assets/captcha.png'
const { t } = useI18n()
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

const refreshCode = async () => {
  const { statusCode, content } = await authCode({'_t': Date.now()})
  if(statusCode === 200) {
    graphValidateCode.value = `data:image/png;base64,${content.strImg.replace(/[\n]/ig, '')}`
  } else {
    graphValidateCode.value = defaultGraphCode
  }
}

watch(() => props.open, ()=>{
  if(props.open) {
    refreshCode()
  }
},{ immediate: true })

defineExpose({refreshCode})
</script>

<style lang="less" scoped>
  .graphValidateCodeImage {
    cursor: pointer;
  }
</style>
