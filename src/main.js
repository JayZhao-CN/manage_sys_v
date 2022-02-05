import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import * as ElIcons from '@element-plus/icons'

import '@/assets/css/global.css'

const app = createApp(App)
for (const name in ElIcons){
    app.component(name)
}
app.use(ElementPlus, {
        locale: zhCn,
    })
app.use(store)
app.use(router)
app.use(ElementPlus)
app.echarts = echarts
app.mount('#app')
