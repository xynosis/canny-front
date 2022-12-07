<template lang="pug">
div(v-if='page')
  .w-80.center.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{this.page.title}}
  .w-100.center.canny-light
    //- sections begin
    .f3.font-canny-dark(v-for="items of sections")
      //-section header
      div(v-if="items.flex")
        .w-100.canny-dark
          .w-80.pv5.center
            h1.fw5.pt4.f1.section-banner(v-if="items.header") {{ items.header.title }}
        //-section content
        .flex.flex-wrap.w-80-l.w-100.pv3.ph4.center.tc.canny-light
          .center(
            v-for="stuff of items.rest",
            :class="{ 'w-third': !$store.getters['settings/isMobile'], 'w-100': $store.getters['settings/isMobile'] }"
          )
            h2.canny-header {{ stuff.title }}
            .aspect-ratio.post.relative.aspect-ratio--7x5(
              :style="{ 'background-image': 'url(' + stuff.image + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': 'center top' }"
            )
            p.f3.pa2.lh-title(v-for="paras of stuff.text") {{ paras }}
      //- no h2 sub element content
      div(v-if="!items.flex")
        .w-100.canny-dark(v-if="items.header")
          .w-80.pv5.center
            h1.fw5.pt4.f1.section-banner {{ items.header }}

        .w-100.canny-light.pv3
          .w-80.center.tc.justify-center
            .f3.font-canny-dark.tl.mv3.w-70-l.w-100.lh-title(
              v-for="stuff of items.rest",
              v-html="stuff"
            ) 
        .w-100.vh-50(
          v-if="items.image",
          :style="{ 'background-image': 'url(' + items.image + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': 'center' }"
        )

      //- img
      //- 
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
    console.log('this.page')
    console.log(route)
    this.sections = this.pageProcessor(this.page.html, "h1");

    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].includes("h2")) {
        this.sections[i] = this.pageProcessor(this.sections[i], "h2");
        this.sections[i] = {
          header: this.elementExtractor(this.sections[i][0], "h1"),
          // header: this.sections[i][0],
          rest: this.sections[i].slice(1, this.sections[i].length),
          flex: true,
        };
        for (let j = 0; j < this.sections[i].rest.length; j++) {
          this.sections[i].rest[j] = this.elementExtractor(
            this.sections[i].rest[j],
            "h2"
          );
        }
      } else {
        let temp = this.elementExtractor(this.sections[i], "h1");

        this.sections[i] = {
          header: temp.title,
          rest: temp.text,
          image: temp.image,
          flex: false,
        };
      }
    }
    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }
  },
  data() {
    return {
      page: null,
      sections: null,
      people: null,
    };
  },
};
</script>

<style  lang='scss'>
</style>