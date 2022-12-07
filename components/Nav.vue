

<template lang="pug">
header.z-max.w-100(
  :style="$store.getters['settings/isMobile'] && viewMenu ? { height: '100vh', position: 'relative' } : ''"
)
  nav.dt.ph4.font-canny-dark.pv3.center
    //- to get rid of right align get rid of .tr and .tl-l 

    .dtc.tr.canny-header.v-mid(v-if="$store.getters['settings/isMobile']")
      .pointer.z-max.pr2.link.f3.tr.flex(@click="openMenu()")
        div(:class="{ animate: viewMenu }")
          #bar1.menu-bar.canny-yellow
          #bar2.menu-bar.canny-yellow
          #bar3.menu-bar.canny-yellow
        #header-item.pl3.pt2.canny-logo-serif.white Menu

    //- desktop nav
    .canny-header.db.dtc-l.tl-l.v-mid.static-l.mt5.mt0-l.tr.pl4(
      v-if="viewMenu && !$store.getters['settings/isMobile']"
    )
      .pt2.pt0-l.f2.f4-l.tr.tl-l
        .pr4-l.dib-l.pv4(v-for="items in nav")
          nuxt-link.white.dim.link(:to="items.url", :title="items.label") {{ items.label }}
        nuxt-link.dib-l.pv4(to="/cart")
          font-awesome-icon.dib.ph2.f4-l.f2.font-canny-yellow(
            icon="shopping-cart"
          )
          .white.link.f5.f4-l.dib.ph2(v-if="getCart") Cart ({{ getCart.items.length }})
          //- .white.link.f2.f4-l.dib.ph2.dim Cart (0)
        nuxt-link.dib-l(to="/account/orders", v-if="getUser !== null")
          font-awesome-icon.dib.ph2.f4-l.f2.font-canny-yellow(icon="user")
          .white.link.f2.f4-l.dib.ph2.dim Account
        nuxt-link.dib-l(to="/account", v-if="getUser === null")
          font-awesome-icon.dib.ph2.f4-l.f2.font-canny-yellow(icon="user")
          .white.link.f2.f4-l.dib.ph2.dim Log in
          //- log in if not logged in

    nuxt-link.f3-l.f3.v-mid.dtc-ns.link.w-100.pl2(
      to="/",
      title="Home",
      :class="{ 'w-100': !$store.getters['settings/isMobile'], 'w-30-l': !$store.getters['settings/isMobile'] }"
    ) 
      .fr
        .font-canny-yellow.canny-logo-serif.tc.mb2 Canny Goat
        .white.canny-logo-script.tc Coffee.
  //- mobile nav
  .tc.canny-header.white.center(
    v-if="$store.getters['settings/isMobile']",
    :class="{ tl: !$store.getters['settings/isMobile'] }"
  )
    .header.link.dib.ph4-l(v-if="viewMenu")
      .dib-l.dt-s.pointer.ma3.ph1.pb2.link.f4-l.f3.fw6.dim(
        :title="items.title",
        v-for="items in nav",
        @click="menuHandler(items.url)",
        :key="items.id"
      ) {{ items.label }}
      //- a.bottom-center.pb4(href="/")
        //- img(
        //-   src="~/assets/logo.png",
        //-   v-if="$store.getters['settings/isMobile']"
        //- )

      .dib-l.pointer.ma3.pb2(@click="menuHandler('/cart')")
        font-awesome-icon.dib.ph2.f4-l.f3.font-canny-yellow(
          icon="shopping-cart"
        )
        .white.link.f3.f4-l.dib.ph2.dim Cart ({{ getCart.items.length }})
        //- .white.link.f3.f4-l.dib.ph2 Cart (0)
      .dib-l.pointer.ma3.pb2(
        @click="menuHandler('/account/orders')",
        v-if="getUser !== null"
      )
        font-awesome-icon.dib.ph2.f4-l.f3.font-canny-yellow(icon="user")
        .white.link.f3.f4-l.dib.ph2.dim Account
      .dib-l.pointer.ma3.pb2(@click="menuHandler('/account')", v-if="getUser === null")
        font-awesome-icon.dib.ph2.f4-l.f3.font-canny-yellow(icon="user")
        .white.link.f3.f4-l.dib.ph2.dim Log in
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters } from "vuex";

export default {
  async mounted() {
    this.loadMenu();
    await this.$store.dispatch("shop/getSession");
    window.addEventListener("resize", () => {
      this.loadMenu();
    });
    await this.$store.dispatch("settings/fetchSettings").then(() => {
      this.nav = this.$store.getters["settings/getNav"];
      // this.nav = this.getNav;
    });

    this.cartInit();
  },
  computed: {
    ...mapGetters("shop", ["getCart", "getOrder", "getUser"], "settings", [
      "getNav",
    ]),
  },
  data() {
    return {
      nav: null,
      viewMenu: false,
    };
  },

  directives: {
    clickOutside: vClickOutside.directive,
  },

  methods: {
    // onClickOutside() {
    //   this.accessibility = false;
    // },
    menuHandler(url) {
      // :to='{path: items.url}'
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
