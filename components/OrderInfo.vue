<template lang="pug">
div
  h1.canny-logo-serif Your order
  .flex(v-if="order.shipping_address.address_1")
    p.fw9 Deliver to:
    p.pl2 
      span {{ order.shipping_address.address_1 }}, &nbsp;
      span(v-if="order.shipping_address.address_2") {{ order.shipping_address.address_2 }},&nbsp;
      span {{ order.shipping_address.city }},&nbsp;
      span {{ order.shipping_address.postal_code }}
  .flex(v-if="order.shipping_methods.length > 0")
    p.fw9 Shipping method:
    p.pl2 
      span {{ order.shipping_methods[0].shipping_option.name }}
  Order(:order="order", :cart="false", :image="false")
</template>


<script>
export default {
  props: ["order"],
  // computed: {
  //   getCard() {
  //     if (document.getElementById("Field-numberInput")) return document.getElementById("Field-numberInput").value;
  //   },
  // },
};
</script>