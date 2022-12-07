<template lang="pug">
.justify-center.items-center
  .w-80.center.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{ $route.params.collection }}
  .w-100.canny-light.h-100
    .mh5-l.pa4.flex-wrap(
      :class="{ flex: !$store.getters['settings/isMobile'] }"
    )
      .center(
        :class="{ 'w-third': !$store.getters['settings/isMobile'], 'w-100': $store.getters['settings/isMobile'] }",
        v-for="items of collection",
        :key="items.id"
      )
        .canny-dark.ma3
          nuxt-link.tl(
            :post="items",
            :to="$route.params.collection + '/' + items.handle",
            :link="false"
          )
            //-size ofbox
            .aspect-ratio.post.relative.aspect-ratio--7x5(
              v-if="items.images[0]",
              :style="{ 'background-image': 'url(' + items.images[0].url + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': 'center' }"
            )
            .aspect-ratio.post.relative.aspect-ratio--7x5.canny-dark(
              v-if="!items.images[0]"
            )
            .ph3.pb3.link.w-100.font-canny-yellow
              h1.canny-logo-serif.font-canny-yellow.tc {{ items.title }}
              h2.canny-header.font-canny-teal.f4.tc {{ items.subtitle }}
              div(
                v-if="$route.params.collection === 'filter' || $route.params.collection === 'espresso'"
              )
                p.white Tastes like:
                .flex.justify-center
                  .f4.ph3.canny-logo-script(
                    v-for="tag in items.tags",
                    v-if="items.tags"
                  ) {{ tag.value }}
              div(
                v-if="$route.params.collection === 'merch' || $route.params.collection === 'equipment'"
              ) 
                p.white {{ items.description }}
              p.white.canny-header.tr from {{ toCurrency(items.variants[0].prices[0].amount) }}
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

<style scoped>
a,
a:visited,
a:visited h1 {
  text-decoration: none;
}
</style>