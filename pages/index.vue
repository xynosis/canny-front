<template lang="pug">
//- .center.dt
//-   .dt-row.hero.w-80.vh-80 x
.canny-dark.h-80.w-100.mt4
  //- this should toggle for carousel
  //- structure should stay though, so should be 'background = default, or another from API'
  //-.tc.center.items-center.DT
  swiper.vh-75.w-80(:options="swiperOption")
    //- .dtc.v-mid hi i'm in the box
    //- .canny-dark.w-40.h-50.dt.mh5
    //-   .dtc.v-mid
    //-     .mt4.tc.f4
    //-       h1.fw5.lh-solid.canny-logo-script Welcome to 
    //-       h1.fw5.lh-solid.canny-logo-serif.font-canny-yellow Canny Goat
    //-       h1.fw5.lh-solid.canny-logo-script.mt3 Coffee. 
    //-     .mt4
    //-       p.f4.v-mid.ph4.mt3 Canny Goat Coffee roasts delicious high-quality coffees that everyone can enjoy.
    //-       p.f4.v-mid.ph4.mt3 Pick up a coffee today and start your journey into the world of specialty coffee.
    //-     .mt4.tc.v-btm.f3
    //-       a.ttu.font-canny-dark.link.br3.ph3.pv2.mb2.dib.white.canny-yellow.mh3(href='/shop') Shop coffee
    //-       a.ttu.link.br3.ph3.pv2.mb2.ba.dib.font-canny-yellow.mh3(href='/wholesale') Wholesale
    //- .swiper-container
    //-   .swiper-wrapper
    //-     .swiper-slide Slide 1
    //-     .swiper-slide Slide 2
    //-     .swiper-slide Slide 3

    swiper-slide.hero.relative.cover(
      v-if="!$store.getters['settings/isMobile']",
      v-for="items in homeCarousel",
      :key="items.id",
      :style="{ background: 'url(' + items.image + ') no-repeat center center' }"
    )
      .canny-dark.w-30.h-50.dt.mh5.verty(v-if="homeCarousel")
        .dtc.v-mid
          .mt4.tc.f4
            h1.fw5.lh-solid.canny-logo-script.white Welcome to
            h1.fw5.lh-solid.canny-logo-serif.font-canny-yellow Canny Goat
            h1.fw5.lh-solid.canny-logo-script.mt3.white Coffee.
          .mt4.tc
            p.f4.v-mid.ph4.mt3.white {{ items.text }}

          //- .mt4.tc.v-btm.f4
          //-   a.ttu.font-canny-dark.link.br3.ph3.pv2.mb2.dib.white.canny-yellow.mh3(href='/shop') Shop coffee
          //-   a.ttu.link.br3.ph3.pv2.mb2.ba.dib.font-canny-yellow.mh3(href='/wholesale') Wholesale
          .mt4.tc.v-btm.f4
            a.ttu.font-canny-dark.link.br3.ph3.pv2.mb2.dib.white.canny-yellow.mh3(
              :href="items.buttons.primary.link"
            ) {{ items.buttons.primary.text }}
            a.ttu.link.br3.ph3.pv2.mb2.ba.dib.font-canny-yellow.mh3(
              v-if="items.buttons.secondary.link || items.buttons.secondary.text",
              :href="items.buttons.secondary.link"
            ) {{ items.buttons.secondary.text }}
    swiper-slide.hero.relative.cover.center(
      v-if="$store.getters['settings/isMobile']",
      v-for="items in homeCarousel",
      :key="items.id"
    )
      .vh-25.w-100( :style="{ background: 'url(' + items.image + ') no-repeat center center' }")
      .dt.canny-dark.center(v-if="homeCarousel")
        .dtc.v-mid
          .mt4.tc.f4
            h1.fw5.lh-solid.canny-logo-script.white Welcome to
            h1.fw5.lh-solid.canny-logo-serif.font-canny-yellow Canny Goat
            h1.fw5.lh-solid.canny-logo-script.mt3.white Coffee.
          .mt4.tc
            p.f4.v-mid.ph4.mt3.white {{ items.text }}

          //- .mt4.tc.v-btm.f4
          //-   a.ttu.font-canny-dark.link.br3.ph3.pv2.mb2.dib.white.canny-yellow.mh3(href='/shop') Shop coffee
          //-   a.ttu.link.br3.ph3.pv2.mb2.ba.dib.font-canny-yellow.mh3(href='/wholesale') Wholesale
          .mt4.tc.v-btm.f4
            a.ttu.font-canny-dark.link.br3.ph3.pv2.mb2.dib.white.canny-yellow.mh3(
              :href="items.buttons.primary.link"
            ) {{ items.buttons.primary.text }}
            a.ttu.link.br3.ph3.pv2.mb2.ba.dib.font-canny-yellow.mh3(
              v-if="items.buttons.secondary.link || items.buttons.secondary.text",
              :href="items.buttons.secondary.link"
            ) {{ items.buttons.secondary.text }}

    .swiper-pagination(slot="pagination")
</template>


<script>
import cheerio from "cheerio";
export default {
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {
      await this.$store.dispatch("posts/fetchPages");
    }

    this.page = this.$store.getters["posts/getPageBySlug"]("carousel");
    this.carouselBuilder(this.page.html);
  },
  data() {
    return {
      homeCarousel: [],
      selectedCarousel: { text: null },
      swiperOption: {
        // loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        // effect: 'fade',
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
  methods: {
    carouselBuilder(html) {
      //  console.log(html)

      let splitter = html.split("<h1");

      //   console.log(splitter)
      // let frontMatter = splitter[1]

      //   // console.log(this.page.rest)

      for (let i = 1; i < splitter.length; i++) {
        splitter[i] = "<h1" + splitter[i];
        let $ = cheerio.load(splitter[i]);

        let carousel = {
          text: null,
          buttons: {
            primary: {
              text: null,
              link: null,
            },
            secondary: {
              text: null,
              link: null,
            },
          },
          image: null,
        };
        console.log($("h1"));
        carousel.text = $("p")[0].children[0].data;
        carousel.buttons.primary.text = $("h1")[0].children[0].children[0].data;
        carousel.buttons.primary.link = $("a")[0].attribs.href;
        if ($("h2")[0]) {
          carousel.buttons.secondary.text =
            $("h2")[0].children[0].children[0].data;
          carousel.buttons.secondary.link = $("a")[1].attribs.href;
        }
        if ($("img")[0]) carousel.image = $("img")[0].attribs.src;
        this.homeCarousel.push(carousel);
        console.log(this.homeCarousel);
        // }
      }
      // }
    },
  },
};
</script>

<style lang="scss">
.hero {
  // background: url('../assets/images/canny-1.jpg') no-repeat center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.verty {
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.swiper-pagination-bullet-active {
  background-color: $yellow;
}
</style>