<script setup lang="ts">
import { ValidateInfo } from "@ant-design-vue/lib/form/useForm.d.ts";
const props = defineProps<{
  value: string;
  validateInfo: ValidateInfo;
}>();

const emit = defineEmits(["update:value"]);

const authCode = computed({
  get() {
    return props.authCode;
  },
  set(newVal) {
    emit("update:value", newVal);
  },
});
</script>

<template>
  <a-form-item
    :label="$t('SlJFgfv49xSHi9mbjdw4e')"
    required
    v-bind="validateInfo"
  >
    <a-input
      v-model:value="authCode"
      :placeholder="$t('0A89nPyaGbq5-v9reFOzw')"
    />
  </a-form-item>
</template>
