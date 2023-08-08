<script setup>

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({})
  }
})
const { t } = useI18n()

const GENDER_FEMALE = 'FEMALE'
const GENDER_MALE = 'MALE'
const GENDER_TEXT = value => ({
  [GENDER_FEMALE]: t('zsI7AnPGYhNCRUO68Jh4Q'),
  [GENDER_MALE]: t('v_MiN453eZGh3TNJxMF7Z')
}[value])
</script>
<template>
  <div class="p-4 bg-[#f9f9f9] rounded">
    <div class="flex items-end justify-between">
      <div class="grow">
        <div class="flex items-stretch mb-4">
          <div class="inline-block w-1 mr-1 bg-gray-300"></div>
          <div class="text-lg leading-none text-primary">{{ $t('fl9JwgO1UOla0ZUK0NjAl') }}</div>
        </div>

        <div class="max-w-[800px] flex justify-between w-full">
          <div class="">
            <div class="mt-3 item">
              <div class="text-gray-400">{{ $t('rNuiRMYhJmBtD-Nz0KEkt') }}</div>
              <div class="">{{ profile.fullName }}</div>
            </div>
            <div class="mt-3 item">
              <div class="text-gray-400">{{ $t('QF9BSS4QK0GPJ59pPUdTY') }}</div>
              <div class="">{{ GENDER_TEXT(profile.gender) }}</div>
            </div>
            <div class="mt-3 item">
              <div class="text-gray-400">{{ $t('efzwMiR8OeC0nd98Ke0SG') }}</div>
              <div class="">+86 131****8231</div>
            </div>
            <div class="mt-3 item">
              <div class="text-gray-400">{{ $t('SreiC9yRSXuJ0EDsT5t0z') }}</div>
              <div class="">{{ profile.proEmail }}</div>
            </div>
          </div>
          <div class="">
            <div class="mt-3 item">
              <div class="text-gray-400">{{ $t('4jHHpKkSXuLoZfWYURCIv') }}</div>
              <div class="">馬耳他</div>
            </div>
            <div class="mt-3 item">
              <div class="text-gray-400">{{ $t('omlg63lk4rZ8WJoXU1TRo') }}</div>
              <div class="">1999-10-05</div>
            </div>
            <div class="mt-3 item">
              <div class="text-gray-400">{{ $t('YC1J1op5Bh0i9lNpolBEJ') }}</div>
              <div class="">E5****09</div>
            </div>
            <div class="mt-3 item">
              <div class="text-gray-400">PROUID</div>
              <div class="">{{ profile.uuid }}</div>
            </div>
          </div>
          <div class=""></div>
        </div>
      </div>
      <a-button
        type="primary"
      >
        {{ $t('_iMQNMQatEhTi4yWkEjxs') }}
      </a-button>
    </div>
  </div>
</template>