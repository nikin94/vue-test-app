import { createApp } from 'vue'
import App from '@/App'
import components from '@/components/UI'
import router from '@/router/router'
import directives from '@/directives'
import store from '@/store'

const app = createApp(App)

components.forEach(c => {
  app.component(c.name, c)
})

directives.forEach(directive => {
  app.directive(directive.name, directive)
})

app.use(router).use(store).mount('#app')
