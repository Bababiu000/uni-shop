<template>
<view>
  <view class="search-box" >
    <view class="search-bar">
      <input type="text" placeholder="搜索" focus @input="inputHandler">
      <uni-icons type="search" size="16" style="margin-right: 5rpx;" @click="search"></uni-icons>
    </view>
  </view>
  <view class="suggestion-list">
    <view class="suggestion-item" v-for="(item, index) in suggestionList" :key="item.goods_id">
      <text>{{item.goods_name}}</text>
      <uni-icons type="right" size="14" @click="toGoodsDetail(item.goods_id)"></uni-icons>      
    </view>
  </view>
  <view class="history-box" v-if="suggestionList.length == 0">
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons type="trash-filled" size="20" style="margin-right: 5rpx;" @click="cleanHistory"></uni-icons>
    </view>
    <view class="history-list">
      <uni-tag inverted v-for="(item, index) in historyShow" class="history-item" :key="index" :text="item" @click="toGoodsList(item)"></uni-tag>
    </view>
  </view>
</view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      timer: null,
      suggestionList: [],
      historyList: []
    }
  },
  methods: {
    inputHandler(e) {
      this.keyword = e.detail.value.trim()
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if(this.keyword.length != 0)
          this.getSuggestionList() 
        else
          this.suggestionList = []
      }, 500)
    },
    async getSuggestionList() {
       const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.keyword})
       this.suggestionList = res.message
    },
    toGoodsDetail(goods_id) {
      uni.navigateTo({
        url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id 
      })
    },
    search() {
      this.saveHistory()
      this.toGoodsList(this.keyword)
    },
    toGoodsList(keyword) {
      uni.navigateTo({
        url: '/subpkg/goods_list/goods_list?qsearch=' + keyword 
      })
    },
    saveHistory() {
      let tmpSet = new Set(this.historyList)
      tmpSet.delete(this.keyword)
      tmpSet.add(this.keyword)
      this.historyList = Array.from(tmpSet)
      uni.setStorageSync('search-history', JSON.stringify(this.historyList))
    },
    cleanHistory() {
      this.historyList = []
      uni.removeStorageSync('search-history')
    }
  },
  computed: {
    historyShow() {
      return [...this.historyList].reverse()
    }
  },
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync('search-history') || '[]')
  }
}
</script>
<style lang="scss">
  .search-box {
    display: flex;
    height: 120rpx;
    justify-content: center;
    align-items: center;
    background-color: #c00000;

    .search-bar {
      display: flex;
      width: 90%;
      height: 70rpx;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 8rpx;
      
      input {
        flex: 1;
        width: 80%;
        font-size: 12px;
        padding: 0 25rpx;
      }
      .uni-icons {
        display: block;
        width: 70rpx;
        height: 70rpx;
        line-height: 70rpx;
        border-left: 1px solid #e0e0e0;
      }
    }
  }
  .suggestion-list {
    padding: 0 20rpx;
    display: flex;
    flex-direction: column;
    .suggestion-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80rpx;
      font-size: 12px;
     
      border-bottom: 1px solid #efefef;
      text {
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .history-box {
    .history-title {
      display: flex;
      align-items: center;
      height: 80rpx;
      padding: 0 20rpx;
      border-bottom: 1px solid #efefef;
      text {
        flex: 1;
        font-size: 13px;
        color: #7f7f7f;
      }
      .uni-icons {
        width: 80rpx;
        height: 80rpx;
      }
    }
    .history-list {
      display: flex;
      flex-wrap: wrap;
      padding: 25rpx;
      .history-item {
        font-size: 12px;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
      }
    }
  }
  .uni-tag--default--inverted.data-v-1516016e {
    border: 1px solid #eee;
  }
</style>