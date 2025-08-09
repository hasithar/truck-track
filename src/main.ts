import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from './router/index';

import 'ant-design-vue/dist/reset.css';
import './styles/style.css'

const app = createApp(App)
const pinia = createPinia()

// plugins
app.use(router)
app.use(pinia)

app.mount('#app')
