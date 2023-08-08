<script setup>
import BasicProfile from "./BasicProfile.vue"
import { loadMember } from '@/api/member'
import CardWrap from './card/CardWrap.vue'

const route = useRoute()

const loading = ref(false)

const userModel = reactive({
  fullName: 'mock Hao',
  gender: 'FEMALE',
  uuid: 'RGHHJKUYFBKOLPOI',
  proEmail: 'yumy@exworth.group'
})
const fetch = async () => {
  loading.value = true
  const { statusCode, content } = await loadMember({ uuid: route.params.uuid })
  loading.value = false
  if (statusCode === 200) {
    Object.assign(userModel, content)
  }
}
onMounted(() => {
  fetch()
})
</script>
<template>
  <div class="p-4 mx-auto">
    <BasicProfile
      :profile="userModel"
      class="shadow-md"
    ></BasicProfile>
    <CardWrap
      class="mt-2 shadow-md"
    ></CardWrap>
  </div>
</template>