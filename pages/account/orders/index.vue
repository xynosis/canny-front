<template lang="pug">
div
  .w-80.center.canny-dark.flex.justify-between
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Your account
    Logout.flex.items-end.pb4.tc(v-if="getUser !== null")
  .w-100.canny-light(v-if="orders")
    main.pa4
      div(v-if="!nothing")
        OrderHistory.center(v-if="orders.orders.length > 0")

      .w-80.center(v-if="nothing")
        .tc
          Nothing
</template>

<script>
import { mapGetters } from "vuex";
import medusaAPI from "../../../api/medusa";

export default {
  async mounted() {
    //do something with cookie to check if loggedin, if not loggedin, this.$router.push('/account')
    //if nothing in orderhistory then show an error and don't render, change v-if

    await this.$store.dispatch("shop/getSession");
    if (!this.getUser) {
      this.$router.push("/account");
    }
    this.orders = await medusaAPI.getCustomerOrders();
    console.log(this.orders.orders);
  },
  data() {
    return {
      orders: null,
    };
  },
  computed: {
    ...mapGetters("shop", ["getUser"]),
    nothing() {
      if (this.orders) {
        if (this.orders.orders.length > 0) {
          return false;
        } else return true;
      }
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("shop/logout");
    },
  },
};
</script>

