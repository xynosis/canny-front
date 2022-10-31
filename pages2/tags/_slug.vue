<template lang="pug">
.w-100.pb4
  
  .w-100.center.pt5(:class="{'w-60-l': !$store.getters['settings/isMobile']}")
      h1.tl.pl4.ttc {{ title}}
  .w-100
    .center.flex.flex-wrap(:class="{'w-60-l': !$store.getters['settings/isMobile']}" v-if='posts')
      post.pa2.tl.w-50-ns.w-100.ph4(:post='post' path='/news/' :key='post.id' :tags='true' :showDate='true' v-for="post in posts ")
    .center.flex.flex-wrap(:class="{'w-60-l': !$store.getters['settings/isMobile']}" v-if='noPage')
      .f4 It doesn't look like we have any posts for that tag.

    //- template(v-slot:post='post')
    
  //- article.fl.w-100.w-50-m.w-33-l.pa2.tl(v-for="post of posts ")
  //-   nuxt-link.btn.link(:to="{ path: '/resources/' + post.slug }") 
  //-     .aspect-ratio.aspect-ratio--1x1
  //-       .tr.right-0.absolute.z-max.pr3(v-if="post.feature_image" v-for="items of post.tags")
  //-           p.bg-white.black.w-100.ph3.pv2.br-pill {{items.name }}
  //-       img.db.bg-center.cover.aspect-ratio--object(v-if="post.feature_image" 
  //-         :style="'background-image: url(' + post.feature_image + ')'"
  //-       )
  //-       .tr.right-0.absolute.z-max.pr3(v-if="!post.feature_image" v-for="items of post.tags")
  //-           p.bg-white.black.w-100.ph3.pv2.br-pill  {{items.name}}
  //-       .primary-bg.db.bg-center.aspect-ratio--object(v-if="!post.feature_image")
  //-     .ph2.ph0-ns.pb3.link.db
  //-       h3.f5.f4-ns.mb0.black-90 {{ post.title }}
  //-       p.f6.f5.fw4.mt2.black-60(v-html="post.html")

 
    
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
.stable-post{
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
import Post from '~/components/Post.vue'
export default {
  components: {Post},
  methods: {
    removeHyphen(slug){
      let split = slug.split('-')
      let title = '';

      for (let i = 0; i < split.length; i++){
        title = title + split[i]
        if (i != split.length-1){
          title = title + " "
        }
      }
      return title;
    },
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
    await this.$store.dispatch("posts/fetchPosts");
    await this.$store.dispatch("posts/fetchTags");

    this.title = JSON.parse(JSON.stringify(this.removeHyphen(this.$route.params.slug)))
    this.posts = await this.$store.getters["posts/getPostsByTag"](this.title);
   
    if (this.posts == null || this.posts.length === 0) {
      this.posts = false;
      this.noPage = true;
      this.error = true;
    } else {
      this.noPage= false;
    }
  },
  data() {
    return {
      error: null,
      posts: null,
      noPage: null,
      title: ''
    };
  },
};
</script>