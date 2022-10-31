<template lang="pug">
//- .container(
//-   :class="{ 'w-100': !$store.getters['settings/isMobile'], 'w-80': $store.getters['settings/isMobile'] }"
//- )
.w-100
  div(v-if="page")
    //- .w-100.heroImg.vh-40.cover
    .w-60-l.w-100.center.pb5(
      :class="{ ph4: $store.getters['settings/isMobile'] }"
    )
      h1.tl {{ page.title }}
      #frontMatter.lh-copy.tl(v-if="page", v-html="page.html")
      //- .lh-copy.bg-about.tl(v-if='page' v-html='page.rest')
    //- Aims(:fullWidth="false")
  
      //- .lh-copy.bg-about.tl(v-if='page' v-html='page.rest')
</template>



<style lang='scss' scoped>
// .arrow-deep ::v-deep h2::before {
//   content: '< '
// }
// .arrow-deep ::v-deep h2::after {
//   content: ' >'
// }
div >>> p{
    font-size: 1.3rem;
    line-height: 1.7rem;
    color: black;
}
.timeline {
  background-color: #356890;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23B3B3B3' stroke-width='100' stroke-opacity='0' %3E%3Ccircle fill='%23356890' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23366a92' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23376b94' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23376d96' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23386e98' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%2339709a' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%233a719c' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%233a739e' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%233b74a0' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%233c76a3' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%233d77a5' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%233d79a7' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%233e7aa9' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%233f7cab' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%23407dad' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%23407faf' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%234180b1' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%234282B3' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
.t {
  @media screen and (max-width: 1700px) {
    height: 800px;
  }
  @media screen and (min-width: 1701px) {
    height: 1000px;
  }
  //   width: 50vw;
  //   height: auto;
}
.arrow-deep ::v-deep p,
.arrow-deep ::v-deep h2 {
  color: white;
}
.vh-40 {
  height: 40vh;
}

.heroImg {
  // background-image: url("../assets/hero.jpg");

  background-position: 50% 30%;
}
.swiper-slide ::v-deep div {
  // display: flex;
  // justify-content: center;
  // align-items: center;
}

div ::v-deep img {
  @media screen and (max-width: 999px) {
    width: 100vw;
    height: auto;
  }
  @media screen and (min-width: 1000px) and (max-width: 1400px) {
    width: 75%;
    height: auto;
  }
  @media screen and (min-width: 1401px) and (max-width: 1700px) {
    width: 60%;
    // max-width: 350px;
    height: auto;
  }
  @media screen and (min-width: 1701px) {
    width: 60%;
    max-width: 620px;
    height: auto;
  }
}

.custom ::v-deep img {
  @media screen and (max-width: 999px) {
    width: 100vw;
    height: auto;
  }
  @media screen and (min-width: 1000px) and (max-width: 1400px) {
    width: 45%;
    height: auto;
  }
  @media screen and (min-width: 1401px) and (max-width: 1700px) {
    width: 40%;
    // max-width: 350px;
    height: auto;
  }
  @media screen and (min-width: 1701px) {
    width: 60%;
    max-width: 620px;
    height: auto;
  }
}

div ::v-deep h2 {
  font-size: 2rem;
}

div ::v-deep p {
  text-align: left;
  font-size: 1.5rem;
}

// #frontMatter ::v-deep p {
//   font-size: 1.5rem;
//   font-weight: 400;
//   color: $primary;
//   // color: white;
// }

.swiper-button-prev,
.swiper-button-next {
  color: white;
  // color: $primary;
  font-weight: 900;
}
</style>

<script>
import JSSoup from "jssoup";

export default {
  data() {
    return {
      page: null,
      error: false,
      swiper: {
        // loop: true,
        // autoHeight: true,
        centeredSlides: true,
        direction: "horizontal",
        mousewheel: false,
        // fadeEffect: { crossFade: true },
        // parallax: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }, // grabCursor: true,
      },
    };
  },
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {
      console.log(this.$route.name);
      await this.$store.dispatch("posts/fetchPages");
    } // console.log(this.$store.getters)
    this.page = this.$store.getters["posts/getPageBySlug"]("about");
    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }
    // this.timelineProcessor(this.page);
  },
  methods: {
    landscapeCheck(items) {
      let soup = new JSSoup(items);
      let images = soup.find("img");
      // console.log('height')
      // console.log(images.attrs.height)
      // console.log('width')
      // console.log(images.attrs.width)
      // let x = images.attrs.height > images.attrs.width
      // console.log('no trans')
      // console.log(x)
      // console.log('Num')
      // let y = Number(images.attrs.height) > Number(images.attrs.width)
      // console.log(y)
      // if (x=y) console.log('no problem, sir!') 
      // if (x != y) console.log('a problem, sir!') 
      // console.log()
      if (Number(images.attrs.height) > Number(images.attrs.width)) return true;
      // console.log(images.attrs)
      // console.log(x);
    },
    timelineProcessor(page) {
      // console.log(html);

      let splitter = page.html.split("<h1");
      // let frontMatter = splitter[1]
      this.page = {
        title: page.title,
        frontMatter: splitter[0],
        rest: splitter[1],
      };
      // console.log(this.page.rest)

      let timelineSplitter = this.page.rest.split("<h2");
      for (let i = 0; i < timelineSplitter.length; i++) {
        timelineSplitter[i] = "<h2" + timelineSplitter[i];
      }
      timelineSplitter = timelineSplitter.slice(1, timelineSplitter.length);
      this.page.rest = timelineSplitter;
      //then split by images or h2

      // let frontMatter = html.split("</p>");
      // for (let i = 1; i < excerpt.length; i++) {
      //   return excerpt[0];
      // }
    },
  },
};
</script>
