import App from './App'
import store from './store/store.js'

import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
$http.beforeRequest = options => {
  uni.showLoading({
    title: "数据加载中...."
  })
}
$http.afterRequest = res => {
  uni.hideLoading()
  if (res.data.meta.status != 200) {
    uni.showToast({
      title: "数据加载失败！"
    })
  }
  return res
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) {}

const app = new Vue({
  store,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif