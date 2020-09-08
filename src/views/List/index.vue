<template>
  <div>
    列表页 {{ ajaxConfig }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListIndex',
  computed: mapState(['ajaxConfig']),
};
</script>
