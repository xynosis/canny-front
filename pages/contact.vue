<template lang="pug">
.w-100.canny-light
  div(v-if="page")
    .w-100.h4.canny-dark
      .w-80.center
        h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5(v-html="page.title")
    .w-80-l.w-100.tc.center.canny-light
      .f2.font-canny-dark.pv5.ph4(v-html="page.html")
</template>


<script>
export default {
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {
      await this.$store.dispatch("posts/fetchPages");
    }
    let route = this.$route.path;
    if (this.$route.path.startsWith("/")) {
      route = route.substring(1, route.length);
    } 
    if (this.$route.path.endsWith("/")) {
      route = route.substring(0, route.length -1);
    } 
    
    this.page = this.$store.getters["posts/getPageBySlug"](route);

    if (this.page == null) {
      this.page = {
        title: "Oops!",
        html: "It looks like this page doesn't exist!",
      };
      this.error = true;
    }
    console.log(this.page);
  },
  data() {
    return {
      page: null,
      error: null,
    };
  },
};
</script>
