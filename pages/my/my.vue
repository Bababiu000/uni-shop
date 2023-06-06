<template>
  <view class="my-container">
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  import tabbarBadge from '@/mixin/tabbar-badge.js'
  export default {
    mixins: [tabbarBadge],
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['token'])
    }
  }
</script>

<style lang="scss">

</style>
