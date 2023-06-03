<template>
  <view>
   <view class="search-container">
       <my-search @to-search="toSearch" bgColor="#c00000" radius="25"></my-search>
    </view>
    <view class="cate-container" :style="{'height': systemInfo.windowHeight  + 'px'}">
      <scroll-view scroll-y class="left-scroll-view">
        <view :class="['left-scroll-view-item', index==activeIndex ? 'active' : '' ]" v-for="(item, index) in cateList"
          :key="item.cat_id" @click="activeChange(index)">
          {{item.cat_name}}
        </view>
      </scroll-view>
      <scroll-view scroll-y class="right-scroll-view" :scroll-top="scrollTop">
        <view class="cate-lv2-list">
          <view class="cate-lv2-item" v-for="(item2, index2) in cateLevel2" :key="item2.cat_id">
            <view class="cate-lv2-title">
              {{ item2.cat_name }}
            </view>
            <view class="cate-lv3-list">
              <view class="cate-lv3-item" v-for="(item3, index3) in item2.children" :key="item3.cat_id"
                @click="getCoodsList(item3.cat_id)">
                <image :src="item3.cat_icon" mode="scaleToFill"></image>
                <text> {{ item3.cat_name }} </text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import mySearch from "../../uni_modules/components/my-search.vue"
  export default {
    components: {
      mySearch
    },
    data() {
      return {
        activeIndex: 0,
        cateList: [],
        cateLevel2: [],
        systemInfo: {},
        scrollTop: 0
      };
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        this.cateList = res.message
        this.cateLevel2 = this.cateList[0].children
      },
      activeChange(index) {
        this.activeIndex = index
        this.cateLevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop == 0 ? 1 : 0
      },
      getCoodsList(cat_id) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + cat_id
        })
      },
      toSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    },
    onLoad() {
      this.getCateList()
      this.systemInfo = uni.getSystemInfoSync();
    }
  }
</script>

<style lang="scss">
  .search-container {
      position: sticky;
      top: 0;
      z-index: 999;
  }
  
  .cate-container {
    display: flex;
    height: 100vh;
    font-size: 12px;

    .left-scroll-view {
      width: 90px;

      .left-scroll-view-item {
        box-sizing: border-box;
        width: 90px;
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 20rpx;
        background-color: #f7f7f7;
        font-size: 12px;

        &.active {
          position: relative;
          background-color: #fff;

          &::before {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            content: '';
            display: block;
            width: 5rpx;
            height: 50rpx;
            background-color: #c00000;
          }
        }
      }
    }

    .right-scroll-view {
      flex: 1;

      .cate-lv2-list {
        width: 100%;
        display: flex;
        flex-direction: column;

        .cate-lv2-item {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-bottom: 20rpx;

          .cate-lv2-title {
            text-align: center;
            height: 80rpx;
            line-height: 80rpx;
            border-bottom: 1px solid #eee;
            border-top: 1px solid #eee;
          }

          .cate-lv3-list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .cate-lv3-item {
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 200rpx;
              width: 33.33%;
              padding: 15rpx;

              image {
                height: 160rpx;
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
</style>