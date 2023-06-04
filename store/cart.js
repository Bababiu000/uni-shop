export default {
  namespaced: true,
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),
  mutations: {
    addToCart(state, goods) {
      const findResult = state.cart.find(item => item.goods_id == goods.goods_id)
      if(findResult)
        findResult.goods_count++
      else
        state.cart.push(goods)
      this.commit('m_cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart || []))
    },
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(item => item.goods_id == goods.goods_id)
      if(findResult)
        findResult.goods_state = goods.goods_state
      this.commit('m_cart/saveToStorage')
    },
    updateGoodsNum(state, goods) {
      const findResult = state.cart.find(item => item.goods_id == goods.goods_id)
      if(findResult)
        findResult.goods_count = goods.goods_count
      this.commit('m_cart/saveToStorage')
    },
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter(item => item.goods_id != goods_id)
      this.commit('m_cart/saveToStorage')
    },
    allGoodsStateChange(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('m_cart/saveToStorage')
    }
  },
  getters: {
    total(state) {
      // let count = 0
      // state.cart.forEach(item => count += item.goods_count)
      // return count
      return state.cart.reduce((prev, curr) => prev += curr.goods_count, 0)
    },
    checkedCount(state) {
      return state.cart.filter(x => x.goods_state == true).reduce((prev, curr) => prev += curr.goods_count, 0)
    },
    checkedAmount(state) {
      return state.cart.filter(x => x.goods_state == true)
      .reduce((prev, curr) => prev += curr.goods_count * curr.goods_price, 0)
      .toFixed(2)
    }
  }
}