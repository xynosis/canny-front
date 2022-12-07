<template lang="pug">
div
  OrderInfo
  h1.canny-header Payment information
  form.measure.w-100
    fieldset.ba.b--transparent.ph0.mh0
      .mt3
        #payment
    //-     label.db.fw6.lh-copy.f3 Card number
    //-     input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-       type="text",
    //-       v-model="cardNum"
    //-     )
    //-   .mt3
    //-     label.db.fw6.lh-copy.f3 Name on card
    //-     input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-       type="text",
    //-       v-model="name"
    //-     )
    //-   .mt3
    //-     .flex-l
    //-       .w-60.pr2-l
    //-         label.db.fw6.lh-copy.f3 Expiration date (MM/YY)
    //-         input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-           type="text",
    //-           v-model="expiration"
    //-         )
    //-       .w-40.pl2-l
    //-         label.db.fw6.lh-copy.f3 Security code
    //-         input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-           type="text",
    //-           v-model="security"
    //-         )

    //-   .mt3
    //-     h1 Billing address
    //-     .flex.mt3
    //-       input(type="radio", :value="false", v-model="displayAddress")
    //-       label.pl2.fw6.lh-copy.f3 Same as shipping address
    //-     .flex.mt3
    //-       input(type="radio", :value="true", v-model="displayAddress")
    //-       label.pl2.fw6.lh-copy.f3 Different than shipping address

    //-     div(v-if="displayAddress === true")
    //-       .mt3
    //-         .flex-l
    //-           .w-100.pr2-l
    //-             label.db.fw6.lh-copy.f3 First name
    //-             input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-               type="text",
    //-               name="name",
    //-               v-model="name"
    //-             )
    //-           .w-100.pl2-l
    //-             label.db.fw6.lh-copy.f3 Surname
    //-             input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-               type="text",
    //-               name="surname",
    //-               v-model="surname"
    //-             )
    //-       .mt3
    //-         label.db.fw6.lh-copy.f3 Address line 1
    //-         input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-           type="text",
    //-           name="address-1",
    //-           v-model="address1"
    //-         )
    //-       .mt3
    //-       label.db.fw6.lh-copy.f3 Address line 2
    //-       input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-         type="text",
    //-         name="address-2",
    //-         v-model="address2"
    //-       )
    //-       .mt3
    //-         label.db.fw6.lh-copy.f3 Town
    //-         input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-           type="text",
    //-           name="town",
    //-           v-model="town"
    //-         )
    //-       .mt3
    //-         label.db.fw6.lh-copy.f3 Post code
    //-         input.pa2.input-reset.ba.bg-transparent.outline.w-100(
    //-           type="text",
    //-           name="postcode",
    //-           v-model="postcode"
    //-         ) 

  .justify-end.flex
    .pointer(@click="$emit('back')")
      Button(tertiary="true", text="< Back")
    .pointer(@click="proceed()")
      Button(primary="true", text="Review order >")
</template>

<script>
export default {
  methods: {
    async proceed() {
      // let data = {
      //   cartId: this.getCart.id,
      //   // shippingMethod: this.shipping,
      // };
      //   await this.$store.dispatch("shop/addShippingMethod", data);

      this.$emit("confirm");
    },
  },
  props: ["stripe"],
  async mounted() {
    this.stripePaymentElement(this.stripe);
  },
};
</script>