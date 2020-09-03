import Vue from 'vue';
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Icon,
  Input,
  message,
  Radio,
} from 'ant-design-vue';

Vue.use(Button);
Vue.use(ConfigProvider);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Radio);

Vue.prototype.$message = message;
