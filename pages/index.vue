<template lang="pug">
//- .center.dt
//-   .dt-row.hero.w-80.vh-80 x
.canny-dark.h-80.w-100
 
  swiper.vh-100.w-80(:options="swiperOption")

    swiper-slide.hero.relative.cover(
      v-if="!$store.getters['settings/isMobile']",
      v-for="items in homeCarousel",
      :key="items.id",
      :style="{ background: 'url(' + items.image + ') no-repeat center center' }"
    )
      //- height of box
      .canny-dark.w-40-l.w-50.h-50.dt.ph2.mh5.pv2.verty(v-if="homeCarousel")
        .dtc.v-mid
          .mt4.tc.f4
            h1.fw5.lh-solid.canny-logo-script.white Welcome to
            h1.fw5.lh-solid.canny-logo-serif.font-canny-yellow Canny Goat
            h1.fw5.lh-solid.canny-logo-script.mt3.white Coffee.
          .mt4.tc
            p.f4.v-mid.ph4.mt3.white {{ items.text }}

          .mt4.tc.v-btm.f4
            div(v-for="stuff of items.buttons")
              Button(
                :url="stuff.url",
                :text="stuff.text",
                primary="true",
                v-if="stuff.primary"
              )
              Button(
                v-if="stuff.secondary",
                :url="stuff.url",
                :text="stuff.text",
                secondary="true",
              )
    swiper-slide.hero.relative.cover.center(
      v-if="$store.getters['settings/isMobile']",
      v-for="items in homeCarousel",
      :key="items.id"
    )
      .vh-25.w-100(
        :style="{ background: 'url(' + items.image + ') no-repeat center center' }"
      )
      .dt.canny-dark.center(v-if="homeCarousel")
        .dtc.v-mid
          .mt4.tc.f4
            h1.fw5.lh-solid.canny-logo-script.white Welcome to
            h1.fw5.lh-solid.canny-logo-serif.font-canny-yellow Canny Goat
            h1.fw5.lh-solid.canny-logo-script.mt3.white Coffee.
          .mt4.tc
            p.f4.v-mid.ph4.mt3.white {{ items.text }}
          .mt4.tc.v-btm.f4
            div(v-for="stuff of items.buttons")
              Button(
                :url="stuff.url",
                :text="stuff.text",
                primary="true",
                v-if="stuff.primary"
              )
              Button(
                v-if="stuff.secondary",
                :url="stuff.url",
                :text="stuff.text",
                secondary="true",
              )

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
    // this.carouselBuilder(this.page.html);
    let temp = this.pageProcessor(this.page.html, "h1");
    temp = temp.slice(1, temp.length);
    for (let items of temp) {
      this.carouselBuilder(items);
    }
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
      let $ = cheerio.load(html);

      let carousel = {
        text: null,
        buttons: [],
        image: null,
      };
      carousel.buttons.push({
        text: $("h1")[0].children[0].children[0].data,
        url: $("a")[0].attribs.href,
        primary: true,
        secondary: false,
      });
      carousel.text = $("p")[0].children[0].data;

      if ($("h2")[0]) {
        carousel.buttons.push({
          text: $("h2")[0].children[0].children[0].data,
          url: $("a")[1].attribs.href,
          primary: false,
          secondary: true,
        });
      }
      if ($("img")[0]) carousel.image = $("img")[0].attribs.src;
      this.homeCarousel.push(carousel);
      console.log(this.homeCarousel);
      // }

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