import medusaAPI from '../api/medusa'

export const state = () => ({
  cart: null,
})

export const getters = {

  
  getCart: (state)=> {
    return state.cart
  },

}

export const mutations = {

  setCart(state, payload){
    state.cart = payload
  },

  
}

export const actions = {

  async createCart(context){
    const cartData = await medusaAPI.createCart()
    context.commit('setCart', cartData)
  },
  async addItemToCart(context, data){
    const cartData = await medusaAPI.addItemToCart(data.cartId, data.variantId,  data.quantity)
    // console.log(cartData)
    context.commit('setCart', cartData)
    
  },
  async retrieveCart(context, cartId){
    const cartData = await medusaAPI.retrieveCart(cartId)
    context.commit('setCart', cartData)

  },

 
}
