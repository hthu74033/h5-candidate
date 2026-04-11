import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  Popup,
  DatePicker,
  Picker,
  showToast,
  showConfirmDialog,
  Button,
  Field,
  CellGroup,
  Form,
  Checkbox,
  CheckboxGroup,
  NavBar,
  Step,
  Steps,
  Icon,
  Uploader,
  Area
} from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/popup/style'
import 'vant/es/date-picker/style'
import 'vant/es/picker/style'
import 'vant/es/button/style'
import 'vant/es/field/style'
import 'vant/es/cell-group/style'
import 'vant/es/form/style'
import 'vant/es/checkbox/style'
import 'vant/es/nav-bar/style'
import 'vant/es/step/style'
import 'vant/es/steps/style'
import 'vant/es/icon/style'
import 'vant/es/uploader/style'
import 'vant/es/area/style'
import router from './router/index'
import App from './App.vue'
import './assets/index.css'

const app = createApp(App)
app.use(createPinia())
app.use(Popup)
app.use(DatePicker)
app.use(Picker)
app.use(Button)
app.use(Field)
app.use(CellGroup)
app.use(Form)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(NavBar)
app.use(Step)
app.use(Steps)
app.use(Icon)
app.use(Uploader)
app.use(Area)
app.use(router)
app.mount('#app')
