<template>
  <view class="address-container">
    <view class="address-choose-box" v-if="JSON.stringify(address) == '{}'">
      <button class="chooseAddressBtn" type="primary" size="mini" @click="chooseAddress">请选择收货地址</button>
    </view>
    <view class="address-info-box" @click="chooseAddress" v-else>
      <view class="row1">
        <view class="row1-left">
          收货人：{{ address.userName }}
        </view>
        <view class="row1-right">
          电话：{{ address.telNumber }}
          <uni-icons type="right" size="14"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <text>收货地址：</text>
        <text>{{ addstr }}</text>
      </view>
    </view>
    <image src="/static/cart_border@2x.png"  alt="" class="address-border">
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress']),
      chooseAddress() {
        uni.chooseAddress({
          success: (res) => {
            this.updateAddress(res)
          },
          complete: () => {
            
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.address-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
  
.address-choose-box {
  display: flex;
  height: 160rpx;
  justify-content: center;
  align-items: center;
}
  
.address-info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25rpx 15rpx;
  font-size: 13px;
  color: #707070;
  .row1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25rpx;
  }
}

.address-border {
  height: 5px;
}
</style>