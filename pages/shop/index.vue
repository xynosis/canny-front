<template lang="pug">
div
  .w-80.center.h4.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Shop
  .w-100.canny-light.pv5
    .flex.flex-wrap.w-80-l.w-90.center.tc
      .center.ma4(
        v-for="items of categories",
        :class="{ 'w-40': !$store.getters['settings/isMobile'], 'w-100': $store.getters['settings/isMobile'] }"
      )
        .canny-dark.ptop
          a.center(:href="'/shop/' + items.handle")
            h1.font-canny-yellow.canny-logo-serif.f1 {{ items.title }}
  
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
.ptop{
  padding-top: 40%;
  padding-bottom: 40%;
}
</style>