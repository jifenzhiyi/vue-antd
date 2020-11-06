import Vue from 'vue';
import {
  Avatar,
  Button,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  List,
  message,
  Menu,
  Modal,
  Pagination,
  Popconfirm,
  Radio,
  Select,
  Spin,
  Table,
  Tabs,
  Tooltip,
  Upload,
  Checkbox,
} from 'ant-design-vue';

Vue.use(Avatar);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(ConfigProvider);
Vue.use(DatePicker);
Vue.use(Dropdown);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(List);
Vue.use(Menu);
Vue.use(Pagination);
Vue.use(Popconfirm);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Spin);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(Tooltip);
Vue.use(Upload);

Vue.prototype.$message = message;
Vue.prototype.$modal = Modal;
