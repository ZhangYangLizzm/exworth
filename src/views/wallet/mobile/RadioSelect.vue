<script setup>
import { computed } from "vue";

const props = defineProps({
  options: Array,
  value: String,
  title: String,
});

const emit = defineEmits(["update:value"]);

const selectedValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit("update:value", value);
  },
});

function isSelected(option) {
  return selectedValue.value === option.value
    ? "text-white bg-primary"
    : "bg-slate-100";
}

function onClick(value) {
  selectedValue.value = value;
}
</script>

<template>
  <div class="my-4">
    <div class="mb-2 text-gray-400">{{ title }}</div>

    <div class="flex flex-wrap mx-[-0.5rem] gap-y-2">
      <div
        v-for="option in options"
        :key="option.label"
        :class="[option.options ? 'flex-grow' : 'basis-1/3']"
      >
        <div v-if="option.options" class="mb-2">
          <div class="ml-4 mb-2 text-gray-400">
            {{ option.label }}
          </div>

          <div class="flex flex-wrap gap-y-2">
            <div
              v-for="child in option.options"
              :key="child.label"
              class="text-center rounded basis-1/3 px-2"
              @click="onClick(child.value)"
            >
              <div
                :class="[isSelected(child)]"
                class="text-center rounded py-3"
              >
                {{ child.label }}
              </div>
            </div>
          </div>
        </div>

        <div v-else class="px-2">
          <div
            @click="onClick(option.value)"
            :class="[isSelected(option)]"
            class="text-center rounded py-3"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
