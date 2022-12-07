<template lang="pug">
.black-80.overflow-x-auto
  table.order.center
    thead
      tr.canny-dark.white.f3
        th.pa3 Item
        th.pa3 
        th.pa3 Quantity
        th.pa3 Price
        th
    tbody.f3
      tr(v-for="stuff of order.items", v-if="order") 
        th.pa4
          img(:src="stuff.thumbnail")
        th.ph5 {{ stuff.title }}
        th.ph5
          .flex
            div(v-if="cart")
              button.v-mid(@click="changeQuant(stuff, -1)") &mdash;
            .ph3 {{ stuff.quantity }}
            div(v-if="cart")
              button.v-mid(@click="changeQuant(stuff, 1)") &#xff0b;
        th.ph5
          div(:class="'cart' ? 'flex' : ''")
            div {{ toCurrency(stuff.unit_price) }}
        th.pointer.remove.f5(v-if="cart", @click="removeFromCart(stuff.id)") Remove&nbsp;x
  .pv3
    .tr(v-if="cart")
      .pointer(@click="discount = true", v-if="!discount")
        Button(text="Got a discount code?", :primary="true")

      table.totalalign(v-if="discount")
        tbody
          tr
            th 
              h2 Discount code:
            th 
              input.ml2(type="text", v-model="discountCode")
            th
              .pointer(@click="applyDiscount()")
                Button(:primary="true", text="Apply discount")
  div.pr3
    .tr(v-if="order")
      table.tl.f2.totalalign.pv3
        tbody(v-if="order.shipping_methods")
          tr
            th Subtotal:
            th.tr {{ toCurrency(order.subtotal) }}
          tr(v-if="order.shipping_methods.length > 0")
            th Postage:
            th.tr {{ toCurrency(order.shipping_methods[0].shipping_option.amount) }}
          tr(v-if="order.discounts.length > 0")
            th Discount:
            th.tr {{ toCurrency(order.discount_total) }}
          tr(
            v-if="order.shipping_methods.length > 0 || order.discounts.length > 0"
          )
            th Total:
            th.tr {{ toCurrency(order.total) }}
</template>

<script>
export default {
  props: ["order", "cart"],
  data() {
    return {
      discount: false,
      discountCode: "",
      discountError: false,
    };
  },
  methods: {
    changeQuant(item, amount) {
      this.updateItemQuantity(item.id, item.quantity + amount);
    },
    applyDiscount() {
      let update = {
        discounts: [{ code: this.discountCode }],
      };
      try {
        this.updateCart(update);
        this.discount = false;
      } catch {
        this.discountError = true;
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.order {
  /* table-layout: auto; */
  width: 100%;
  border-spacing: 0;
}

.order ::v-deep th {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: $dark;
}

.remove {
  color: #cc241f;
}

.remove:hover {
  color: #f71912;
}

.totalalign {
  margin-left: auto;
  margin-right: 0px;
}
</style>
