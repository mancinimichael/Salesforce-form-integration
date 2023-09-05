import App from '@/App.vue'
import '@/styles/base.scss'
import { setBasePath } from '@shoelace-style/shoelace'
import '@shoelace-style/shoelace/dist/themes/light.css'
import { createApp } from 'vue'

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/')

createApp(App).mount('#app')
