import Vue from 'vue';
import {
  Button,
  ConfigProvider,
  DatePicker,
  message,
  Radio,
} from 'ant-design-vue';

Vue.use(Button);
Vue.use(ConfigProvider);
Vue.use(DatePicker);
Vue.use(Radio);

Vue.prototype.$message = message;
