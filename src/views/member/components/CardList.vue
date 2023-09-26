<script setup lang="ts">
import {
  CARD_MODE_PHYSICAL,
  // CARD_MODE_VIRTUAL,
  CARD_STATUS_NORMAL,
  CARD_STATUS_BADGE_MAP,
  useCard,
} from "@/hooks/useCard";
import {
  MEMBER_CARD_LOSS,
  MEMBER_CARD_REPLACE,
  MEMBER_CARD_TOPUP,
} from "@/hooks/useDrawer";
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

const onClick = (
  item: any,
  type:
    | typeof MEMBER_CARD_TOPUP
    | typeof MEMBER_CARD_LOSS
    | typeof MEMBER_CARD_REPLACE
) => {
  emit("click", { item, type });
};

const showAction = ref<Array<boolean>>(
  new Array(props.dataSource.length).fill(false)
);
</script>

<template>
  <a-spin :spinning="loading">
    <template v-for="(item, index) in dataSource">
      <div
        class="rounded-xl mb-4 relative"
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
                style="color: white !important"
              />
            </div>
          </template>
        </Card>
        <div
          class="flex overflow-x-hidden transition-all justify-around"
          v-if="showAction[index]"
        >
          <a-button
            type="text"
            size="large"
            v-if="[CARD_STATUS_NORMAL].includes(item?.cardStatus)"
            @click="onClick(item, MEMBER_CARD_TOPUP)"
          >
            {{ $t("VVQaPte21XgxJXEM9H8gu") }}
          </a-button>
          <a-button
            type="text"
            size="large"
            @click="onClick(item, MEMBER_CARD_REPLACE)"
            v-if="cardMode === CARD_MODE_PHYSICAL"
          >
            {{ $t("gVPkNpXqcOdkRBKMOR_9i") }}
          </a-button>
          <a-button
            type="text"
            size="large"
            @click="onClick(item, MEMBER_CARD_LOSS)"
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
  transform: translate(-10px, -10px);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
}

.card-deactive {
}
</style>
