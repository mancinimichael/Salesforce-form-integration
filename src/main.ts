import App from '@/App.vue'
import '@/assets/base.css'
import { setBasePath } from '@shoelace-style/shoelace'
import '@shoelace-style/shoelace/dist/themes/light.css'
import { createApp } from 'vue'
import router from './router'

setBasePath('/node_modules/@shoelace-style/shoelace/cdn')

const app = createApp(App)

app.use(router)

app.mount('#app')
