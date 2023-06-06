<template>
  <view v-if="goodsInfo.goods_name" class="goods-info-container">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="goods-pic-swiper">
      <swiper-item v-for="(pic, index) in goodsInfo.pics" :key="index">
        <view class="swiper-item">
          <image :src="pic.pics_big_url" @click="preview(index)"></image>
        </view>
      </swiper-item>
    </swiper>
    <view class="goods-info-box">
      <view class="goods-price">￥{{price}}</view>
      <view class="goods-info-main">
        <view class="goods-name">
          {{goodsInfo.goods_name}}
        </view>
        <view class="favi">
          <uni-icons type="star" size="15"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">
        快递：免运费
      </view>
    </view>
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" class="goods-nav" />
  </view>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        goodsInfo: {},
        options: [
          {
            icon: 'shop',
            text: '店铺'
        	}, 
          {
        			icon: 'cart',
        			text: '购物车',
        			info: ''
        	},
        ],
        buttonGroup: [
          {
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
        	}
        ]
      }
    },
    methods: {
      ...mapMutations('m_cart', ['addToCart']),
      async getGoodsDeatil(goods_id) {
        const {data : res} = await uni.$http.get('/api/public/v1/goods/detail/', {'goods_id': goods_id})
        this.goodsInfo = res.message
        this.goodsInfo.goods_introduce = this.goodsInfo.goods_introduce
        .replace(/<img /g, '<img style="display: block;"')
        .replace(/webp/g, 'jpg')
      },
      preview(index) {
        uni.previewImage({
          current: index,
        	urls: this.goodsInfo.pics.map(x => x.pics_big_url),
        });
      },
      onClick(e) {
        if(e.content.text == '购物车')
          uni.switchTab({
            url: '/pages/cart/cart'
          })
      },
      buttonClick(e) {
         if(e.content.text == '加入购物车') {
           const goods = {
             goods_id: this.goodsInfo.goods_id,
             goods_name: this.goodsInfo.goods_name,
             goods_price: this.goodsInfo.goods_price,
             goods_small_logo: this.goodsInfo.goods_small_logo,
             goods_count: 1,
             goods_state: true
           }
           this.addToCart(goods)
         }
      }
    },
    computed: {
      price() {
        return Number(this.goodsInfo.goods_price).toFixed(2)
      },
      ...mapGetters('m_cart', ['total'])
    },
    watch: {
      total: {
        immediate: true,
        handler(newVal) {
          const findResult = this.options.find(x => x.text == '购物车')
          findResult.info = newVal
        }
      }
    },
    onLoad(options) {
      console.log(options.goods_id);
      this.getGoodsDeatil(options.goods_id)
    }
  }
</script>

<style lang="scss">
.goods-info-container {
  padding-bottom: 50rpx;
  .goods-pic-swiper {
    height: 750rpx;
    .swiper-item {
      height: 100%;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .goods-info-box {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .goods-price {
      margin: 10px 0;
      font-size: 18px;
      color: #c00000;
    }
    .goods-info-main {
      display: flex;
      justify-content: space-between;
      .goods-name {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 13px;
      }
      .favi {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 120rpx;
        height: 120rpx;
        font-size: 13px;
        color: gray;
      }
    }
    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }
  .goods-nav {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
}
</style>