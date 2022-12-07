
import medusaAPI from '../api/medusa'

export const state = () => ({
  products: null,
  shipping: null,
  cart: null,
  regions: null,
  user: null,
  order: null,
  categories: null,
  error: null
})

export const getters = {
  getAllProducts: (state) => {
    return state.products
  },

  getCart: (state) => {
    return state.cart
  },
  getRegions: (state) => {
    return state.regions
  },
  getUser: (state) => {
    return state.user
  },
  getShipping: (state) => {
    return state.shipping
  },
  getOrder: (state) => {
    return state.order
  },
  getCategories: (state) => {
    return state.categories
  },
  getError: (state) => {
    return state.error
  },

}

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  },
  setCart(state, payload) {
    state.cart = payload
  },
  setRegions(state, payload) {
    state.regions = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
  setShipping(state, payload) {
    state.shipping = payload
  },
  setOrder(state, payload) {
    state.order = payload
  },
  setCategories(state, payload) {
    state.categories = payload
  },
  setError(state, payload) {
    state.error = payload
  },

}

export const actions = {
  async fetchProducts(context) {
    const productsData = await medusaAPI.getAllProducts()
    context.commit('setProducts', productsData.products)
  },

  async getOrderByCartID(context, cartID) {
    const orderData = await medusaAPI.getOrderByCartID(cartID)
    context.commit('setOrder', orderData.order)
  },
  //---------------

  async createCart(context) {
    const cartData = await medusaAPI.createCart()
    context.commit('setCart', cartData)
  },
  async addItemToCart(context, data) {
    console.log(data)
    const cartData = await medusaAPI.addItemToCart(data.cartId, data.variantId, data.quantity)
    console.log(cartData)
    context.commit('setCart', cartData.cart)

  },
  async updateItemQuantity(context, data) {
    const cartData = await medusaAPI.updateItemQuantity(data.cartId, data.update)
    context.commit('setCart', cartData.cart)
  },
  async removeItemFromCart(context, data) {
    const cartData = await medusaAPI.removeItemFromCart(data.cartId, data.itemId)
    // console.log(cartData)
    context.commit('setCart', cartData.cart)

  },
  async retrieveCart(context, cartId) {
    const cartData = await medusaAPI.retrieveCart(cartId)

    context.commit('setCart', cartData)

  },

  async updateCart(context, data) {
    const cartData = await medusaAPI.updateCart(data.cartId, data.update)
    console.log(cartData)
    console.log('cartyboi')
    context.commit('setCart', cartData.cart)


  },
  async removeDiscount(context, data) {

    const cartData = await medusaAPI.removeDiscount(data.cartId, data.code)
    context.commit('setCart', cartData.cart)

  },

  //-----
  async startPayment(context, data) {

    const cartData = await medusaAPI.initializePaymentSession(data)
    console.log('start payment session')
    console.log(cartData)
    context.commit('setCart', cartData.cart)
  },
  async selectStripe(context, data) {

    const cartData = await medusaAPI.setPaymentSession(data, 'stripe')
    console.log(cartData.cart)
    context.commit('setCart', cartData.cart)
  },
  async completeCart(context, cartID) {
    const cartData = await medusaAPI.completeCart(cartID)
    context.commit('setCart', cartData.data)
  },
  ///------

  async addShippingMethod(context, data) {

    const cartData = await medusaAPI.addShippingMethod(data.cartId, data.shippingMethod)
    console.log('cartData')
    console.log(cartData)
    context.commit('setCart', cartData.cart)

  },
  async getShippingOptionsForCart(context, data) {
    const shippingData = await medusaAPI.getShippingOptionsForCart(data.cartId)
    context.commit('setShipping', shippingData.shipping_options)

  },
  async addShippingAddress(context, data) {
    console.log('i am in the shipping address')
    console.log(data)
    const userData = await medusaAPI.addShippingAddress(data)
    console.log(userData)
    context.commit('setUser', userData.customer)
  },

  async fetchRegions(context) {
    //saving this in case i need - 31/10/22 - could be useful for single, could be useless
    // const regionsData = await medusaAPI.getRegions({"cart_id": state.cart.id})
    const regionsData = await medusaAPI.getRegions()
    context.commit('setRegions', regionsData)
  },
  ///--------

  async createUser(context, data) {

    const userData = await medusaAPI.createCustomer(data.email, data.first_name, data.last_name, data.password, data.phone)
    context.commit('setUser', userData.customer)

  },
  async login(context, data) {

    const userData = await medusaAPI.login(data.email, data.password)
    context.commit('setUser', userData.customer)


  },
  async getSession(context) {
    try {
      const userData = await medusaAPI.getSession()
      context.commit('setUser', userData.customer)
    } catch (e) {
      console.log('wtf')
      console.error(e)
    }

  },
  async fetchAllCategories(context) {
    const categoryData = await medusaAPI.getAllCollections()

    context.commit('setCategories', categoryData.collections.reverse())
  },
  async logout(context) {
    await medusaAPI.logout()
    context.commit('setUser', null)
  },
  async resetPassword(context,data) {
    console.log(data)
    const userData = await medusaAPI.resetPassword(data)
    context.commit('setUser', userData.customer)
  }
}
