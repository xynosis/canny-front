<template lang="pug">
.w-100.pb4
  .w-100.center.ph4(
    :class="{ 'w-60-l': !$store.getters['settings/isMobile'] }"
  )
    h1.tl Our work
    p(v-html='page.html' v-if='page')
  .w-100
    .center.flex.flex-wrap(
      :class="{ 'w-60-l': !$store.getters['settings/isMobile'] }"
    )
      post.pa2.tl.w-50-ns.w-100.ph4(
        :post="post",
        path="/our-work/",
        :key="post.id",
        :tags="true",
        :showDate="true",
        v-for="post in posts"
      )

</template> 

<style lang='scss' scoped>
a {
  text-decoration: none;
}

.container {
  margin: 0 auto;
  min-height: 80vh;
  justify-content: center;
  text-align: center;
}
.logo {
  width: 60vw;
}
.stable-post {
  min-height: 700px;
}

.bg-about {
  /* height: 100vh; */
  // background-image: url(~/assets/wave.svg);
  background-size: cover;
  background-repeat: repeat-y;
}
</style>

<script>
import JSSoup from "jssoup";
import Post from "~/components/Post.vue";
export default {
  components: { Post },
  methods: {
    extractLink(html) {
      let soup = new JSSoup(html);
      let links = soup.findAll("a");
      return links[0].attrs.href;
    },
    stripLinkFromHTML(html) {
      //   let soup = new JSSoup(html);
      let link = this.extractLink(html);
      let formatted = html.split(link);
      return formatted[2];
      //   return x;
    },
  },
  async mounted() {
     if (this.$store.getters["posts/getAllPages"] === null) {

      await this.$store.dispatch("posts/fetchPages");
    } // console.log(this.$store.getters)
    let route;
    if (this.$route.path.startsWith('/')){
      route = this.$route.path.substring(1,this.$route.path.length)
    }
    this.page = this.$store.getters["posts/getPageBySlug"]('our-work');

    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }
    if (this.$store.getters["shop/getAllProducts"] === null) {
      await this.$store.dispatch("shop/fetchProducts")
    } 
    console.log('products')
    console.log(this.$store.getters["shop/getAllProducts"])


    await this.$store.dispatch("posts/fetchPosts");
    await this.$store.dispatch("posts/fetchTags");
    this.listen = this.$store.getters["posts/getPostsByTag"]("listen");
    this.posts = this.$store.getters["posts/getAllPosts"];

    this.posts = this.posts.filter((el) => !this.listen.includes(el));

  
    // for (let i = 0; i++; i < this.posts.length) {
    //   this.posts = this.posts.filter(function (el) {
    //     return !toRemove.includes(el);
    //   });
    // }
    if (this.posts == null) {
      this.posts = false;
      this.error = true;
    }
  },
  data() {
    return {
      error: null,
      listen: null,
      posts: null,
      page: null
    };
  },
};
</script>