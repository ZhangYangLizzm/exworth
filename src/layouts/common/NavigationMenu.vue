<script setup lang="ts">
import { MenuClickEventHandler } from "ant-design-vue/es/menu/src/interface";

const router = useRouter();
const route = useRoute();
const selectedKeys = computed(() => [
  ...route.matched.map((i) => i.name as string),
]);

const emit = defineEmits(["close"]);

const handleMenuClick: MenuClickEventHandler = ({ key }) => {
  router.push({ name: key as string });
  emit("close");
};
</script>

<template>
  <AMenu :selectedKeys="selectedKeys" @click="handleMenuClick">
    <AMenuItem class="rounded" key="Wallet">
      <template #icon>
        <wallet-outlined />
      </template>
      {{ $t("JMrHbl_ei1CFmRIw8N60f") }}
    </AMenuItem>

    <AMenuItem class="rounded" key="Member">
      <template #icon>
        <user-outlined />
      </template>
      {{ $t("DJA8mXTnjyyt6SpiAbvhO") }}
    </AMenuItem>

    <AMenuItem class="rounded" key="Invitation">
      <template #icon>
        <SvgIcon name="member-invitation" class="w-[14px] h-[14px]"></SvgIcon>
      </template>
      {{ $t("6e9lOmW7RuhrqYotHMpJ8") }}
    </AMenuItem>

    <!-- <AMenuItem class="rounded" key="CardManage">
      <template #icon>
        <CreditCardOutlined />
      </template>
      {{ $t("j2BrhCWY6Id-I-h7GHKcU") }}
    </AMenuItem> -->

    <AMenuItem class="rounded" key="Setting">
      <template #icon>
        <setting-outlined />
      </template>
      {{ $t("tn1dw0_d4hpGoJZiMaCjB") }}
    </AMenuItem>

    <slot></slot>
  </AMenu>
</template>
