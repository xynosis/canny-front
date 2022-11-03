

<template lang="pug">
div
  nav.db.dt-ns.w-80.pt4.center.font-canny-dark
    //- to get rid of right align get rid of .tr and .tl-l 

    .db.dtc-ns.w-100.w-75-m.w-60-l.h-80.absolute-m.mt2.tr.dn-l.canny-header
      a.white(@click="mobileMenuHandler()") Menu

    .canny-header.db.dtc-l.w-100.w-75-m.w-60-l.h-80.tl-l.v-mid.static-l.mt5.mt0-l.absolute-m.tr(
      v-if="viewMenu"
    )
      .pt2.pt0-l.f5.f4-l.tr.tl-l
        .pr4-l.dib-l(v-for="items in nav")
          nuxt-link.white.dim.link(:to="items.url", :title="items.label") {{ items.label }}
        nuxt-link.dib-l(to="/cart")
          font-awesome-icon.dib.ph2.f4.font-canny-yellow(icon="shopping-cart")
          //- .white.link.f5.f4-l.dib.ph2 Cart ({{ getCart.items.length }})
          .white.link.f5.f4-l.dib.ph2 Cart (0)
        nuxt-link.dib-l(to="/account")
          font-awesome-icon.dib.ph2.f4.font-canny-yellow(icon="user")
          //- .white.link.f5.f4-l.dib.ph2 Cart ({{ getCart.items.length }})
          .white.link.f5.f4-l.dib.ph2 Account
    //- div.dtc-ns.tr.v-mid.dn-l.pr2.p0-l.link.w-100 

    nuxt-link.f2-l.f5-m.f2.dtc-ns.v-mid.link.w-100.w-20-ns(
      to="/",
      title="Home"
    ) 
      .font-canny-yellow.canny-logo-serif.tc.mb3 Canny Goat
      .white.canny-logo-script.tc Coffee.

  .canny-yellow.vh-100.w-100.z-999(v-if="mobileMenu && viewMenu") 
    //- header.z-max.w-100(
  //-   :style="$store.getters['settings/isMobile'] && viewMenu ? { height: '100vh', position: 'relative' } : ''"
  //- )
  //-   //- Click on the mobile menu

  //-   //- Nav bar
  //-   #navscroll.pointer.z-max.right-0.pr2.p0-ns.link.f3.tr.flex.pt3.pb2(
  //-     @click="openMenu()",
  //-     v-if="$store.getters['settings/isMobile']"
  //-   )
  //-     .pl3(:class="{ animate: viewMenu }")
  //-       #bar1.menu-bar.primary-bg
  //-       #bar2.menu-bar.primary-bg
  //-       #bar3.menu-bar.primary-bg
  //-     #header-item.pl3.pt2 Menu

  //-   #navscroll.tc
  //-     .header.link.dib.ph4-l(
  //-       v-if="viewMenu",
  //-       :class="{ pt5: $store.getters['settings/isMobile'] }"
  //-     )
  //-       a.bottom-center.pb4(href="/")
  //-         img(
  //-           src="~/assets/logo-hq.png",
  //-           v-if="$store.getters['settings/isMobile']"
  //-         )
  //-       //- #header-item.white.pointer.link.f4-l.f3.dib-ns.v-mid.pr3(
  //-       //-   v-if="!$store.getters['settings/isMobile'] && whiteLogo"
  //-       //- )
  //-         a.pb4(href="/")
  //-           //- img(src="~/assets/llarc-white.png", height="65")
  //-       #header-item.white.dt-s.pointer.ma3.ph3.pb2.link.f4-l.f3.dib-ns.v-mid(
  //-         v-if="!$store.getters['settings/isMobile']"
  //-       )
  //-         img(src="~/assets/logo-hq.png", height="120")
  //-       #header-item.dt-s.pointer.ma3.ph1.pb2.link.f4-l.f3(
  //-         :title="items.title",
  //-         v-for="items in nav",
  //-         @click="menuHandler(items.url)",
  //-         :key="items.id",
  //-         :class="{ dib: !$store.getters['settings/isMobile'] }"
  //-       ) {{ items.label }}
  //-       #header-item.dt-s.pointer.ma3.ph3.pb2.link.f4-l.f3.dib-ns.v-mid(
  //-         @click="menuHandler('https://twitter.com/NewcastleWecc')"
  //-       ) 
  //-         font-awesome-icon.f2(:icon="['fab', 'twitter']")    
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";

export default {
  // watch: {
  //   $route(to, from) {
  //     this.navCheck(to, from);
  // },
  // "$store.state.settings.mobile": function () {
  //   let x = this.$store.getters['settings/isMobile']
  //   console.log('as mobile is ' + x)
  //   this.setup();
  // },
  // },
  props: ["activeFontSize"],

  async mounted() {
    this.loadMenu();
    window.addEventListener("resize", () => {
      this.loadMenu();
      // this.setup();
    });
    // this.setup();
    this.navSpace = true;
    this.$emit("navSpace", true);
    await this.$store.dispatch("settings/fetchSettings").then(() => {
      this.nav = this.$store.getters["settings/getNav"];
    });
 
    // if (this.getCart === null) {
      //TRY TO RETRIEVE CART FIRST
    //   await this.$store.dispatch("shop/createCart");
    //   console.log(this.getCart)
    // }
    console.log(this.nav);
  },
  computed: {
    ...mapGetters("shop", ["getCart", "getOrder"]),
  },
  data() {
    return {
      nav: null,
      viewMenu: false,
      accessibility: false,
      navSpace: null,

      //if we go with white bar not blue
      // whiteLogo: null,
    };
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  methods: {
    setup() {
      let header = document.getElementById("navscroll");
      let join = document.getElementById("join");

      if (this.$route.name === "index") {
        this.navSpace = false;
        this.$emit("navSpace", false);

        // if (this.viewMenu) {
        //   join.classList.add("primary-bg");
        //   join.classList.add("secondary");
        // }
      } else {
        this.navSpace = true;
        this.$emit("navSpace", true);
        // header.classList.add("primary-bg");
        // if (this.viewMenu) {
        //   join.classList.add("secondary-bg");
        //   join.classList.add("primary");
        // }
      }

      if (!this.navSpace) {
        window.addEventListener("scroll", this.doOnScroll, { passive: true });
      } else {
        window.removeEventListener("scroll", this.doOnScroll);
      }
    },
    doOnScroll(event) {
      const scrollHeight = 50;
      let y = window.scrollY;
      // let text = document.querySelectorAll("#header-item");
      // let bars = document.querySelectorAll(".menu-bar");
      let header = document.getElementById("navscroll");
      let join = document.getElementById("join");

      // if (y > scrollHeight && !header.className.includes("bg-white")) {
      if (y > scrollHeight) {
        // header.classList.add("primary-bg");
        // if (this.viewMenu) {
        //   join.classList.remove("primary-bg");
        //   join.classList.add("secondary-bg");
        //   join.classList.add("primary");
        // }
        // join.child("secondary-bg");
        // for (let items of text) {
        //   items.classList.add("primary");
        //   items.classList.remove("white");
        // }
        // for (let items of bars) {
        // // items.classList.add("primary-bg");
        // items.classList.remove("bg-white");
        // }
      } else if (y < scrollHeight) {
        // this.whiteLogo = true;

        // header.classList.remove("primary-bg");

        if (this.viewMenu) {
          // join.classList.remove("secondary-bg");
          // join.classList.remove("primary");
          // join.classList.add("primary-bg");
        }
        // for (let items of text) {
        //   items.classList.remove("primary");
        //   items.classList.add("white");
        // }
        // for (let items of bars) {
        // items.classList.add("bg-white");
        // items.classList.remove("primary-bg");
        // }
      }
      setTimeout(() => {
        window.addEventListener("scroll", this.doOnScroll, { passive: true });
      }, 100);
    },
    navCheck(to, from) {
      if (to.name === "index") {
        this.navSpace = false;
        window.addEventListener("scroll", this.doOnScroll, { passive: true });
        this.$emit("navSpace", false);
      } else {
        this.navSpace = true;
        window.removeEventListener("scroll", this.doOnScroll);

        this.$emit("navSpace", true);
      }
      let header = document.getElementById("navscroll");

      let join = document.getElementById("join");

      // if (this.navSpace) {
      // this.whiteLogo = false;
      // header.classList.add("primary-bg");
      // if (this.viewMenu) {
      // join.classList.remove("primary-bg");
      // join.classList.add("secondary-bg");
      // join.classList.add("primary");
      // }
      // } else {
      // this.whiteLogo = true;

      // header.classList.remove("primary-bg");
      // if (this.viewMenu) {
      //   join.classList.remove("secondary-bg");
      //   join.classList.remove("primary");
      //   join.classList.add("primary-bg");
      // }
      // }
    },

    // onClickOutside() {
    //   this.accessibility = false;
    // },
    menuHandler(url) {
      // :to='{path: items.url}'
      console.log(url);
      if (url.startsWith("http")) {
        window.location = url;
      } else {
        this.$router.push({ path: url });
      }
      if (this.viewMenu && this.$store.getters["settings/isMobile"]) {
        this.viewMenu = false;
      }
    },
    openMenu() {
      this.viewMenu = !this.viewMenu;
      this.navSpace = false;

      this.$emit("navSpace", false);
    },
    loadMenu() {
      this.$store.dispatch("settings/fetchWindowWidth", window.innerWidth);
      if (this.$store.getters["settings/getWindowWidth"] < 1205) {
        if (this.viewMenu && this.$store.getters["settings/isMobile"]) {
          this.viewMenu = false;
        }
        this.$store.dispatch("settings/changeMobileState", true);
      } else if (this.$store.getters["settings/getWindowWidth"] >= 1205) {
        this.$store.dispatch("settings/changeMobileState", false);
        this.viewMenu = true;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.left-100 {
  right: 0%;
}

.animate #bar1 {
  -webkit-transform: rotate(-45deg) translate(-8px, 8px);
  transform: rotate(-45deg) translate(-8px, 8px);
}
.animate #bar2 {
  opacity: 0;
}
.animate #bar3 {
  -webkit-transform: rotate(45deg) translate(-8px, -8px);
  transform: rotate(45deg) translate(-8px, -8px);
}
.menu-bar {
  width: 35px;
  height: 5px;

  margin: 6px 0;
  border-radius: 4px;
  transition: 0.4s;
}
.mobile-box {
  background-color: #1d1d1b;
  color: #fff;
  height: 100vh;
}

.logo {
  width: 10vw;
}

#header-item:hover {
  // color: $secondary;
  text-decoration: underline;
  // font-weight:   800;
}
#header-item {
  text-decoration: none;
  font-weight: 500;
}

.bottom-center {
  position: absolute;
  left: 50%;
  bottom: 0px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
</style>
