<template lang="pug">
article.ph4.mb4
  .aspect-ratio.post.relative(:class="{'aspect-ratio--7x5': !mixcloud}")
    //- feature img
    .tr.right-0.absolute.z-999.pr3(v-if="post.feature_image && tags")
      //-tags
      a.tags(:href="'/tags/' + items.slug", v-for="items of post.tags")
        p.bg-white.black.w-100.ph3.pv2(v-if="tags") {{ items.name }}
    //- either cover or contain, contain works well on home, cover works well on post pages
    //- a.link(:href="path + post.slug")
    nuxt-link.link(:to="{ path: path + post.slug }")
      .db.bg-center.cover.aspect-ratio--object(
        v-if="post.feature_image && !mixcloud",
        :style="{ 'background-image': 'url(' + post.feature_image + ')', 'background-repeat': 'no-repeat', 'background-position': 'center' }"
      )
        iframe.iframe.w-100(v-if="iframe", :src="iframe.link")
      .db.verty.w-100.z-999.flex.justify-center.items-center(
        v-if="post.feature_image && mixcloud"
      )
        iframe.mixcloud(:src="mixcloud.link") 
          //- no feature img
    .tc.right-0.absolute.z-999.pr3(v-if="!post.feature_image")
      //-tags
      a.tags(:href="'/tags/' + items.slug", v-for="items of post.tags")
        p.bg-white.black.w-100.ph3.pv2(v-if="tags") {{ items.name }}
    //- a.link(:href="path + post.slug")
    nuxt-link.link(:to="{ path: path + post.slug }")
      .primary-bg.db.bg-center.aspect-ratio--object(
        v-if="!post.feature_image && !mixcloud"
      )
        //-iframe
        iframe.iframe.w-100(v-if="iframe", :src="iframe.link") 
      .z-max.db.flex.align-center(v-if="!post.feature_image")
        iframe.mixcloud.w-100(v-if="mixcloud", :src="mixcloud.link") 
        //-post
  //- a.link(:href="path + post.slug")
  nuxt-link.link(:to="{ path: path + post.slug }")
    .ph2.ph0-ns.pb3.link
      h2.f3.mb0.fw5(:class="{ white: white }") {{ post.title }}
        //- p.lh-copy.fw4.mt2(v-html="excerpt(html)", v-if="html")
        p.tl.f4.fw4.underline(:class="{ white: white }") Read more
  
</template>

<script>
import dateformat from "dateformat";
import JSSoup from "jssoup";

export default {
  props: ["post", "path", "link", "tags", "showDate", "white"],
  methods: {
    getPostDate(post) {
      return dateformat(post.published_at, "mmmm dS, yyyy");
    },
    extractLink(html) {
      let soup = new JSSoup(html);
      let links = soup.findAll("a");
      if (links.length === 0) {
        return false;
      } else {
        let link = {
          url: links[0].attrs.href,
          text: "Listen",
        };
        return link;
      }
    },
    stripLinkFromHTML(html) {
      //   let soup = new JSSoup(html);
      let link = this.extractLink(html);
      let formatted = html.split(link.url);
      return formatted[2];
      //   return x;
    },
    excerpt(post) {
      console.log(post);
      let excerpt = post.split("</p>");
      let wordArr = [];
      if (excerpt[0].endsWith("</a>")) {
        wordArr = excerpt[1].split(" ", 50);
      } else {
        wordArr = excerpt[0].split(" ", 50);
      }
      return wordArr.join(" ") + "...";

      // return post.excerpt
    },
    detectiFrame(html) {
      let soup = new JSSoup(html);
      let links = soup.findAll("iframe");
      let mixcloud = [];
      let iframes = [];
      let i = 1;

      if (links.length > 0) {
        for (let items of links) {
          if (items.attrs.src.includes("mixcloud")) {
            let obj = {
              link: items.attrs.src,
              number: i,
            };
            mixcloud.push(obj);
          } else {
            let obj = {
              link: items.attrs.src,
              number: i,
            };
            iframes.push(obj);
          }
          i++;
        }

        if (iframes[0]) this.iframe = iframes[0];
        if (mixcloud[0]) this.mixcloud = mixcloud[0];
        this.html = this.stripiFrameFromHTML(this.post.html);
      } else {
        this.html = this.post.html;
      }
    },
    stripiFrameFromHTML(html) {
      let formatted = html.split("</iframe>");

      return formatted[1];
    },
  },
  mounted() {
    this.cta = this.extractLink(this.post.html);

    console.log(this.post);
    this.detectiFrame(this.post.html);
  },
  data() {
    return {
      cta: null,
      iframe: null,
      html: null,
      mixcloud: null,
    };
  },
};
</script>

<style lang='scss' scoped>
.verty {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.post-image {
  max-width: 40vw;
}

.tags{
  text-decoration: none ;
}
.tags:hover{
  text-decoration: underline ;
}

.mixcloud {
  height: 30vh;
}

.iframe {
  height: 100%;
}

iframe {
  // height: 0%;
  width: 100%;

  // padding-bottom: 71.42%;
  // width: 800px;
}

div ::v-deep iframe {
  border: none;
}
article:hover {
  background-color: $secondary;
  h2,
  p {
    color: $primary;
  }
  /* border: 1px solid black; */
}

.post {
  min-height: 30vh;
}
</style>