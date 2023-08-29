<script setup>
const props = defineProps({
  options: Array,
  value: String,
  title: String,
});

const emits = defineEmits(["update:value"]);

const onClick = (value) => {
  emits("update:value", value);
};
const getStyle = (option) => {
  if (props.value === option.value) {
    return 'text-white bg-primary'
  }
  return 'bg-slate-100'
}
</script>

<template>
  <div class="my-4">
    <div class="mb-4 text-base text-gray-400">{{ title }}</div>
    <div class="flex flex-wrap mx-[-0.5rem] gap-y-2">
      <div class="basis-1/3 px-2" v-for="option in options">
        <div @click="onClick(option.value)" class="text-center rounded py-3" :class="[getStyle(option)]">
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
