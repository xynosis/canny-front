<template lang="pug">


.w-100.pb5
  div.pt5(v-if="page")
    div.w-60-l.w-10.center(:class="{ph4: $store.getters['settings/isMobile'] }" )
      h1.tl {{ page.title }}
      .lh-copy.tl(v-if="page", v-html="page.html")
      //- .lh-copy.bg-about.tl(v-if='page' v-html='page.rest')
      
  .justify-center.items-center.flex(v-if='error' :header='page.title')
    p.lh-copy(v-if='error') Looks like the page you are looking for isn't here!


</template>



<style lang='scss' scoped>
div ::v-deep img {
  width: 80%;
  height: auto;
}


div ::v-deep h2 {
  font-size: 2rem;
}

div ::v-deep p {
  text-align: left;
  font-size: 1.5rem;
}

</style>

<script>
export default {
 
  data() {
    return {
      page: null,
      error: false,
     
      
    };
  },
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {

      await this.$store.dispatch("posts/fetchPages");
    } // console.log(this.$store.getters)
    let route;
    if (this.$route.path.startsWith('/')){
      route = this.$route.path.substring(1,this.$route.path.length)
    }
    this.page = this.$store.getters["posts/getPageBySlug"](route);

    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }
  
  },

};
</script>
