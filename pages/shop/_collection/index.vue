<template lang="pug">
//- div
//-   .w-80.center.h4.canny-dark
//-     h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{ $route.params.collection }}
//-   .w-100.canny-light.h-100.center.flex.items-center.align-center.justify-center
//-     nuxt-link.canny-yellow.h-100.w-25-l.w-80.mv4(:to='$route.params.collection + "/" + items.handle' v-for="items in collection")
//-       .vh-25-l.vh-50(v-if='items.images[0]'
//-         :style="{ 'background-image': 'url(' + items.images[0].url + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': 'center' }"
//-       )
//-       .vh-25-l.vh-50.canny-dark.pa2
//-         h1.white {{ items.title }}
//-         p.white {{ items.description }}
//-         span.white {{ toCurrency(items.variants[0].prices[0].amount) }}
//-         span.white {{ items.variants[0].title }}
//-         //- div {{ items.node.process }}
//-         //- div {{ items.node.notes }}
.justify-center.items-center.pv4
  .w-80.center.h4.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{ $route.params.collection }}
  .w-100.canny-light.h-100
    .mh5-l.mv4.pa4.flex-wrap(
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
            .ph3.pb3.link.w-100.font-canny-yellow
              h1.canny-logo-serif.font-canny-yellow {{ items.title }}
              p.white {{ items.description }}
              p.white.canny-header.tr from {{ toCurrency(items.variants[0].prices[0].amount) }}
              //- p.white.canny-header {{ items.variants[0].title }}
            //- div {{ items.node.process }}
            //- div {{ items.node.notes }}
          //- h2.f3.mb0.fw5 {{ items.title }}
          //-       //- p.lh-copy.fw4.mt2(v-html="excerpt(html)", v-if="html")
          //- p.tl.f4.fw4.underline Read more
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
a {
  text-decoration: none;
}
</style>