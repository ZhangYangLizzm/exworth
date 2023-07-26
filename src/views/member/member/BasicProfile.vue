<script setup>
const { t } = useI18n()

const GENDER_FEMALE = 'FEMALE'
const GENDER_MALE = 'MALE'
const GENDER_TEXT = value => ({
  [GENDER_FEMALE]: t('zsI7AnPGYhNCRUO68Jh4Q'),
  [GENDER_MALE]: t('v_MiN453eZGh3TNJxMF7Z')
}[value])
</script>
<template>
  <div class="px-2">
    <div class="flex justify-between">
      <div class="grow">
        <div class="flex items-stretch mb-4">
          <div class="inline-block w-1 mr-1 bg-gray-300"></div>
          <div class="text-lg leading-none text-primary">{{ $t('fl9JwgO1UOla0ZUK0NjAl') }}</div>
        </div>

        <div class="flex justify-between w-full">
          <div class="">
            <div class="mb-3 item">
              <div class="text-gray-400">{{ $t('rNuiRMYhJmBtD-Nz0KEkt') }}</div>
              <div class="">HAO LI</div>
            </div>
            <div class="mb-3 item">
              <div class="text-gray-400">{{ $t('QF9BSS4QK0GPJ59pPUdTY') }}</div>
              <div class="">男</div>
            </div>
            <div class="mb-3 item">
              <div class="text-gray-400">{{ $t('efzwMiR8OeC0nd98Ke0SG') }}</div>
              <div class="">+86 131****8231</div>
            </div>
            <div class="mb-3 item">
              <div class="text-gray-400">Exworth Pro賬號</div>
              <div class="">姓名</div>
            </div>
          </div>
          <div class="">
            <div class="mb-3 item">
              <div class="text-gray-400">{{ $t('4jHHpKkSXuLoZfWYURCIv') }}</div>
              <div class="">馬耳他</div>
            </div>
            <div class="mb-3 item">
              <div class="text-gray-400">{{ $t('omlg63lk4rZ8WJoXU1TRo') }}</div>
              <div class="">1999-10-05</div>
            </div>
            <div class="mb-3 item">
              <div class="text-gray-400">{{ $t('YC1J1op5Bh0i9lNpolBEJ') }}</div>
              <div class="">E5****09</div>
            </div>
          </div>
          <div class=""></div>
        </div>
      </div>
      <a-button
        type="primary"
        size="large"
      >
        {{ $t('_iMQNMQatEhTi4yWkEjxs') }}
      </a-button>
    </div>
  </div>
</template>