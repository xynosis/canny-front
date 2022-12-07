<template lang="pug">
div
  .w-80.center.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Check out
  .w-100.canny-light
    main.pa4
      .w-80-l.w-100.center
        div(
          :class="{ dn: !address || !shipping || !pay || !confirm || !done }"
        )
          p Loading...
        div(:class="{ dn: !address }")
          h1.canny-logo-serif.font-canny-dark Shipping address
          #address
        div(:class="{ dn: !shipping }")
          h1.canny-logo-serif.font-canny-dark Delivery options

          .flex.mt3(v-for="items of getShipping")
            input(
              type="radio",
              :id="items.id",
              :value="items.id",
              v-model="shippingChoice"
            )
            label.pl2.fw6.lh-copy.f3(:for="items.id") {{ items.name }} {{ toCurrency(items.price_incl_tax) }}
        div(:class="{ dn: !pay }")
          h1.canny-logo-serif.font-canny-dark Payment information
          #payment
        OrderInfo.totalalign(v-if="confirm", :order="getCart")
        p(v-if="done") Processing your payment...
        iframe(v-if="done && threeds") 
        .justify-end.pt4.flex(v-if="!done")
          .pointer(@click="back()")
            Button(tertiary="true", text="< Back")
          .pointer(@click="proceed()")
            Button(primary="true", :text="proceedText")
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("shop", ["getCart", "getShipping"]),
  },
  data() {
    return {
      address: true,
      shipping: false,
      shippingChoice: [],
      pay: false,
      confirm: false,
      done: false,
      elements: null,
      proceedText: "Choose postage >",
      threeds: false,
    };
  },
  methods: {
    async proceed() {
      if (this.address) {
        this.address = false;
        this.shipping = true;
        this.proceedText = "Proceed to payment info >";
      } else if (this.shipping) {
        this.shipping = false;
        this.pay = true;
        let data = {
          cartId: this.getCart.id,
          shippingMethod: this.shippingChoice,
        };
        await this.$store.dispatch("shop/addShippingMethod", data);
        this.proceedText = "Review info >";
      } else if (this.pay) {
        this.pay = false;
        this.confirm = true;
        this.proceedText = "Place order";
      } else if (this.confirm) {
        this.confirm = false;
        this.done = true;
        await this.completePayment(this.elements);
      }
    },

    async back() {
      if (this.address) {
        this.$router.push("/cart");
      } else if (this.shipping) {
        this.shipping = false;
        this.address = true;

        this.proceedText = "Choose postage >";
      } else if (this.pay) {
        this.pay = false;
        this.shipping = true;
        this.proceedText = "Proceed to payment info >";
      } else if (this.confirm) {
        this.confirm = false;
        this.pay = true;
        this.proceedText = "Review info >";
      }
    },
  },

  async mounted() {
    await this.cartInit();
    if (this.getCart.items.length === 0) {
      this.$router.push("/cart");
    }
    await this.startPayment();
    this.elements = await this.selectStripe();
    this.stripePaymentElement(this.elements);
    this.stripeAddressElement(this.elements);
    await this.getShippingOptions();
    // if (this.getCart.shipping_address.address_1 && this.getCart.shipping_methods.length > 0){

    //   this.pay=true;
    // } else if (this.getCart.shipping_address.address_1){
    //   this.shipping = true
    // } else {
    //   this.address=true
    // }
    //if address or delivery options detected from previous, skip
  },
};
</script>
