<script setup>
import { useList } from '@/libs/hooks/useList'
import { loadInvitation, invite } from '@/api/member'
import { MEMBER_INVITATION_STATUS_JOINED, MEMBER_INVITATION_STATUS_INVITED } from '@/stores/models/member'
import { useMember } from '@/stores/modules/member'
import ExModal from '@/libs/components/antd/modal/ExModal.vue'
import { useAppStore } from '@/stores/modules/app'
import { useForm } from '@/libs/hooks/useForm'

const appStore = useAppStore()

const { t } = useI18n()

const { MEMBER_INVITATION_STATUS_TEXT } = useMember()

const statusOptions = computed(() => [
  { label: t('T8jku5XFeq-1ZPcuDe_7B'), value: '' },
].concat([
  { label: MEMBER_INVITATION_STATUS_TEXT(MEMBER_INVITATION_STATUS_JOINED), value: MEMBER_INVITATION_STATUS_JOINED },
  { label: MEMBER_INVITATION_STATUS_TEXT(MEMBER_INVITATION_STATUS_INVITED), value: MEMBER_INVITATION_STATUS_INVITED }
]))

const columns = computed(() => [
  {
    title: t('KrbBTqrNaiFpKSs1Hs3FC'),
    dataIndex: 'email'
  },
  {
    title: t('2azhTayaBBC1zqWCc8lq5'),
    dataIndex: 'status'
  }
])

const filterOptions = reactive({
  email: undefined,
  status: ''
})

const { list, fetch, loading } = useList(loadInvitation, filterOptions)

const modalRef = ref()

const formState = reactive({
  email: []
})

const arrayValidator = async (_, value) => {
  if (value.length === 0) {
    return Promise.reject(t('8dRn48_9RTO6Q2804fgFp'))
  }
  return Promise.resolve()
}
const rules = computed(() => ({
  email: [
    { required: true, message: t('8dRn48_9RTO6Q2804fgFp') }
  ]
}))
const { handleValidate, validateInfos, resetFields } = useForm(formState, rules)

const btnLoading = ref(false)
const handleSubmit = () => {
  // select 失去焦点需要时间
  setTimeout(async () => {
    const { values } = await handleValidate()
    if (values) {
      btnLoading.value = true
      const { statusCode } = await invite(values)
      btnLoading.value = false
    }
  }, 300)
  
}
const handleCancel = () => {
  setTimeout(() => {
    resetFields()
    modalRef.value?.close()
  }, 300)
}

</script>
<template>
  <div class="p-4">
    <div class="flex justify-between">
      <div class="grow">
        <a-input
          size="large"
          :placeholder="$t('kXAMWI86h-rooSEuCAow-')"
          class="max-w-[220px] mr-2"
          v-model:value="filterOptions.email"
          @blur="fetch"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
        <a-radio-group
          v-model:value="filterOptions.status"
          size="large"
          :options="statusOptions"
          optionType="button"
          @change="fetch"
        />
      </div>
      <a-button
        size="large"
        @click="modalRef?.show()"
        type="primary"
      >
        {{ $t('VPTp-QATJSurGdzHeGrXT') }}
      </a-button>
    </div>
    <div class="my-4">
      <a-table
        :dataSource="list"
        :columns="columns"
      ></a-table>
    </div>
    <ExModal
      ref="modalRef"
      isBottom
      :isMobile="appStore.isMobile"
      :customTitle="$t('VPTp-QATJSurGdzHeGrXT')"
      @beforeClose="resetFields"
    >
      <div class="p-4">
        <a-form layout="vertical">
          <a-form-item
            :label="$t('kXAMWI86h-rooSEuCAow-')"
            v-bind="validateInfos.email"
          >
            <a-select
              type="textarea"
              :open="false"
              mode="tags"
              :placeholder="$t('zjBCgU--wKqHomDG3Vakr')"
              size="large"
              :tokenSeparators="[',', ' ', '，']"
              v-model:value="formState.email"
            >
            </a-select>
          </a-form-item>

          <div class="font-bold text-red-500">{{ $t('1NLFL8YdPqQXonj5lQxvT') }}</div>
          <div class="">{{ $t('irfv2QgrQafS_6Zl73s2N') }}</div>
        </a-form>
      </div>
      <template #footer>
        <div class="px-4">
          <div class="flex justify-center py-4 border-t border-b-0 border-gray-200 border-solid border-x-0 gap-x-2">
            <a-button
              @click="handleCancel"
              size="large"
            >
              {{ $t('cT1QFWPt_d3RzSaZhjCUO') }}
            </a-button>
            <a-button
              type="primary"
              @click="handleSubmit"
              size="large"
              :loading="btnLoading"
            >
              {{ $t('VPTp-QATJSurGdzHeGrXT') }}
            </a-button>
          </div>
          
        </div>
      </template>
    </ExModal>
  </div>
</template>
