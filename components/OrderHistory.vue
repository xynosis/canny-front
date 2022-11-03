<template lang="pug">
.pa4.black-80
  table.measure.center
    thead.f2
      tr 
        th.ph5 Order number
        th.ph5 Date
        th.ph5 Price
    tbody.f3
      //- reverse order
      tr(v-for="items of userOrders()") 
        th 
          a.pointer(:href='"/account/orders/" + items.display_id') # {{ items.display_id }}
        th {{ toDate(items.created_at) }}
        th {{ toCurrency(total(items.items)) }}
        //- th(v-for="stuff of items.items") 
        //-   .ph5 {{stuff.thumbnail}}
        //-   .ph5 {{stuff.title}}
        //-   .ph5 {{stuff.quantity}}
        //-   .ph5 {{stuff.unit_price}}
        //- th {{items.items}}
</template>

<script>
import { mapGetters } from "vuex";

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
    };
  },
  mounted() {},
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

<style scoped>
svg {
  margin-left: -50px;
  cursor: pointer;
}
</style>