<template lang="pug">
div(v-if="product")
  .w-80.center.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{ product.title }}
  .w-100.canny-light.center.flex-l.font-canny-dark
    .w-60-l.w-100
      .pa4
        //- images
        img(v-for="items in product.images", :src="items.url") 
    .w-40-l.w-100.center.justify-center.items-center
      .pa4
        //- process
        h1.f2.canny-logo-serif.font-canny-dark.tc {{ product.subtitle }}

        //- tasting notes
        .flex.justify-center
          .f3.font-canny-yellow.ph3.canny-logo-script(
            v-for="tag in product.tags",
            v-if="product.tags"
          ) {{ tag.value }}
        //-price
        h1.font-canny-dark.tr {{ toCurrency(price) }}
        //- description
        p.desc {{ product.description }}

        //- variants
        .flex.justify-center.pa2
          .pointer(@click="variantSelect(items)", v-for="items in product.variants") 
            Button(
              :text="items.title",
              :tertiary="selectedVariant != items ? true : false",
              :primary="selectedVariant != items ? false : true"
            ) {{ items }}
        .flex.tc
          .w-50
            h2 Quantity:
          .w-50.flex
            h2
              button.v-mid(@click="changeQuant(-1)") &mdash;
            h2.ph3 {{ quantity }}
            h2
              button(@click="changeQuant(1)") &#xff0b;
        .pointer.tc(
          @click="addItem()",
          v-if="selectedVariant.inventory_quantity > 0"
        )
          Button.f3(
            :text="itemAdded ? 'Added!' : 'Add to cart'",
            primary="true"
          ) 
        .tc(v-if="!selectedVariant.inventory_quantity > 0")
          Button.f3(text="Out of stock", :tertiary="true") 
</template>
<script>
export default {
  data() {
    return {
      product: null,
      selectedVariant: null,
      itemAdded: false,
      quantity: 1,
    };
  },
  async mounted() {
    await this.$store.dispatch("shop/fetchProducts");

    this.product = this.$store.getters["shop/getAllProducts"].filter(
      (product) => product.handle === this.$route.params.product
    )[0];
    this.selectedVariant = this.product.variants[0];
  },
  computed: {
    price() {
      for (let items of this.product.variants) {
        if (this.selectedVariant === items) {
          return items.prices[0].amount * this.quantity;
        }
      }
    },
  },
  methods: {
    variantSelect(items) {
      this.selectedVariant = items;
      this.quantity = 1;
    },
    changeQuant(amount) {
      if (amount < 0) {
        if (this.quantity > 1) {
          this.quantity = this.quantity + amount;
        }
      } else {
        if (this.quantity + amount < this.selectedVariant.inventory_quantity) {
          this.quantity = this.quantity + amount;
        }
      }
    },
    addItem() {
      this.addToCart(this.selectedVariant.id, this.quantity);
      this.itemAdded = true;
    },
    toSentenceCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toCurrency(number) {
      number = number / 100;
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(number);
    },
  },
};
</script>

<style scoped>
img {
  height: 20%;
}
.desc {
  white-space: pre-line;
}
</style>