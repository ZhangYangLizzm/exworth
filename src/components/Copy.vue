<template>
  <a
    class="copy"
    @click="onClick"
  >
    <slot name="text"></slot>
    <slot>
      <CopyOutlined class="icon" />
    </slot>
  </a>
</template>

<script setup>

import copy from 'ant-design-vue/lib/_util/copy-to-clipboard'
import { message } from 'ant-design-vue'
const { t } = useI18n()
const props = defineProps({
  text: {
    type: String,
    required: true,
    default: ''
  }
})
const onClick = () => {
  copy(props.text) && message.success(t('copy.success'))
}
</script>

<style lang="less" scoped>
.copy {
  font-weight: 500;
  word-break: break-all;
}
.icon {
  margin-left: 12px;
}
</style>