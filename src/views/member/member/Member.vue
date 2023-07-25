<script setup>
import { useList } from '@/libs/hooks/useList'
import { useMember } from '@/stores/modules/member'
import { loadMember } from '@/api/member'

const { t } = useI18n()

const filterOptions = reactive({
  name: undefined,
})

const { list: _list, fetch, loading, pageID, totalCount, onPageChange } = useList(loadMember, filterOptions)
const list = [
  { id: 1, uid: '40E79390BBCD4E6C', available: ['virtual', 'physical', 'transfer'], name: 'HAO LI' },
  { id: 2, uid: '40E79390BBCD4E6C', available: ['virtual', 'physical'], name: 'HAO LI' },
  { id: 3, uid: '40E79390BBCD4E6C', available: ['transfer'], name: 'HAO LI' },
  { id: 4, uid: '40E79390BBCD4E6C', available: [], name: 'HAO LI' },
]

const columns = computed(() => [
  {
    title: t('rNuiRMYhJmBtD-Nz0KEkt'),
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'PROUID',
    key: 'uid',
    dataIndex: 'uid'
  },
  {
    title: [t('OnPSpwMATKuG2io4jQP3a'), t('S2OrYOKW-4S0okv_ixAu-'), t('_iMQNMQatEhTi4yWkEjxs')].join(' / '),
    key: 'available',
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
          :placeholder="$t('Er9kDy2nZOKg_F7tgzvff')"
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
          <template v-if="column.key === 'available'">
            <div class="flex items-center justify-end gap-x-2">
              <credit-card-filled :class="[record.available.includes('physical') ? 'text-primary' : 'text-gray-400']" />
              <credit-card-outlined :class="[record.available.includes('virtual') ? 'text-primary' : 'text-gray-400']" />
              <swap-outlined  :class="[record.available.includes('transfer') ? 'text-primary' : 'text-gray-400']"  />
              <a-button type="text">
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