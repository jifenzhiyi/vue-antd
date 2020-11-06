<template>
  <a-list id="list_table">
    <RecycleScroller
      v-infinite-scroll="handleInfiniteOnLoad"
      key-field="rowKey"
      :style="'height:'+domHeight+'px;'"
      :items="data"
      :item-size="100"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10">
      <a-list-item slot-scope="{ item }">
        <div class="info clearfix">
          <div
            class="one"
            v-for="one in columns"
            :key="one.dataIndex">
            {{ one.title }} : {{ item[one.dataIndex] }}
          </div>
        </div>
      </a-list-item>
    </RecycleScroller>
    <a-spin
      v-if="loading"
      class="demo-loading" />
  </a-list>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { getList } from '@/views/api';

export default {
  name: 'ListTableMobile',
  directives: { infiniteScroll },
  components: {
    RecycleScroller,
  },
  props: ['columns', 'ajaxConfig'],
  data() {
    return {
      data: [],
      loading: false,
      busy: false,
      domHeight: 0,
      page: 1,
      size: 10,
      current: 0,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  mounted() {
    const dom = document.getElementById('list_table');
    this.domHeight = dom.clientHeight;
  },
  methods: {
    async fetchData() {
      this.loading = true;
      const params = {};
      params.page = this.page;
      params.size = this.size;
      const res = await getList(this.ajaxConfig, params);
      this.current = res.data.total;
      const list = res.data.rows.map((one, index) => {
        one.rowKey = this.ajaxConfig.split('/')[2] + index;
        Object.keys(one).forEach((k) => {
          const item = this.columns.find((c) => c.dataIndex === k && c.options && c.options.length > 0);
          if (item) {
            one[k] = item.options.find((result) => result.value === one[k].toString()).text;
          }
        });
        return one;
      });
      if (list.length > 0) {
        this.data = this.data.concat(list);
      }
      this.loading = false;
    },
    handleInfiniteOnLoad() {
      const data = this.data;
      if (data.length >= this.current) {
        this.$message.warning('列表加载完毕');
        this.busy = true;
        this.loading = false;
        return;
      }
      this.page += 1;
      this.fetchData();
    },
  },
};
</script>

<style lang="less" scoped>
#list_table {
  flex: 1;
  height: 100%;
  .info {
    width: 100%;
    padding-top: 5px;
    margin-bottom: 10px;
    border: solid 1px #ccc;
    .one {
      width: 50%;
      float: left;
      padding-left: 10px;
      padding-bottom: 5px;
    }
  }
}
.demo-loading {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
