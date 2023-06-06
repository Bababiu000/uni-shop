<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio :checked="isFullChecked" color="#c00000" @click="fullCheckedChange"/><text>全选</text>
    </label>
    <view class="amount-box">
      合计：<text class="amount">￥{{ checkedAmount }}</text>
    </view>
    <view class="settle-btn" @click="settle">
      结算({{ checkedCount }})
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        seconds: 3,
        timer: null
      };
    },
    methods: {
      ...mapMutations('m_cart', ['allGoodsStateChange']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      fullCheckedChange() {
        this.allGoodsStateChange(!this.isFullChecked)
      },
      settle() {
        if(!this.token) {
          this.delayNavigate()
        }
        else if(!this.chechkeCount) uni.showToast({ icon: "fail",title: "请选择商品！" })
        else if(!this.addstr) uni.showToast({ icon: "fail", title: "请填写地址！" })
        this.payOrder()
      },
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: `未登录！${n}秒后跳转到登录界面`,
          mask: true,
          duration: 1500
        })
      },
      delayNavigate() {
        this.seconds = 3
        this.timer = setInterval(() => {
          if(this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
               this.updateRedirectInfo({from: '/pages/cart/cart',openType: 'switchTab'}) 
              }
            })
            uni.hideToast()
            return
          }
          this.showTips(this.seconds)
          this.seconds--
        }, 1000)
      },
      async payOrder() {
        const orderInfo = {
          // order_price: this.checkedAmount
          order_price: 0.01,
          consignee_addr: this.addstr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_count }))
        }
        // 创建订单
        const {data : res} = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        if(res.meta.status != 200)  uni.showToast({ icon: 'error',title: '订单创建失败！' })
        const orderNumber = res.message.order_number
        // 预付订单
        const {data : res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {order_number : orderNumber})
        if(res.meta.status != 200)  uni.showToast({ icon: 'error', title: '预支付订单失败！' })
        const payInfo = res2.message.pay
        // 发起支付
        console.log(payInfo);
        uni.requestPayment({
          provider: 'wxpay',
          ...payInfo,
          success: async (res3) => {
            console.log(res3);
            const {data : res4} = await uni.$http.post('/api/public/v1/my/orders/checkOrder', {order_number : orderNumber})
            if(res4.meta.status != 200)  uni.showToast({ icon: 'error', title: '支付失败！' })
            console.log(res4);
          },
          fail: (err) => {
            console.log(err);
            uni.showToast({ icon: 'error', title: '支付失败！' })
          }
        })
      }
    },
    computed: {
      ...mapGetters('m_cart', ['total', 'checkedCount', 'checkedAmount']),
      ...mapState('m_cart', ['cart']),
      ...mapState('m_user', ['token']),
      ...mapGetters('m_user', ['addstr']),
      isFullChecked() {
        return this.total == this.checkedCount
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container {
  display: flex;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  padding-left: 10rpx;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  line-height: 50px;
  font-size: 14px;
  background-color: #fff;
  border-top: 1px solid #efefef;
  .radio {
    text {
      margin-left: 10rpx;
    }
  }
  .amount-box {
    .amount {
      font-weight: bold;
      color: #c00000;
    }
  }
  .settle-btn {
    min-width: 100px;
    height: 50px;
    background-color: #c00000;
    color: #fff;
    text-align: center;
  }
}
</style>