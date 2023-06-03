<template>
  <view class="goods-list">
    <navigator v-for="(goods, index) in goodsList" :key="index" :url="'/subpkg/goods_detail/goods_detail?=' + goods.id">
      <my-goods :goods="goods" :key="goods.goods_id"></my-goods>
    </navigator>
  </view>
</template>

<script>
  import myGoods from '@/uni_modules/components/my-goods.vue'
  export default {
    components: {
      'my-goods': myGoods
    },
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10,
          total: 0
        },
        goodsList: [],
        isLoading: false
      }
    },
    methods: {
      async getGoodsList() {
        if(this.isLoading) return
        this.isLoading = true
        const {data : res} = await uni.$http.get('/api/public/v1/goods/search', {'queryObj': this.queryObj})
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        this.isLoading = false
      }
    },
    onLoad(options) {
      this.queryObj.query = options.query
      this.queryObj.cid = options.cid || 1
      this.getGoodsList()
    },
    onReachBottom() {
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
        uni.showToast({
          title: '数据加载完毕！'
        })
         return
      }
      if(this.isLoading) return
      this.queryObj.pagenum++
      this.getGoodsList()
    },
    async onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.goodsList = []
      this.isLoading = false
      await this.getGoodsList()
      uni.stopPullDownRefresh()
    }
  }
</script>

<style lang="scss">
</style>