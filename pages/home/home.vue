<template>
  <view>
    <view class="search-container">
      <my-search @to-search="toSearch" bgColor="#c00000" radius="25"></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1500" class="swiper-list">
      <swiper-item v-for="(item, index) in swiperList" :key="item.goods_id">
        <view class="swiper-item" @click="swiperClickHandler(item.goods_id)">
          <image :src="item.image_src" mode="scaleToFill"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item.name)">
        <image :src="item.image_src" mode="scaleToFill"></image>
      </view>
    </view>
    <view class="floor-list">
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <view class="floor-title">
          <image :src="item.floor_title.image_src" mode="heightFix"></image>
        </view>
        <view class="product-list">
          <navigator class="left-image-box" :url="item.product_list[0].navigator_url">
            <image :src="item.product_list[0].image_src" mode="widthFix"
              :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
          </navigator>
          <view class="right-image-box">
            <view class="right-image-item" v-for="(product, i2) in item.product_list.slice(1)" :key="i2">
              <navigator :url="product.navigator_url">
                <image :src="product.image_src" mode="widthFix" :style="{width: product.image_width + 'rpx'}"></image>
              </navigator>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import tabbarBadge from '@/mixin/tabbar-badge.js'
  export default {
    mixins: [tabbarBadge],
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    methods: {
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        this.swiperList = res.message
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        this.navList = res.message
      },
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        this.floorList = res.message
        res.message.forEach(message => {
          message.product_list.forEach(product => {
            product.navigator_url = '/subpkg/goods_list/goods_list?' + product.navigator_url.split('?')[1]
          })
        })
      },
      swiperClickHandler(goods_id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      navClickHandler(name) {
        if (name == '分类')
          uni.switchTab({
            url: '/pages/cate/cate'
          })
      },
      toSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    }
  }
</script>

<style lang="scss">
  .search-container {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  
  .swiper-list {
    height: 300rpx;

    .swiper-item {
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 0 15rpx;

    .nav-item {
      width: 128rpx;
      height: 140rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .floor-list {
    .floor-item {
      margin-top: 30rpx;
      padding-left: 10rpx;

      .floor-title {
        height: 60rpx;

        image {
          width: 100%;
          height: 60rpx;
        }
      }

      .product-list {
        display: flex;

        .right-image-box {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      }
    }


  }
</style>