<template lang='pug'>
div
  div
    .flex-l
      .ph5-ns.pl3.vh-75-l.vh-50.dt.vh-25.w-40-l.w-70-m.w-90
        .dtc.v-mid
          p.f3.b The West End Children’s Community is on a mission to build connections across our community.
          p.f4 Because our children deserves futures where they can thrive.
          Button(url="/our-work", text="Find out more")
      .w-60-l.w-100
        .hero.vh-75-ns.vh-50
  


</template> 


<style lang='scss'>
.hero {
  background-image: url("~assets/home-hero.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right center;
}
.head {
  font-size: 4rem;
}

.sub {
  font-size: 3rem;
}

.f-4 {
  font-size: 4rem;
}
.herotext {
  position: absolute;
  top: 10vh;
}
.img-trio {
  max-height: 200px;
  max-width: 200px;
}

.container {
  margin: 0 auto;
  max-height: 90vh;
  justify-content: center;
  text-align: center;
}

.hero-logo {
  max-height: 40vh;
  padding-top: 10vh;
  padding-bottom: 10vh;
}

@media screen and (max-width: 1200px) {
  .hero-img {
    // height: 100vh;
    width: 100vw;
  }
}

@media screen and (min-width: 1201px) {
  .hero-img {
    height: 100vh;
  }
}

.post ::v-deep p {
  font-size: 16rem;
}

.header-image {
  // background-image: url(~/assets/header.png);
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-position: center top; */
}

.share {
  // background-image: url(~/assets/seigaiha.png);
  height: 100%;

  background-size: cover;
  background-repeat: no-repeat;
  /* background-position: center top; */
}

.featured-image {
  background-size: cover;
  background-repeat: no-repeat;
}
.post-trio {
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}

.hero-link {
  text-decoration: underline;
}

.short-box {
  width: 44vw;
}

.long-box {
  width: 88vw;
}

.btn:hover {
  cursor: pointer;
}

.read-more {
  text-decoration: none;
}
.read-more:hover {
  text-decoration: underline;
}

.swiper-pagination-bullet-active {
  background-color: $primary !important;
}
.swiper-pagination-bullet {
  opacity: 1;
  background-color: $secondary;
}

// .overlay {
//   	width: 100%;
//     opacity: 0.6;
//     // height: 400px;
//     background-image: #000000;
//     background-repeat:no-repeat;
//     background-blend-mode: multiply;
//     background-size: cover;
// }

@media screen and (min-width: 60em) {
  .measure-l {
    max-width: 50em;
  }
}
</style>

<script>
import dateformat from "dateformat";

import Post from "../components/Post.vue";
import Button from "../components/Button.vue";
import Footer from "../components/Footer.vue";

import Share from "../components/Share.vue";
import News from "../components/News.vue";

export default {
  components: { Post, Footer, Share, News, Button },

  async mounted() {
    if (this.$store.getters["settings/isMobile"]) {
      this.$store.dispatch("settings/fetchAnimation", false);
    }
    window.addEventListener("resize", () => {
      // this.checkAnimation();
    });
  },
  methods: {},
};
</script>