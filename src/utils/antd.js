import Vue from 'vue';
import {
  Button,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  message,
  Menu,
  Modal,
  Radio,
  Select,
} from 'ant-design-vue';

Vue.use(Button);
Vue.use(ConfigProvider);
Vue.use(DatePicker);
Vue.use(Dropdown);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Menu);
Vue.use(Radio);
Vue.use(Select);

Vue.prototype.$message = message;
Vue.prototype.$modal = Modal;
