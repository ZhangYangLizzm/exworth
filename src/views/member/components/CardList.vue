<script setup lang="ts">
import Card from "@/components/Card.vue";
import {
  CARD_MODE_PHYSICAL,
  // CARD_MODE_VIRTUAL,
  CARD_STATUS_NORMAL,
  CARD_STATUS_BADGE_MAP,
  useCard,
} from "@/hooks/useCard";

import { encryptStr } from "@/utils/encrypt";

const props = withDefaults(
  defineProps<{
    dataSource: Array<any>;
    loading: boolean;
    cardMode: string;
  }>(),
  {
    dataSource: () => [],
    loading: false,
    cardMode: CARD_MODE_PHYSICAL,
  }
);

const { CARD_STATUS_TEXT } = useCard();
const emit = defineEmits(["click"]);

const onClick = (item: any, type: "recharge" | "replace" | "cardLoss") => {
  emit("click", { item, type, mode: props.cardMode });
};

const showAction = ref<Array<boolean>>(
  new Array(props.dataSource.length).fill(false)
);
</script>

<template>
  <a-spin :spinning="loading">
    <template v-for="(item, index) in dataSource">
      <div
        class="bg-gray-100 rounded-xl flex mb-4 relative"
        @mouseover="showAction[index] = true"
        @mouseleave="showAction[index] = false"
      >
        <Card
          :brand="item.cardType"
          :mode="cardMode"
          class="transition-all"
          :class="[showAction[index] ? 'card-active' : 'card-deactive']"
        >
          <template #footer>
            <div class="flex items-center justify-between">
              <div class="drop-shadow text-base">
                {{ encryptStr(item?.maskCardNo, 4, 4, " **** **** ") }}
              </div>
              <a-badge
                :status="CARD_STATUS_BADGE_MAP[item?.cardStatus]"
                :text="CARD_STATUS_TEXT[item?.cardStatus]"
                style="color:white!important"
              />
            </div>
          </template>
        </Card>
        <div
          class="flex flex-col overflow-x-hidden transition-all"
          v-if="showAction[index]"
          :class="[showAction[index] ? 'w-18' : 'w-0']"
        >
          <a-button
            type="text"
            size="large"
            v-if="[CARD_STATUS_NORMAL].includes(item?.cardStatus)"
            @click="onClick(item, 'recharge')"
            class="text-left"
          >
            {{ $t("VVQaPte21XgxJXEM9H8gu") }}
          </a-button>
          <a-button
            class="text-left"
            type="text"
            size="large"
            @click="onClick(item, 'replace')"
            v-if="cardMode === CARD_MODE_PHYSICAL"
          >
            {{ $t("gVPkNpXqcOdkRBKMOR_9i") }}
          </a-button>
          <a-button
            type="text"
            size="large"
            class="text-left"
            @click="onClick(item, 'cardLoss')"
            v-if="cardMode === CARD_MODE_PHYSICAL"
          >
            {{ $t("h0EQGD5w6L9xSdGkk4eG0") }}
          </a-button>
        </div>
      </div>
    </template>

    <a-empty v-if="!dataSource.length"></a-empty>
  </a-spin>
</template>

<style scoped lang="less">
.card-active {
  width: calc(100% - 4.5rem);
}

.card-deactive {
  width: 100%;
}
</style>
