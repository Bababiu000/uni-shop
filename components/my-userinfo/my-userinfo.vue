<template>
  <view class="userinfo-container">
    <view class="top-box">
      <image :src="userInfo.avatarUrl" class="avatar"></image>
      <text class="nickname">{{userInfo.nickName}}</text>
    </view>
    <view class="panel-list">
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>12</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>35</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>20</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>124</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel-title" style="border-bottom: 1px solid #f4f4f4;">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
           <image src="/static/my-icons/icon1.png"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <view class="panel">
        <view class="panel-title">
          <text>收货地址</text>
          <uni-icons type="right" size="15"></uni-icons>
        </view>
        <view class="panel-title">
          <text>联系客服</text>
          <uni-icons type="right" size="15"></uni-icons>
        </view>
        <view class="panel-title" @click="loginOut">
          <text>退出登录</text>
          <uni-icons type="right" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name:"my-userinfo",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
      loginOut() {
        uni.showModal({
          content:'确认退出登录吗？',
          success: (res) => {
          		if (res.confirm) {
          			this.updateUserInfo({}),
                this.updateToken(''),
                this.updateAddress({})
          		}
          	}
        })
      }
    },
    computed: {
      ...mapState('m_user', ['userInfo', 'token'])
    }
  }
</script>

<style lang="scss">
.userinfo-container {
  height: 100%;
  background-color: #f8f8f8;
  .top-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 350rpx;
    background-color: #c00000;
    color: #fff;
    .avatar {
      width: 160rpx;
      height: 160rpx;
      border: 2px solid #fff;
      box-shadow: 0 1px 5px black;
      border-radius: 50%;
      margin-bottom: 10px;
    }
  }
  .panel-list {
    position: relative;
    margin: 0 10px;
    top: -10px;
    background-color: #f8f8f8;
    border-radius: 3px;
    .panel {
      padding: 10rpx;
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 3px;
      .panel-title {
        display: flex;
        justify-content: space-between;
        padding-left: 15rpx;
        height: 85rpx;
        line-height: 85rpx;
      }
      .panel-body {
        display: flex;
        justify-content: space-around;
        .panel-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 8px 0;
          font-size: 12px;
          image {
            width: 35px;
            height: 35px;
          }
        }
      }
    }
  }
}
</style>