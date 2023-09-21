<script setup lang="ts">
import NavigationMenu from "@/layouts/common/NavigationMenu.vue";
import { useUserStore } from "@/stores";

const userStore = useUserStore();
const open = ref(false);
</script>

<template>
  <ALayoutHeader class="!bg-white !px-4">
    <div class="flex justify-between">
      <div>
        <Logo width="8rem" dark />
      </div>
      <div>
        <LocaleDropdown />
        <menu-fold-outlined @click="open = true" class="ml-4" />

        <ADrawer
          v-model:open="open"
          width="100%"
          :closable="false"
          @close="open = false"
        >
          <template #title>
            <Logo width="8rem" dark></Logo>
          </template>
          <template #extra>
            <close-outlined @click="open = false" />
          </template>
          <NavigationMenu @close="open=false">
            <AMenuItem class="rounded" key="Login" @click="userStore.logout()">
              <template #icon>
                <logout-outlined />
              </template>
              {{ $t("6b77_1yTm-gggQW0eZnOy") }}
            </AMenuItem>
          </NavigationMenu>
        </ADrawer>
      </div>
    </div>
  </ALayoutHeader>
</template>

