<script setup>
const { t } = useI18n()
defineProps({
    title: String,
    balanceAmount: String,
    currency: String
})
</script>

<template>
    <div class="flex w-full">
        <div class="flex-grow">
            {{ title }}
        </div>
        <div class="text-gray-400 ">

            {{ t('S6nuH-d4J2j0ZUct_xepo', { balanceAmount, currency }) }}
        </div>
    </div>
</template>

<style scoped lang="less"></style>