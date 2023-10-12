<script setup lang="ts">
/*
  converter 数据转换，通常用于枚举值转换为文本值
  textClass 可以传入字符串直接应用样式，也可以传入函数，通过value值返回class
  通常来说converter和textClass函数会同时出现
  其余样式通过透传即可
*/
defineProps<{
  value: string|number;
  converter?: (value: any) => string;
  textClass?: Function | string;
}>();
</script>

<template>
  <span :class="typeof textClass === 'function' ? textClass(value) : textClass">
    {{ value ? (converter ? converter(value) : value) : " - - " }}
  </span>
</template>
