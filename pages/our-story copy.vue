<template lang="pug">
div(v-if="page").debug
  .w-80.center.h4.canny-dark
    h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Our story
  .w-100.canny-light
    .w-70.tc.center
      .f2.font-canny-dark.pv5.ph4(v-html="page.about")
  img.lh-0(src="~/assets/images/canny-1.jpg")
  .w-100.canny-dark
    .w-80.h4.pv5.center
      .f1.font-canny-yellow.canny-logo-serif Meet the team
  .w-100.canny-light
    .w-80.center.justify-center
      .w-20.mh4.mv4.flex
        .canny-dark.w-100.vh-25.mh4.mv4 
          .center.justify-center.align-center.flex.items-center.h-100(
            :src="page.iainPhoto"
          )
          .font-canny-dark.canny-logo-serif.f3.h1.pv4 Iain
          .f3.font-canny-dark(v-html="page.iainBio")

      .w-20.mh4.mv4
        .canny-dark.w-100.vh-25.mh4.mv4 
          .center.justify-center.align-center.flex.items-center.h-100(
            :src="page.katePhoto"
          )
          .font-canny-dark.canny-logo-serif.f3.h1.pv4 Kate
          .f3.font-canny-dark(v-html="page.kateBio")

      .w-20.mh4.mv4
        .canny-dark.w-100.vh-25.mh4.mv4 
          .center.justify-center.align-center.flex.items-center.h-100(
            :src="page.catPhoto"
          )
          .font-canny-dark.canny-logo-serif.f3.h1.pv4 Cat
          .f3.font-canny-dark(v-html="page.catBio")

  .w-100.canny-dark
    .w-80.h4.pv5.center
      .f1.font-canny-yellow.canny-logo-serif Our values
  .w-100.canny-light
    .w-80.tc.center
      .f2.font-canny-dark.pv5.ph4(v-html="page.values") Find good ways to say: Inclusion / Recognition and care / Curation / Empowering
      //- Find good ways to say: Inclusion / Recognition and care / Curation / Empowering
  .w-100.canny-dark
    .w-80.h4.pv5.center
      .f1.font-canny-yellow.canny-logo-serif Meet the goat
  .w-100.canny-light
    .w-80.center
      .w-60.lh-copy.f3.font-canny-dark.pv5.ph4(v-html="page.goatText")
</template>

<style lang="scss" scoped>
.lh-0 {
  line-height: 0;
}
</style>

<script>
export default {
  async mounted() {
    await this.$store.dispatch("shop/fetchOurStory");
    this.page = this.$store.getters["shop/ourStory"];
  },
  data() {
    return {
      page: {
        about: null,
        iainBio: null,
        iainPhoto: null,
        kateBio: null,
        katePhoto: null,
        catBio: null,
        catPhoto: null,
        values: null,
        goatText: null,
      },
    };
  },
};
</script>