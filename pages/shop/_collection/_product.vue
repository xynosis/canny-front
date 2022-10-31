<template lang="pug">
div(v-if='product')
  .w-80.center.h4.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{ product.title }}
  .w-100.canny-light.h-100.center.flex.items-center.align-center.justify-center
    //- description
    div {{product.description}} 
    //- images
    img(v-for='items in product.images' :src='items.url') 
    //- prices/variants
    div(v-for='items in product.variants') 
        div {{items.title}} 
        div {{ toCurrency(items.prices[0].amount) }}
    //- tasting notes
    div(v-for='items in product.tags' v-if='product.tags') {{items.value}}
    div() Add to cart
</template>
<script>
export default {
  data() {
    return {
      product: null,
    };
  },
  async mounted() {
    await this.$store.dispatch("shop/fetchProducts");

    this.product = this.$store.getters["shop/getAllProducts"].filter(
      (product) => product.handle === this.$route.params.product
    )[0];
    console.log(this.product)
  },

  methods: {
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
</style>