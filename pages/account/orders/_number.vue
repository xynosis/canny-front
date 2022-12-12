<template lang="pug">
div
  .w-80.center.canny-dark.flex.justify-between
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Your orders
    Logout.flex.items-end.pb1(v-if="getUser !== null")
  .w-100.canny-light
    main.pa4(v-if="order")
      .w-80-l.w-100.center
        .pointer(@click="$router.push('/account/orders')")
          Button(tertiary="true", text="< Back")
        h1 Ordered {{ toDate(order.order.created_at) }}
        p.tr Order status: {{ orderStatus(order.order.fulfillment_status) }}
      Order.center.w-80-l.w-100(:order="order.order", v-if="order")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return { order: null };
  },
  async mounted() {
    if (this.getUser === null) await this.$store.dispatch("shop/getSession");
    let id = this.$route.params.number;

    this.order = await this.getAnOrder(id);
  },
  computed: {
    ...mapGetters("shop", ["getUser"]),
  },
  methods: {
    orderStatus(status) {
      if (status === "canceled") {
        return "Cancelled";
      } else if ((status = "shipped")) {
        return "Shipped";
      } else {
        return "Processing";
      }
    },
  },
};
</script>