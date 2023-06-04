<template>
  <view class="cart-container" v-if="cart.length > 0">
    <my-address></my-address>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text>购物车</text>
    </view>
    <uni-swipe-action>
      <block v-for="(goods, index) in cart">
        <uni-swipe-action-item :right-options="options" @click="swiperItemClick($event, goods.goods_id)">
          <my-goods :goods="goods" :key="index">
            <template slot="radio-box">
              <view class="radio-box">
                <radio :checked="goods.goods_state" color="#c00000" @click="radioChange(goods)"></radio>
              </view>
            </template>
            <template slot="num-box">
              <view>
                <uni-number-box @change="numChange($event, goods.goods_id)" :min="1" :value="goods.goods_count"></uni-number-box>
              </view>
            </template>
          </my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png"></image>
    <text>空空如也</text>
  </view>
</template>

<script>
  import tabbarBadge from '@/mixin/tabbar-badge.js'
  import { mapState, mapMutations} from 'vuex'
  export default {
    mixins: [tabbarBadge],
    data() {
      return {
        options:[
          {
            text: '删除',
            style: {
                backgroundColor: '#dd524d'
            },
          }
        ]
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsNum', 'removeGoodsById']),
      radioChange(goods) {
        const newGoods = {
          goods_id: goods.goods_id,
          goods_state: !goods.goods_state
        }
        this.updateGoodsState(newGoods)
      },
      numChange(val, goods_id) {
        const newGoods = {
          goods_id: goods_id,
          goods_count: +val
        }
        this.updateGoodsNum(newGoods)
      },
      swiperItemClick(e, goods_id) {
        if(e.content.text == '删除')
          this.removeGoodsById(goods_id)
      }
    },
    computed: {
      ...mapState('m_cart', ['cart'])
    }
  }
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;
  .cart-title {
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #efefef;
    text {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .radio-box {
    display: flex;
    height: 100%;
    align-items: center;
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  image {
    width: 90px;
    height: 90px;
  }
  text {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>
