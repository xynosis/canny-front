<template lang="pug">
div
  .w-80.center.h4.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Shop
  .w-100.canny-light.vh-75.center.flex.items-center.align-center.justify-center
    .w-25.mh4.mv4
      .canny-dark.w-100.vh-25.mh4.mv4
        a.center.justify-center.align-center.flex.items-center.h-100(href='/shop/filter')
          .font-canny-yellow.canny-logo-serif.f3.h1 Filter
      .canny-dark.w-100.vh-25.mh4.mv4 
        a.center.justify-center.align-center.flex.items-center.h-100(href='/shop/equipment')
          .font-canny-yellow.canny-logo-serif.f3.h1 Equipment
    .w-25.mh4.mv4
      .canny-dark.w-100.vh-25.mh4.mv4 
        a.center.justify-center.align-center.flex.items-center.h-100(href='/shop/espresso')
          .font-canny-yellow.canny-logo-serif.f3.h1 Espresso
      .canny-dark.w-100.vh-25.mh4.mv4 
        a.center.justify-center.align-center.flex.items-center.h-100(href='/shop/merch')
          .font-canny-yellow.canny-logo-serif.f3.h1 Merch
    
    
</template>

<script>

export default {
  data(){
    return {
      categories: null
    }
  },
  async mounted(){
    // if (this.$store.getters['index/getAllProducts'] === null) {
    // await this.$store.dispatch('shop/fetchProducts')
    // this.products = this.$store.getters['shop/allProducts']
    // console.log(this.products)
    await this.$store.dispatch('shop/fetchCategories')
    this.categories = this.$store.getters['shop/categories']
    console.log(this.categories)
    // }
  }
}
</script>