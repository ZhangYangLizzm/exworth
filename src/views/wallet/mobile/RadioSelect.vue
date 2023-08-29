<script setup>
defineProps({
    options: Array,
    selectOption: Object,
    title: String
})
const emit = defineEmits(["click"])
const onClick = (value) => {
    emit("click", value)
}
</script>

<template>
    <div class="mb-4">
        <div class="my-6 text-base text-gray-400">{{ title }}</div>
        <div class="flex">
            <div v-for="option in options" @click="onClick(option.value)" class="basis-1/3 text-center">
                <span class="bg-slate-100 rounded py-3 px-8">{{ option.label }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less"></style>