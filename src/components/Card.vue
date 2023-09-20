<script setup lang="ts">
import { CARD_MODE_PHYSICAL } from "@/hooks/useCard";
import { lowerCase } from "lodash-es";

defineProps({
  cardNo: String,
  mode: {
    type: String,
    default: CARD_MODE_PHYSICAL,
  },
  status: {
    type: String,
  },
  // 卡组织
  brand: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <a-card :class="['card', lowerCase(mode), status]">
    <div class="card-layout min-h-[170px]">
      <div class="card-layout--header flex justify-between items-center">
        <Logo class="logo" />
        <SvgIcon
          class="credit-icon"
          :name="`credit-${brand.toLowerCase()}`"
        ></SvgIcon>
      </div>
      <div class="card-layout--container"></div>
      <div class="card-layout--footer">
        <slot name="footer">
          <div class="card-number">
            {{ cardNo }}
          </div>
        </slot>
      </div>
    </div>
  </a-card>
</template>

<style lang="less" scoped>
.card {
  user-select: none;
  -webkit-user-drag: none;
  border-radius: 15px;

  :deep(.ant-card-body) {
    height: 100%;
    background-repeat: no-repeat;
    background-size: 160px;
    background-position: bottom 20px right 20%;
  }

  &.binding,
  &.frozen,
  &.expired,
  &.loss,
  &.cancelled,
  &.changing,
  &.unusable {
    :deep(.ant-card-body) {
      filter: opacity(0.5);
    }
  }

  &.virtual {
    background: linear-gradient(to bottom right, #101e62 50%, #000f52 50%);

    :deep(.ant-card-body) {
      background-image: url(@/assets/images/card/virtual_usde.png);
    }
  }

  &.physical {
    background: linear-gradient(to bottom right, #232323 50%, #070404 50%);

    :deep(.ant-card-body) {
      background-image: url(@/assets/images/card/physical_usde.png);
    }
  }
}

.logo {
  width: 120px;
}

.credit-icon {
  width: 40px;
  height: 40px;
}

.card-number {
  font-size: 22px;
  font-weight: 400;
  text-shadow: 1px 1px 6px #666;
}

.card-layout {
  color: #fff;
  display: flex;
  flex-direction: column;
}

.card-layout--container {
  flex-grow: 1;
}
</style>
