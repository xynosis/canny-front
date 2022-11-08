import Medusa from "@medusajs/medusa-js"
// import axios from 'axios'

const baseUrl = "https://api.fractalsdesign.uk/";
// const baseUrl = "https://bomjardim.herokuapp.com/";

const api = new Medusa({ baseUrl: baseUrl })





export default {
  /*
  PRODUCTS
  */
  async getAllProducts() {
    return await api.products.list()
    //tags: ['tag1', 'tag2']
    //can query by type, title, tags, collection_idi, id query

  },

  //untested and probably unnecessary
  // async getProduct(prod_id) {
  //   return await api.products.retrieve(prod_id)
  // },


  /*
  PRODUCT VARIANTS
  */
  //untested and unnecessary
  // async getAllProductVariants() {
  //   return await api.products.variants.list()
  //   //can add query by ids, expand, offset, limit
  // },
  //untested but unnecessary i think
  // async getProduct(variant_id) {
  //   return await api.products.variants.retrieve(variant_id)
  // },

  /*
  COLLECTIONS
  */

  //untested - but unnecessary i think
  async getAllCollections() {
    return await api.collections.list()
  },
  //untested
  //   async getCollectionByID(collection_id) {
  //     return await api.collections.retrieve(collection_id)
  //   },

  /*
  CUSTOMER
  */
  //untested
  async getCustomer() {
    return await api.customers.retrieve()
  },
  //untested
  async updateCustomer(updateData) {

    return await api.customers.update(updateData)
  },
  //untested
  async getCustomerOrders() {
    return await api.customers.listOrders()
    //can add params of limit, offset, fields, expand
  },

  //untested
  async getSavedPayment() {
    return await api.customers.paymentMethods.list()
    //can add cart id 
  },

  //untested
  async addShippingAddress(address) {
    console.log(address)
    return await api.customers.addresses.addAddress({ address })

    //     id
    // customer_id
    // company
    // first_name
    // last_name
    // address_1
    // address_2
    // city
    // country_code
    // country
  },
  //untested
  async deleteShippingAddress(address_id) {
    return await api.customers.addresses.deleteAddress(address_id)

  },
  //untested
  async updateShippingAddress(address_id, address) {

    return await api.customers.addresses.updateAddress(address_id, address)
  },

  /*
  CUSTOMER AUTH
  */
  async createCustomer(email, first_name, last_name, password, phone) {
    return await api.customers.create({ email, first_name, last_name, password, phone })

  },
  async login(email, password) {
    return await api.auth.authenticate({ email, password })

  },
  //untested - may need to be a custom flow
  async logout() {
    //delete /store/auth
    // let url = baseUrl + "/store/auth"
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // };

    // axios.delete(url, data, config).then(

    // )
    // return await
  },
  async checkEmail(email) {
    return await api.auth.exists(email)

  },

  async getSession() {
    return await api.auth.getSession()

  },
  //tested, should workl  but waiting on event bus subscription stuff
  async getPasswordResetToken(email) {
    return await api.customers.generatePasswordToken({ email })
  },
  //untested
  // async resetPassword(email, token, password) {
  //   return await api.customers.resetPassword({ email, token, password })
  // },


  /*
  CART
  */
  async createCart() {
    let cart = await api.carts.create({ "region_id": "reg_01GGPXYM6VFXQEGZZ6P2BVQ6FS", })
    return cart.cart;
  },
  async retrieveCart(cart_id) {
    let cart = await api.carts.retrieve(cart_id)
    return cart.cart;
  },
  async addItemToCart(cart_id, variant_id, quantity) {
    return await api.carts.lineItems.create(cart_id, { variant_id, quantity })
  },
  async removeItemFromCart(cart_id, line_id) {
    return await api.carts.lineItems.delete(cart_id, line_id)
  },
  async updateItemQuantity(cart_id, update) {
    let quantity = update.quantity
    return await api.carts.lineItems.update(cart_id, update.itemId, { quantity })
  },


  async updateCart(cart_id, updateData) {
    return await api.carts.update(cart_id, updateData)
  },

  //untested - for fulfilment providers
  // async addShippingMethod(cart_id, option_id, data) {

  //   //data may not be present??
  //   return await api.carts.addShippingMethod(cart_id, { option_id })
  // },

  async removeDiscount(cart_id, discount_code) {
    console.log(discount_code)
    return await api.carts.deleteDiscount(cart_id, discount_code)
  },

  //untested
  // async calculateTax(cart_id) {
  //   return await api.carts.calculateTax(cart_id)
  // },

  async completeCart(cart_id) {
    return await api.carts.complete(cart_id)
  },

  //need to do this after there's stuff in the cart
  async initializePaymentSession(cart_id) {
    console.log(cart_id)
    return await api.carts.createPaymentSessions(cart_id)
  },
  //untested
  async deletePaymentSession(cart_id, provider_id) {
    return await api.carts.deletePaymentSession(cart_id, provider_id)
  },
  //untested
  // async updatePaymentSession(cart_id, provider_id, data) {
  //   //idk what data will be
  //   return await api.carts.updatePaymentSession(cart_id, provider_id, data)
  // },
  // //untested
  // async refreshPaymentSession(cart_id, provider_id) {

  //   return await api.carts.refreshPaymentSession(cart_id, provider_id)
  // },
  async setPaymentSession(cart_id, provider_id) {

    return await api.carts.setPaymentSession(cart_id, { provider_id })
  },


  /*
  ORDER
  */
  //untested

  async getOrderByCartID(cart_id) {
    return await api.orders.retrieveByCartId(cart_id)
  },
  //untested

  async getOrderByID(order_id) {

    return await api.orders.retrieve(order_id)
  },
  //untested

  async lookupOrder(display_id, email) {
    return await api.orders.lookupOrder({ display_id, email })
  },

  /*
  REGION
  */
  async getRegions() {
    return await api.regions.list()
  },
  //untested but probably pointless
  async getOneRegion(region_id) {
    return await api.regions.retrieve(region_id)
  },

  /*
  SHIPPING OPTIONS
  */
  //useless unless you need an id
  async getShippingOptions() {
    return await api.shippingOptions.list()
  },
  async getShippingOptionsForCart(cart_id) {
    return await api.shippingOptions.listCartOptions(cart_id)
  },

}
