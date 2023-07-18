<script setup>
import { firstLogin } from '@/api/user'
import { message } from 'ant-design-vue'
import { useForm } from '@/libs/hooks/useForm'
import GraphValidateCodeImage from '@/components/GraphValidateCodeImage'
const { t } = useI18n()

const formRef = ref();

const formState = reactive({
  oldPassword: undefined,
  password: undefined,
  confirm: undefined,
  code: undefined
})

const props = defineProps({
  name: String,
})

const validateToNextPassword = async (_, value) => {
  if (value && confirmDirty.value) {
    formRef.value?.validateFields(['confirm'], { force: true })
  }
  return Promise.resolve()
}

const compareToOldPassword = async (_, value) => {
  if (value && value === formState.oldPassword) {
    return Promise.reject(t('CUF3MBsbrBOnLprGbtonD'))
  } else {
    return Promise.resolve()
  }
}

const compareToFirstPassword = async (_, value) => {
  console.log(value)
  console.log(formState.password)
  if (value && value !== formState.password) {
    return Promise.reject(t('_i4wrqvdjvlH7txojo-Y6'))
  } else {
    return Promise.resolve()
  }
}

const handleConfirmBlur = async (e) => {
  console.log(e.target.value)
  const value = e.target.value
  confirmDirty.value = confirmDirty.value || !!value
}

const rules = computed(() => ({
  oldPassword: [
    { required: true, message: t('8dRn48_9RTO6Q2804fgFp') }
  ],
  password: [
    { required: true, message: t('8dRn48_9RTO6Q2804fgFp') },
    { min: 8, max: 20, message: t('Zd-iK_4fwRetIFNm8Nd4M') },
    { pattern: /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^./, message: t('WWbPeuj1qLMohnCd5qzyw') },
    { validator: validateToNextPassword },
    { validator: compareToOldPassword }
  ],
  confirm: [
    { required: true, message: t('8dRn48_9RTO6Q2804fgFp') },
    { validator: compareToFirstPassword }
  ],
  code: [
    { required: true, message: t('8dRn48_9RTO6Q2804fgFp') },
    { len: 4, message: t('cWWvrwCrLJY6luPt-0_h8') }
  ]
}))
const loading = ref(false)
const confirmDirty = ref(false)

const { handleValidate, validateInfos } = useForm(formState, rules)

const handleSubmit = async () => {
  const { values } = await handleValidate()
  if (values) {
    loading.value = true
    const { statusCode } = await firstLogin({ ...values, name })
    loading.value = false
    if (statusCode === 200) {
      router.replace({ name: 'Login' })
    }
  }
}

</script>
<template>
 <a-form class="mx-auto max-w-[368px]" :rules="rules" :ref="formRef">
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
        @blur="handleConfirmBlur"
      >
      </a-input-password>
    </a-form-item>

    <a-form-item>  
      <a-form-item v-bind="validateInfos.code" :style="{display: 'inline-block', width: '248px'}">
        <a-input-password
          size="large"
          placeholder="验证码"
          v-model:value="formState.code"
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