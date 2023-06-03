<template>
  <view class="goods-item">
    <view class="goods-item-left">
      <image :src="goods.goods_small_logo || defaultPic"></image>
    </view>
    <view class="goods-item-right">
      <view class="goods-name">
        {{goods.goods_name}}
      </view>
      <view class="goods-info-box">
        <view class="goods-price">
           ￥{{price}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
    }
  },
  computed: {
    price() {
      return Number(this.goods.goods_price).toFixed(2)
    }
  }
}
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    height: 100px;
    padding: 10rpx;
    border-bottom: 1px solid #efefef;
    .goods-item-left {
      image {
        width: 100px;
        height: 100px;
      }
    }
    .goods-item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 10rpx;
      .goods-name {
        font-size: 13px;
      }
      .goods-info-box {
        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
      }
    }
  }
</style>