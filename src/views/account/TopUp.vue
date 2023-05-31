<script setup>
import Copy from '@/libs/components/copy'
import { useAccountStore } from '@/stores/modules/accounts.js'
import { loadWalletAddress } from '@/api/account.js'

const accountStore = useAccountStore()

const chainOptions = computed(() => ['TRC20', 'ERC20'])
const formState = reactive({
  currency: 'USDE',
  chain: 'TRC20',
})

const walletAddress = reactive({})

const loading = ref(false)

const fetchAddress = async () => {
  if (!loading.value) {
    loading.value = true
    const { statusCode, content } = await loadWalletAddress(formState)
    loading.value = false
    if (statusCode === 200) {
      Object.assign(walletAddress, content)
    }
  }
}
</script>
<template>
  <a-form
    layout="vertical"
  >
    <a-form-item>
      <a-select
        v-model:value="formState.currency"
        @change="fetchAddress"
      ></a-select>
    </a-form-item>

    <a-form-item>
      <a-radio-group
        v-model:value="formState.chain"
        @change="fetchAddress"
      >
        <a-radio-button
          v-for="chain in chainOptions"
          :key="chain"
        >
          {{ chain }}
        </a-radio-button>
      </a-radio-group>
    </a-form-item>

    <a-spin :spinning="loading">
      <div class="text-center mx-auto my-5">
        <img :src="walletAddress.codeImgUrl" alt="">
        <br />
        <Copy :text="walletAddress.address"></Copy>
      </div>
    </a-spin>

    <a-alert
      type="success"
      show-icon
      :message="$t('l75199YEqw9hJchJu1YXo')"
    >
      <template #icon>
        <exclamation-circle-outlined />
      </template>
      <template #description>
        <ul class="list-decimal pl-4">
          <li>{{ $t('bccqYtXK6oqkAxhQPSlKt') }}</li>
          <li>{{ $t('U7P1XxNW_ub2B9iCV1uzz') }}</li>
          <li>{{ $t('cq-SHcVuf2g6cPSxUEdXY') }}</li>
          <li>{{ $t('MVtFjbEHcG7-UNyutz-34', { currency: formState.currency }) }}</li>
        </ul>
      </template>
    </a-alert>
  </a-form>
</template>