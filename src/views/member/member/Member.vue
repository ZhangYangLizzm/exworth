<script setup>
import { useList } from '@/libs/hooks/useList'
import { useMember } from '@/stores/modules/member'
import { loadMember } from '@/api/member'

const { t } = useI18n()
const router = useRouter()
const filterOptions = reactive({
  name: undefined,
})

const { list, fetch, loading, pageID, totalCount, onPageChange } = useList(loadMember, filterOptions)


const columns = computed(() => [
  {
    title: t('rNuiRMYhJmBtD-Nz0KEkt'),
    key: 'fullName',
    dataIndex: 'fullName'
  },
  {
    title: 'PROUID',
    key: 'uuid',
    dataIndex: 'uuid'
  },
  {
    title: [t('OnPSpwMATKuG2io4jQP3a'), t('S2OrYOKW-4S0okv_ixAu-'), t('_iMQNMQatEhTi4yWkEjxs')].join(' / '),
    key: 'functions',
    align: 'right'
  }
])

onMounted(() => {
  fetch()
})
</script>
<template>
  <div class="p-4">
    <div class="flex jusitfy-between">
      <div class="grow">
        <a-input
          size="large"
          :placeholder="$t('rNuiRMYhJmBtD-Nz0KEkt')"
          class="max-w-[220px] mr-2"
          v-model:value="filterOptions.name"
          @blur="fetch"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </div>
    </div>

    <div class="my-4">
      <a-table
        :dataSource="list"
        :columns="columns"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'functions'">
            <div class="flex items-center justify-end gap-x-2">
              <credit-card-filled :class="[record?.functions.ppc ? 'text-primary' : 'text-gray-400']" />
              <credit-card-outlined :class="[record?.functions.vvc ? 'text-primary' : 'text-gray-400']" />
              <swap-outlined  :class="[record?.functions.transfer ? 'text-primary' : 'text-gray-400']"  />
              <a-button type="text" @click="router.push({ name: 'MemberProfile', params: { uuid: record.uuid } })">
                <template #icon>
                  <right-outlined />
                </template>
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
      <a-pagination hideOnSinglePage class="g-pagination" size="small" :current="pageID" :total="totalCount" show-less-items @change="onPageChange" />
    </div>
  </div>
</template>