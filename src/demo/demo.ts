
import { createApp } from 'vue'

import Demo from './Demo.vue'
import { Icon } from '../lib.js'
import './icons'


let app = createApp(Demo)
app.component(Icon.name, Icon)
app.mount('#app')
