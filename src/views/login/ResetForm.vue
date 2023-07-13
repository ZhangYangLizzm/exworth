<script setup>
import { login } from '@/api/user'
import { message } from 'ant-design-vue'
import { useForm } from '@/libs/hooks/useForm'
import GraphValidateCodeImage from '@/components/GraphValidateCodeImage'
const { t } = useI18n()

const formState = reactive({
  oldPassword: undefined,
  password: undefined,
  confirm: undefined
})
const rules = computed(() => ({
  oldPassword: [
    { required: true, message: t('8dRn48_9RTO6Q2804fgFp') }
  ],
  password: [
    { required: true, message: t('8dRn48_9RTO6Q2804fgFp') }
  ]
}))
const loading = ref(false)

const { validateInfos } = useForm(formState, rules)

const route = useRoute()
console.log(route.query)
const name = route.query.username

</script>
<template>
 <a-form class="mx-auto max-w-[368px]">
  <a-form-item label="賬號">{{ name }}</a-form-item>
    <a-form-item v-bind="validateInfos.oldPassword">
      <a-input-password
        size="large"
        placeholder="初始密碼"
        v-model:value="formState.oldPassword"
      >
      </a-input-password>
    </a-form-item>
    <a-form-item v-bind="validateInfos.password">
      <a-input-password
        size="large"
        placeholder="新密碼"
        v-model:value="formState.password"
      >
      </a-input-password>
    </a-form-item>
    <a-form-item v-bind="validateInfos.confirm">
      <a-input-password
        size="large"
        placeholder="確認密碼"
        v-model:value="formState.confirm"
      >
      </a-input-password>
    </a-form-item>

    <a-form-item>  
      <a-form-item v-bind="validateInfos.confirm" :style="{display: 'inline-block', width: '248px'}">
        <a-input-password
          size="large"
          placeholder="验证码"
          v-model:value="formState.confirm"
        >
        </a-input-password>
      </a-form-item>

      <a-form-item :style="{display: 'inline-block', width: '100px', marginLeft: '20px', verticalAlign: 'middle'}">
        <GraphValidateCodeImage
          open
          ref="graphCode"
        />
      </a-form-item>
    </a-form-item>

    <a-button
      type="primary"
      size="large"
      @click="handleSubmit"
      block
      :loading="loading"
    >
       提交
    </a-button>
 </a-form>
</template>