<template lang="pug">
.w-100.pb4
  div(v-if="page")
    .w-60-l.w-90.center.primary
      h1.tl {{ page.title }}
      //-div.flex.w-50(v-for="items in network", v-html="items")
      //- .lh-copy.bg-about.tl(v-if='page' v-html='page.rest')

    .w-100
      .center.flex.flex-wrap(
        :class="{ 'w-60-l': !$store.getters['settings/isMobile'] }"
      )
        .partners.flex.items-end.dt.pa5.tl.justify-center.w-50-ns.w-100.primary.fixy(v-for="partners in network")
          div(v-html="partners")

  .justify-center.items-center.flex(v-if="error", :header="page.title")
    p.lh-copy(v-if="error") Looks like the page you are looking for isn't here!
</template>



<style lang='scss' scoped>
div ::v-deep img,
svg {
  
  @media screen and  (max-width: 660px){
    width: 180px;
    height: auto;
  }
  @media screen and  (min-width: 661px) and (max-width: 1629px){ 
    width: auto;
    height: 10vh;
    
  }
  @media screen and  (min-width: 1630px){
    width: auto;
    height: 18vh;
    
  }

}

.fixy{
  max-height: 500px
}

div ::v-deep h2 {
  font-size: 2rem;
}

div ::v-deep p {
  text-align: left;
  font-size: 1.5rem;
}


div ::v-deep a{
    text-decoration: underline;
    font-weight: 400;
    font-size: 1.25rem;
}
.partners:hover {
  background-color: #D3E2EE;
  h2, p {
    color:$primary;
  }
  /* border: 1px solid black; */
}
</style>

<script>

export default {
  data() {
    return {
      page: null,
      error: false,
      network: null,
    };
  },
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {
      await this.$store.dispatch("posts/fetchPages");
    } // console.log(this.$store.getters)
    console.log(this.$route.name);
    this.page = this.$store.getters["posts/getPageBySlug"](this.$route.name);
    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }
    this.imageSeparator();
  },
  methods: {
    imageSeparator() {
      let timelineSplitter = this.page.html.split("<img");
      for (let i = 0; i < timelineSplitter.length; i++) {
        timelineSplitter[i] = "<img" + timelineSplitter[i];
      }
      timelineSplitter = timelineSplitter.slice(1, timelineSplitter.length);

      console.log(timelineSplitter);
      this.network = timelineSplitter;

      //   let soup = new JSSoup(this.post.html);
      //   let images = soup.findAll("img");

      //   for (let items of images) {
      //     this.images.push(items.attrs.src);
      //   }

      // },
    }, linkSeparator(){
      let linkSplitter = this.page.html("<a")
      for (let i = 0; i < linkSplitter.length; i++) {
        linkSplitter[i] = "<a" + linkSplitter[i];
      }
      linkSplitter = linkSplitter.slice(1, linkSplitter[i].length);

      console.log(linkSplitter);
      this.networkLinks = linkSplitter;
    }
  },
};
</script>
