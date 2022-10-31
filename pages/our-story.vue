<template lang="pug">
.w-100.canny-light
  div(v-if="page")
    .w-100.h4.canny-dark
      .w-80.center
        h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Our story
    .w-80-l.w-100.tc.center.canny-light
      .f2.font-canny-dark.pv5.ph4(v-html="page.html")
        //- img
        //- 
        //-   .w-100.canny-dark
        //-     .w-80.h4.pv5.center
        //-       .f1.font-canny-yellow.canny-logo-serif Subheading
    //- .w-100.canny-light
    //-   .w-80.center.tc.justify-center
  //-       .f2.font-canny-dark.pv5.ph4(v-html="page.values") 
  


</template>


<script>
export default {
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {
      await this.$store.dispatch("posts/fetchPages");
    } // console.log(this.$store.getters)
    let route;
    if (this.$route.path.startsWith("/")) {
      route = this.$route.path.substring(1, this.$route.path.length);
    }
    this.page = this.$store.getters["posts/getPageBySlug"](route);

    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }

  },
  data() {
    return {
      page: null
    };
  },
};
</script>
