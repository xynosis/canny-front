<template lang="pug">
.justify-center.items-center.pv4
  
  .mh5-l.mv4(:class="{ 'flex': !$store.getters['settings/isMobile'] }")
    post.pv4.tl(v-for="items in posts", :key="items.id" :white='true' v-if='items.tags[0]'
      :post="items",
      :path="'news/'",
      :link="false" 
      :class="{ 'w-third': !$store.getters['settings/isMobile'], 'w-100' : !$store.getters['settings/isMobile'] }"
    )
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      listen: null,
    };
  },
  async mounted() {
    await this.$store.dispatch("posts/fetchPosts");

    

    this.listen = this.$store.getters["posts/getPostsByTag"]("listen");
    this.posts = this.$store.getters["posts/getAllPosts"];

    this.posts = this.posts.filter((el) => !this.listen.includes(el));
    this.posts = JSON.parse(JSON.stringify(this.posts.slice(0, 3)));

    // for (let i = 0; i < this.posts.length; i++){
    
    //   if (this.posts[i].tags.length === 0){
    //     let obj = {
    //       name: 'news'
    //     }
    //     this.posts[i].tags.push(obj)
    //   }
    // }

 

  },
  methods: {
    excerpt(post) {
      // console.log(post);
      if (post.excerpt != null) {
        let excerpt = post.html.split("</p>");
        for (let i = 1; i < excerpt.length; i++) {
          return excerpt[0];
        }
      }
      // return post.excerpt
    },
    getPostDate(post) {
      return dateformat(post.published_at, "mmmm dS, yyyy");
    },
  },
};
</script>

<style lang="scss">
#white {
  color: white;
}
</style>