<script setup lang="ts">
const { renderOptions, value } = defineProps<{
  renderOptions: {
    component: string;
    label: string;
    valueKey: string;
    options?: { label: string; value: string }[];
  }[];
  value: Record<string, any>;
}>();

const emit = defineEmits(["search", "update:value"]);

const wrapFilterOptions = computed({
  get() {
    return value;
  },
  set(newVal) {
    emit("update:value", newVal);
  },
});
</script>

<template>
  <div class="mb-4 border border-gray-200 border-solid p-4 rounded">
    <AForm layout="inline">
      <AFormItem
        v-for="item in renderOptions"
        :label="item.label"
        style="width: 300px"
      >
        <AInput
          @keyup.enter="emit('search')"
          v-if="item.component === 'AInput'"
          v-model:value="wrapFilterOptions[item.valueKey]"
        />

        <ASelect
          @change="emit('search')"
          v-if="item.component === 'ASelect'"
          v-model:value="wrapFilterOptions[item.valueKey]"
          :options="item.options"
        />
      </AFormItem>
      <AFormItem>
        <div class="flex gap-x-2">
          <AButton type="primary" @click="emit('search')">
            {{ $t("kyR8bj8_QGnQ3Bilvcp8U") }}
          </AButton>
          <slot name="extra-button" />
        </div>
      </AFormItem>
    </AForm>
  </div>
</template>

<style scoped lang="less">
:deep(.ant-form-inline) {
  gap: 16px;
  .ant-form-item {
    margin: 0px !important;
  }
}
</style>
