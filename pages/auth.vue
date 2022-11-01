<template lang="pug">
div
  .w-80.center.h4.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Auth
  .w-100.canny-light
    div(@click="createCustomer()") Create!
    h2(@click="login()") Login!
    h2(@click="getSession()") Get session!
    h2(@click="resetPassword()") Reset!
  
    h2(@click="addShippingAddress()") ADDRESS!

    h1 {{ customer }}
    //- div(@click='logout()') Logout!
</template>

<script>
export default {
  computed: {
    // cart() {
    //   return this.$store.getters["shop/getCart"];
    // },

    customer() {
      // if (this.$store.getters["shop/getUser"] === null) {
      //   await this.$store.dispatch("shop/");
      // }
      return this.$store.getters["shop/getUser"];
    },
  },
  async mounted() {
    //do something to retrieve cart based on a cookie???
    if (this.$store.getters["shop/getCart"] === null) {
      await this.$store.dispatch("shop/createCart");
    }
    // this.cart = this.$store.getters["shop/getCart"];
  },
  methods: {
    async createCustomer() {
      console.log("making");
      let data = {
        email: "Testuser@test.com",
        first_name: "Test",
        last_name: "Test",
        password: "tester",
        //  phone: '075137',
      };
      await this.$store.dispatch("shop/createUser", data);
    },
    async login() {
      console.log("login method");
      let data = {
        email: "Testuser@test.com",
        password: "tester",
      };
      await this.$store.dispatch("shop/login", data);
    },
    async getSession() {
      await this.$store.dispatch("shop/getSession");
    },
    async resetPassword() {
      let data = {
        email: "Testuser@test.com",
        password: "test2",
      };
      await this.$store.dispatch("shop/resetPassword", data);
    },
  
    async addShippingAddress() {
      let data = {
       address:{
          //company
          first_name: "Kieran",
          last_name: "Cutting",
          address_1: "7 Sovereign House",
          address_2: "test",
          city: "Tynemouth",
          country_code: "UK",
          postal_code: "NE30 4PR",
       }
      };
      await this.$store.dispatch("shop/addShippingAddress", data);
    },
  },
};
</script>