import medusa from '../api/medusa'
import medusaAPI from '../api/medusa'

export const state = () => ({
  products: null,
  shipping: null,
  cart: null,
  regions: null,
  user: null,
  order: null
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
  }
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
  }

}

export const actions = {
  async fetchProducts(context) {
    const productsData = await medusaAPI.getAllProducts()
    context.commit('setProducts', productsData.products)
  },

  //---------------

  async createCart(context) {
    const cartData = await medusaAPI.createCart()
    context.commit('setCart', cartData)
  },
  async addItemToCart(context, data) {
    const cartData = await medusaAPI.addItemToCart(data.cartId, data.variantId, data.quantity)
    // console.log(cartData)
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
    context.commit('setCart', cartData.cart)

  },

  async updateCart(context, data) {
    const cartData = await medusaAPI.updateCart(data.cartId, data.update)
    context.commit('setCart', cartData.cart)

  },
  async removeDiscount(context, data) {
    console.log(data)
    const cartData = await medusaAPI.removeDiscount(data.cartId, data.code)
    context.commit('setCart', cartData.cart)

  },

  //-----
  async startPayment(context, data){
    
    const cartData = await medusaAPI.initializePaymentSession(data)
    
    context.commit('setCart', cartData.cart)
  },
  async selectStripe(context, data){
    
    const cartData = await medusaAPI.setPaymentSession(data,'stripe')
      console.log(cartData.cart)
    context.commit('setCart', cartData.cart)
  },
  async completeCart(context, data){
    const orderData = await medusaAPI.completeCart(data.cartId)
    context.commit('setOrder', orderData.data)
  },
  ///------
  //- for fulfilment providers
  // async addShippingMethod(context, data){
  //   const cartData = await medusaAPI.addShippingMethod(data.cartId, data.shippingMethod)
  //   context.commit('setUser', cartData.cart)

  // },
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
    const user = await medusaAPI.checkEmail(data.email)
    if (!user.exists) {
      const userData = await medusaAPI.createCustomer(data.email, data.first_name, data.last_name, data.password, data.phone)
      context.commit('setUser', userData.customer)
    } else {
      //return something about this user already existing, or
      //link this to the loginf low
    }
  },
  async login(context, data) {
    const user = await medusaAPI.checkEmail(data.email)
    if (user.exists) {
      const userData = await medusaAPI.login(data.email, data.password)
      context.commit('setUser', userData.customer)
    } else {
      //do something else, linked to sign up,
      //saying this user doesn't exist
    }
  },
  async getSession(context) {
    const userData = await medusaAPI.getSession()
    context.commit('setUser', userData.customer)
  },
  // async logout(context){
  //   const userData = await medusaAPI.logout()
  //   context.commit('setUser', userData.customer)
  // },
  async resetPassword(context, data) {
    //needs this https://medusajs.com/blog/sendgrid-open-source-ecommerce 
    //in heroku medusa git folder, go to src/subscribers, create new subscriber for sendgrid or a mail service
    // this subscribes the password reset event and then sends an email with the data 
    await medusa.getPasswordResetToken(data.email)
    //i think there's nothing to set as the event should handle the rest - which makes the resetPassword() method in medusa.js redundant for the frontend
    // const userData = await medusa.resetPassword(data.email, token, data.password)
    // console.log(userData)
    // context.commit('setUser', userData.customer)
  }
}
