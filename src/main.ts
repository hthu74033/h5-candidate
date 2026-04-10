import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vant from 'vant'
import 'vant/lib/index.css'
import router from './router/index'
import App from './App.vue'
import './assets/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(Vant)
app.use(router)
app.mount('#app')
