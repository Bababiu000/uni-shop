<template>
  <view class="search-box" :style="{'background-color': bgColor}">
    <view class="search-bar" @click="onSearchClick" :style="{'border-radius': radius + 'px'}">
      <uni-icons type="search" size="14" style="margin-right: 5rpx;"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      bgColor: {
        type: String,
        default: '#c00000'
      },
      radius: {
        type: [Number, String],
        default: 35
      }
    },
    emits: ['to-search'],
    methods: {
      onSearchClick() {
        this.$emit('to-search')
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    display: flex;
    height: 120rpx;
    justify-content: center;
    align-items: center;

    .search-bar {
      display: flex;
      width: 90%;
      height: 70rpx;
      justify-content: center;
      align-items: center;
      background-color: #fff;

      .placeholder {
        color: #7b7b7b;
        font-size: 12px
      }
    }
  }
</style>