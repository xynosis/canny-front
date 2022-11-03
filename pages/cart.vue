<template lang="pug">
div
  .w-80.center.h4.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Your cart
  .w-100.canny-light
    .w-70.tc.black.center(v-if="getCart")
      //- .black {{ getCart }}
      //- h1 Cart ID {{ getCart.id }}
      //- div(v-if="getCart.shipping_address")  
        h1 Shipping
        h2 {{ getCart.shipping_address.first_name }} {{ getCart.shipping_address.last_name }}
        h2 {{ getCart.shipping_address.address_1 }}
        h2 {{ getCart.shipping_address.address_2 }}
        h2 {{ getCart.shipping_address.city }}
        h2 {{ getCart.shipping_address.country_code }}
        h2 {{ getCart.shipping_address.province }}
        h2 {{ getCart.shipping_address.postal_code }}
        h2 {{ getCart.shipping_address.phone }}
      //- div(v-if="getCart.billing_address")  
        h1 Billing
        h2 {{ getCart.billing_address.first_name }} {{ getCart.billing_address.last_name }}
        h2 {{ getCart.billing_address.address_1 }}
        h2 {{ getCart.billing_address.address_2 }}
        h2 {{ getCart.billing_address.city }}
        h2 {{ getCart.billing_address.country_code }}
        h2 {{ getCart.billing_address.province }}
        h2 {{ getCart.billing_address.postal_code }}
        h2 {{ getCart.billing_address.phone }}
      //- h1 Tax {{ getCart.tax_total }}
      //- h1 Discount {{ getCart.discount_total }}
      //- h1 Shipping {{ getCart.shipping_total }}
      //- h1 Total {{ getCart.total }}
      //- div(v-for="items of getCart.items", v-if="getCart.items") 
      //-   h1 Item ID {{ items.id }}
      //-   h1 {{ items.title }} {{ items.variant.title }}
      //-   h1 Quantity: {{ items.quantity }}
      //-   h2.f2(@click="removeFromCart(items.id)") REMOVE!
      //-   h2.f2(@click="updateItemQuantity(items.id, 5)") CHANGE QUANTITY!
      //- //-handle error if not enough stock //check stock when adding
      //- h1.f1(@click="addToCart('variant_01GGQ8PFMAR2C99PXS0188465F', 1)") ADD TO CART!
      //- h1.f1(@click="updateCart()") ADD ADDRESS AND DISCOUNT!!
      //- h1.f1(@click="removeDiscount()") REMOVE DISCOUNT!
      //- h1.f1(@click="startPayment()") START PAYMENT!
      //- h1.f1(@click="selectStripe()") STRIPE
      //- //- div {{ shippingOptions }}
      //- #stripe_container.w-50
      h1.f1(@click="completePayment()") PAY
      div(v-if="getOrder") 
        //- h2 {{getOrder.payment_sessions[0].}}
        //- h2 {{getOrder.}}
        //- h2 {{getOrder.}}
        //- h2 {{getOrder.}}
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      card: null,
    };
  },
  computed: {
    ...mapGetters("shop", ["getCart", "getOrder"]),
  },
  async mounted() {
    if (this.$store.getters["shop/getCart"] === null) {
      await this.$store.dispatch("shop/createCart");
    }
    // if (this.getCart === null) {
    //   //TRY TO RETRIEVE CART FIRST
    //   await this.$store.dispatch("shop/createCart");
    // }
    // console.log(this.getCart);
  },
};
</script>