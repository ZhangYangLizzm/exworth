import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/plugins/i18n'

import bootstrap from '@/plugins/bootstrap'
import permission from '@/router/permission'

import { setupStore } from './stores'
import './style.css'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.config.productionTip = false

setupStore(app)
app.use(router)
app.use(i18n)
app.use(bootstrap)
app.use(permission)
app.mount('#app')
