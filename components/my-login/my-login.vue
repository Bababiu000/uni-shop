<template>
  <view class="login-container">
    <uni-icons type="contact-filled" size="80" color="#707070"></uni-icons>
    <button color="#c00000" class="login-btn" @click="getUserInfo">一键登录</button>
    <text>登录尽享更多权益</text>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      getUserInfo() {
        uni.getUserInfo({
         success: (res) => {
           this.updateUserInfo(res.userInfo)
         },
         fail: () => {
           uni.showToast({
             title: '登录失败'
           })
         }
        })
      },
      login(msg) {
        uni.login({
          success: async (res) => {
            const query = {
              code: res.code,
              encryptedData: msg.encryptedData,
              iv: msg.iv,
              rawData: msg.rawData,
              signature: msg.signature
            }
            const data = await uni.$http.post('/api/public/v1/users/wxlogin', query).catch(err => err)
            const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
            this.updateToken(token)
            this.navigateBack()
          }
        })
      },
      navigateBack() {
        if(this.redirectInfo && this.redirectInfo.openType == 'switchTab')
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
      }
    },
    computed: {
      ...mapState('m_cart', ['userInfo']),
      ...mapState('m_user', ['redirectInfo'])
    }
  }
</script>

<style lang="scss">
.login-container {
  position: relative;
  overflow: hidden;
  height: 750rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    height: 40px;
    transform: translateY(50%);
    border-radius: 100%;
    background-color: #fff;
  }
  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
  .login-btn {
    width: 90%;
    height: 35px;
    margin: 12px 0;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
    background-color: #c00000;
    color: #fff;
    border-radius: 18px;
  }
  text {
    font-size: 14px;
  }
}
</style>