<template lang="pug">
div
  .w-80.center.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Your account
  .w-100.canny-light
    Login

    //- h2(@click="addShippingAddress()") ADDRESS!

    //- h1 {{ customer }}
    //- div(@click='logout()') Logout!
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("shop", ["getUser"]),

    // cart() {
    //   return this.$store.getters["shop/getCart"];
    // },

    // customer() {
    //   // if (this.$store.getters["shop/getUser"] === null) {
    //   //   await this.$store.dispatch("shop/");
    //   // }
    //   return this.$store.getters["shop/getUser"];
    // },
  },

  async mounted() {
    // this.cartInit();
   
  },
  // methods: {
  //   async addShippingAddress() {
  //     let data = {
  //       //company
  //       first_name: "Kieran",
  //       last_name: "Cutting",
  //       address_1: "7 Sovereign House",
  //       address_2: "test",
  //       city: "Tynemouth",
  //       country_code: "UK",
  //       postal_code: "NE30 4PR",
  //     };
  //     await this.$store.dispatch("shop/addShippingAddress", data);
  //   },
  // },
};
</script>