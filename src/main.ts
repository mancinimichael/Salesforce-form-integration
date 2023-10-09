import App from '@/App.vue'
import '@/assets/base.css'
import router from '@/router'
import { setBasePath } from '@shoelace-style/shoelace'
import '@shoelace-style/shoelace/dist/themes/light.css'
import "gridjs/dist/theme/mermaid.css"
import { createApp } from "vue"

setBasePath('/node_modules/@shoelace-style/shoelace/cdn')

const app = createApp(App)

app.use(router)

app.mount('#app')
