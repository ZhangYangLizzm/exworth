<script setup>
import SvgIcon from "@/libs/components/svgIcon";

import { Format } from "@/libs/hooks/useUtil.js";

const props = defineProps({
    loading: Boolean,
    walletAccounts: Array,
});

const emit = defineEmits("click")
const onClick = (e, currency, type) => {
    e.stopPropagation();
    console.log(currency, type)
    emit("click", { currency, type });
}

</script>

<template>
    <div class="flex">
        <a-spin :spinning="props.loading">
            <div class="flex overflow-x-auto gap-x-4">
                <div class="py-2 rounded text-center min-w-[250px] shadow my-2" v-for="asset in props.walletAccounts"
                    :key="asset.currency">
                    <SvgIcon :name="`coin-${asset.currency}`" class="w-10 h-10" />
                    <div class="">{{ asset.currency }}</div>
                    <div class="mt-2 mb-1 text-base font-bold">
                        {{ Format(asset.balanceAmount) }}
                    </div>
                    <div class="flex justify-center gap-x-2">
                        <a-button @click="(e) => { onClick(e, asset.currency, 'topup') }" type="link">
                            {{ $t("p85LUkdtTlZNxvwxEVGX8") }}
                        </a-button>
                        <a-button type="link" @click="(e) => { onClick(e, asset.currency, 'withdraw') }">
                            {{ $t("mtzd-o04L2UDLaN81GSRl") }}
                        </a-button>
                        <a-button type="link" @click="(e) => { onClick(e, asset.currency, 'transfer') }">
                            {{ $t("_iMQNMQatEhTi4yWkEjxs") }}
                        </a-button>
                    </div>
                </div>
            </div>
        </a-spin>
    </div>
</template>

<style scoped lang="less"></style>
