<template lang="pug">
.black-80.w-80-l.w-100
  table.center
    thead
      tr.canny-dark.white.f3
        th.pa3 Order number
        th.pa3 Date
        th.pa3 Price
    tbody.f3
      //- reverse order
      tr(v-for="items of orders") 
        th.pa3
          p 
            a.dim.font-canny-dark(
              :href="'/account/orders/' + items.display_id"
            ) # {{ items.display_id }}
        th.pa3 {{ toDate(items.created_at) }}
        th.pa3 {{ toCurrency(items.total) }}
        //- th(v-for="stuff of items.items") 
        //-   .ph5 {{stuff.thumbnail}}
        //-   .ph5 {{stuff.title}}
        //-   .ph5 {{stuff.quantity}}
        //-   .ph5 {{stuff.unit_price}}
        //- th {{items.items}}
</template>

<script>
import { mapGetters } from "vuex";
import medusaAPI from "../api/medusa";

export default {
  data() {
    return {
      email: "",
      password: "",
      first: "",
      last: "",
      signup: false,
      passwordFieldType1: "password",
      passwordFieldType2: "password",
      passwordValidator: "",
      passwordError: false,
      signedUp: false,
      loggedIn: false,
      orders: null,
    };
  },
  async mounted() {
    let orders = await medusaAPI.getCustomerOrders();
    this.orders = orders.orders;
  },
  computed: {
    ...mapGetters("shop", ["getUser"]),
  },
  methods: {
    total(order) {
      let price = 0;
      for (let items of order) {
        price = price + items.unit_price;
      }
      return price;
    },
    userOrders() {
      let orders = [...this.getUser.orders];
      return orders.reverse();
    },
  },
};
</script>

<style scoped lang='scss'>
svg {
  margin-left: -50px;
  cursor: pointer;
}

table {
  /* table-layout: auto; */
  width: 100%;
  border-spacing: 0;
}

th {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: $dark;
}
</style>