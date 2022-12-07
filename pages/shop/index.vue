<template lang="pug">
div
  .w-80.center.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Shop
  .w-100.canny-light.pv5
    .flex.flex-wrap.w-80-l.w-90.center.tc
      .center.ma4(
        v-for="items of categories",
        :class="{ 'w-20': !$store.getters['settings/isMobile'], 'w-100 w-40-l': $store.getters['settings/isMobile'] }"
      )
        nuxt-link.center(:to="'/shop/' + items.handle")
          .canny-dark.ptop
            h1.font-canny-yellow.canny-header-space.f3-l.f1 {{ items.title }}
</template>

<script>
export default {
  data() {
    return {
      categories: null,
    };
  },
  async mounted() {
    // if (this.$store.getters['index/getAllProducts'] === null) {
    // await this.$store.dispatch('shop/fetchProducts')
    // this.products = this.$store.getters['shop/allProducts']
    // console.log(this.products)
    await this.$store.dispatch("shop/fetchAllCategories");
    this.categories = this.$store.getters["shop/getCategories"];
   
    // }
  },
};
</script>

<style scoped>
.ptop {
  padding-top: 40%;
  padding-bottom: 40%;
}
.canny-header-space  {
  font-family: "Fairwater Sans";
  font-weight: 500;
  letter-spacing: 4px;
}
a, a:visited{

  text-decoration: none;
}
</style>