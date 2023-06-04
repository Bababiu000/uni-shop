<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio :checked="isFullChecked" color="#c00000" @click="fullCheckedChange"/><text>全选</text>
    </label>
    <view class="amount-box">
      合计：<text class="amount">￥{{ checkedAmount }}</text>
    </view>
    <view class="settle-btn">
      结算({{ checkedCount }})
    </view>
  </view>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_cart', ['allGoodsStateChange']),
      fullCheckedChange() {
        this.allGoodsStateChange(!this.isFullChecked)
      }
    },
    computed: {
      ...mapGetters('m_cart', ['total', 'checkedCount', 'checkedAmount']),
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
  padding-left: 10rpx;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  line-height: 50px;
  font-size: 14px;
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