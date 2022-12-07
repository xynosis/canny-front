<template lang="pug">
div
  .w-80.center.canny-dark.flex.justify-between
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Your account
    Logout.flex.items-end.pb4.tc(v-if="getUser !== null")
  .w-100.canny-light(v-if="getUser")
    main.pa4(v-if="getUser.hasOwnProperty('orders')")
      OrderHistory.center(v-if="getUser.orders.length > 0")
      .w-80.center(
        v-if="getUser.orders.length === 0 || !getUser.hasOwnProperty('orders')"
      )
        .tc
          Nothing
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async mounted() {
    //do something with cookie to check if loggedin, if not loggedin, this.$router.push('/account')
    //if nothing in orderhistory then show an error and don't render, change v-if
    await this.$store.dispatch("shop/getSession");
    if (!this.getUser){
      this.$router.push('/account')
    }
  },
  computed: {
    ...mapGetters("shop", ["getUser"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("shop/logout");
    },
  },
};
</script>

