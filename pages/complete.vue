<template lang="pug">
div
  .w-80.center.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{ title }}
  .w-100.canny-light
    main.pa4
      .w-80-l.w-100.center(v-if="loading")
        p Processing your order...
      .w-80-l.w-100.center(v-if="!loading")
        p Your order is now confirmed. Please see details below.
        OrderInfo.totalalign(v-if="getOrder", :order="getOrder")
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("shop", ["getCart", "getOrder"]),
  },
  data() {
    return { loading: true, title: "Processing..." };
  },
  async mounted() {
    if (this.$route.query.hasOwnProperty("redirect_status")) {
      let cookie = this.getCookie("cart");
      console.log(cookie)
      await this.$store.dispatch("shop/completeCart", cookie)
      await this.$store.dispatch("shop/getOrderByCartID", cookie);
      this.title = "Order number #" + this.getOrder.display_id;
      this.registerCookie("cart=");
      await this.$store.dispatch("shop/getSession");

      this.freshCart();

      this.loading = false;
    } else {
      this.$router.push("/account");
    }
  },
};
</script>