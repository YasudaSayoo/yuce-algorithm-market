import { createApp, h } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { NConfigProvider } from 'naive-ui'

const app = createApp({
  render: () => h(NConfigProvider, null, { default: () => h(App) })
})

app
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    // Use contextBridge
    // window.ipcRenderer.on('main-process-message', (_event, message) => {
    //   console.log(message)
    // })
  })
