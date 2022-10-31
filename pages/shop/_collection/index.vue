<template lang="pug">
div
  .w-80.center.h4.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{ $route.params.collection }}
  .w-100.canny-light.h-100.center.flex.items-center.align-center.justify-center
    nuxt-link.canny-yellow.h-100.w-25-l.w-80.mv4(:to='$route.params.collection + "/" + items.handle' v-for="items in collection")
      .vh-25-l.vh-50(v-if='items.images[0]'
        :style="{ 'background-image': 'url(' + items.images[0].url + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': 'center' }"
      )
      .vh-25-l.vh-50.canny-dark.pa2
        h1.white {{ items.title }}
        p.white {{ items.description }}
        span.white {{ toCurrency(items.variants[0].prices[0].amount) }}
        span.white {{ items.variants[0].title }}
        //- div {{ items.node.process }}
        //- div {{ items.node.notes }}
</template>
<script>
export default {
  data() {
    return {
      products: null,
      collection: null,
    };
  },
  async mounted() {
    await this.$store.dispatch("shop/fetchProducts");
    this.products = this.$store.getters["shop/getAllProducts"];
    this.collection = this.products.filter(
      (product) =>
        product.collection.title ===
        this.toSentenceCase(this.$route.params.collection)
    );
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