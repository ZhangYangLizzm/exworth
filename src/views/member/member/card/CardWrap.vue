<script setup>
import Card from '@/core/card/components/card'
import {
  CARD_MODE_PHYSICAL,
  CARD_MODE_VIRTUAL,
  CARD_STATUS_NORMAL,
  CARD_STATUS_BINDING,
  CARD_STATUS_TEXT,
  CARD_STATUS_BADGE_MAP,
} from '@/core/card/stores/models/card'
import { loadPhysicalCard } from '@/api/card'
import { useList } from '@/libs/hooks/useList'
import { encryptStr } from '@/libs/hooks/useUtil'

const props = defineProps({
  uuid: String
})
const { list: physicalList, loading, fetch: fetchPhysicalCard } = useList(loadPhysicalCard, { uuid: props.uuid })

onMounted(() => {
  fetchPhysicalCard()
})
</script>
<template>
  <div class="p-4 bg-[#f9f9f9] rounded-sm">
    
    <div class="flex pb-4 overflow-x-auto overflow-y-auto gap-x-2">
      <div
        class="bg-gray-200 basis-[360px] shrink-0 rounded-lg"
        v-for="(item, index) in physicalList"
        :key="index"
      >
        <Card
          :brand="item.cardType"
          :mode="CARD_MODE_PHYSICAL"
          class=""
        >
          <template #footer>
            <div class="flex items-center justify-between">
              <div class="drop-shadow text-[20px]">
                {{ encryptStr(item?.maskCardNo, 4, 4, ' **** **** ') }}
              </div>

              <a-badge
                :status="CARD_STATUS_BADGE_MAP(item?.cardStatus)"
                :text="CARD_STATUS_TEXT(item?.cardStatus)"
              />
            </div>
          </template>
        </Card>
        <div class="flex justify-between p-2">
          <a-button
            type="text"
            v-if="[CARD_STATUS_NORMAL].includes(item?.cardStatus)"
          >
            {{ $t('10QBrQYST8DUjmNhn5e4_') }}
          </a-button>
          <a-button
            type="text"
            v-if="[CARD_STATUS_BINDING].includes(item?.cardStatus)"
          >
            {{ $t('gVPkNpXqcOdkRBKMOR_9i') }}
          </a-button>
          <a-button
            type="text"
          >
            {{ $t('h0EQGD5w6L9xSdGkk4eG0') }}
          </a-button>
          <a-button
            type="text"
          >
            {{ $t('jQc6AAJLq2w_8X55HDOoe') }}
          </a-button>
          <a-button
            type="text"
          >
            {{ $t('mAchytkaFYfJvmezgSc1-') }}
          </a-button>
        </div>
      </div>
      
    </div>
    
  </div>
</template>