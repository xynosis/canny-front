<template lang="pug">
div
  .w-80.center.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Your cart
  .w-100.canny-light(v-if="getCart")
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
    main.pa4
      Order.w-100.w-80-l.center(
        :order="getCart",
        :cart="true",
        v-if="getCart.items.length > 0"
      ) 
      //- h1 Tax {{ getCart.tax_total }}
      //- h1 Discount {{ getCart.discount_total }}
      //- h1 Shipping {{ getCart.shipping_total }}

      .black-80.w-80-l.w-100.center.tr(v-if="getCart.items.length > 0")
        //- table.tl.f2.totalalign.pv3
        //-   tbody(v-if='getCart')
        //-     tr
        //-       th Subtotal:
        //-       th.tr {{ toCurrency(getCart.subtotal) }}
        //-     tr(v-if='getCart.shipping_methods.length > 0')
        //-       th Postage:
        //-       th.tr {{ toCurrency(getCart.shipping_methods[0].shipping_option.amount) }}
        //-     tr(v-if='getCart.shipping_methods.length >0')
        //-       th Total: 
        //-       th.tr {{ toCurrency(getCart.total) }}
        
          //- add in can't click checkout if you don't have an account (if not signed in, redirect to sign in, if signed in go ahead)
        .pointer(@click="$router.push('/checkout')" v-if='getUser')
          Button.f3(text="Check out", primary="true")
        .pointer(@click="$router.push('/account')" v-if='!getUser')
          Button.f3(text="Check out", primary="true")
      .black-80.w-80-l.w-100.center.tc(v-if="getCart.items.length === 0")
        Nothing
    //- //-handle error if not enough stock //check stock when adding
    //- h1.f1(@click="updateCart()") ADD ADDRESS AND DISCOUNT!!
    //- h1.f1(@click="removeDiscount()") REMOVE DISCOUNT!
    //- h1.f1(@click="startPayment()") START PAYMENT!
    //- h1.f1(@click="selectStripe()") STRIPE
    //- //- div {{ shippingOptions }}
    //- #stripe_container.w-50
      //- h1.f1(@click="completePayment()") PAY
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
    ...mapGetters("shop", ["getCart", "getOrder", "getUser"]),
  },
  async mounted() {
    this.cartInit();
    // if (this.getCart === null) {
    //   //TRY TO RETRIEVE CART FIRST
    //   await this.$store.dispatch("shop/createCart");
    // }
    // console.log(this.getCart);
  },
};
</script>

<style>
.totalalign{
margin-left: auto;
margin-right: 0px;
}
</style>