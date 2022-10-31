<template lang="pug">
.pb5
  Nav
  article.dt.w-100.pv6(v-if="post")
    div(v-if="post.feature_image")
      h1.center-l.f2.f1-l.tl.pl3.ph0-l.mw8-l
        span {{ post.title }}
      .vh-75-ns.vh-25.w-100.cover(
        v-if="!iframe",
        :style="{ 'background-image': 'url(' + post.feature_image + ')', 'background-repeat': 'no-repeat', 'background-position': 'center' }"
      )
      iframe.w-100(
        v-if="iframe",
        :src="iframe.link",
        :class="{ 'vh-100': !iframe.mixcloud }"
      ) 
        //- p.fw1.black(v-html='post.excerpt')

    div(v-if="!post.feature_image")
      h1.center-l.f2.f1-l.mw8-l.tl.pl3.ph0-l
        span {{ post.title }}

      //- .center.primary-bg.vh-75-ns.vh-25.w-100.cover(v-if="!iframe")
      iframe.w-100(
        v-if="iframe",
        :src="iframe.link",
        :class="{ 'vh-100': !iframe.mixcloud }"
      ) 

    .pv3
      //- h1.f1.lh-title {{ post.title}}
      //- CONTAINER
      .center.content.f5.f3-ns.lh-copy.mw-none.mw8-l
        header.black-70
          //- TITLE
            //-   h2.f5.fw6.ttu.tracked.mb2.lh-title.tc |
            //-     //- TAGS
            //-     span(v-for='tag in post.tags')  {{tag.name}} |
          //- DATE
          h3.f4-ns.f5.pr3.lh-title.tr {{ date }}
        //- POST CONTENT
        .ph4.ph0-l.f4-ns
          //-add a button here to listen to shows

          .ht(v-html="html")
        //-   div(v-if='pdfs' v-for="items in pdfs")
          iframe(:src='items.link')
      //- div.center.pv4#pdf-1(style="max-width: 1000px; height: 700px")
      //- div.center.pv4#pdf-2(style="max-width: 1000px; height: 700px")

    //- div.ml-auto.mw7.tc-m
    //-   div.tj.mt4.pa4-ns.ph4.pb5
    //-       div.page.fw1.f3.black-90.mt3.mb4.f3-ns.f4(v-html='post.html' v-if='post')
  Footer
</template>

<script>
import dateformat from "dateformat";
import Nav from "../components/Nav";
import JSSoup from "jssoup";

export default {
  data() {
    return {
      post: null,
      date: null,
      iframe: null,
      html: null,
      // activeFontSize: 16,
    };
  },

  async mounted() {
    // await this.$store.dispatch('settings/fetchColors')

    await this.$store.dispatch("posts/fetchPosts").then(() => {
      //   this.post = this.$store.getters['posts/getPostBySlug']()
      this.post = this.$store.getters["posts/getPostBySlug"](
        this.$route.params.slug
      );
    });

    let now = new Date(this.post.published_at);
    this.date = dateformat(now, "mmmm dS, yyyy");
    this.html = this.post.html;

    this.detectiFrame(this.post.html);
    this.detectTwitter(this.post.html);
  },
  watch: {},

  computed: {
    fontSize() {
      return {
        "--body-size": this.activeFontSize + "px",
        "--h1-size": this.activeFontSize * 2 + "px",
        "--h2-size": this.activeFontSize * 1.5 + "px",
        "--h3-size": this.activeFontSize * 1.25 + "px",
      };
    },
  },
  methods: {
    // color() {
    //   return this.$store.getters['settings/getRandomColor'](Math.random())
    // },
    //      previewPDF(pdf, adobeDCView) {
    //       this.pdfSelected = true;
    //       let viewer = adobeDCView;

    //       viewer.previewFile({
    //      content:{location: { url: pdf.link}},
    //      metaData:{fileName:  this.post.title + pdf.number + ".pdf"}
    //  }, {embedMode: "SIZED_CONTAINER"});

    // },
    //  detectPDF(html) {

    // let soup = new JSSoup(html)
    // let links = soup.findAll('a')
    // let pdfs = []
    // let i = 1;
    // for (let items of links){
    //   if (items.attrs.href.endsWith('.pdf')){
    //     console.log(items)
    //     let obj = {
    //       link: items.attrs.href,
    //       number: i
    //     }
    //     pdfs.push(obj)
    //     i++;
    //   }
    // }
    // return pdfs;
    // }
    stripiFrameFromHTML(html) {
      let formatted = html.split("</iframe>");
      return formatted[1];
    },
    detectTwitter(html) {
      let soup = new JSSoup(html);
      let embed = soup.findAll("figure");
      let flag = false;

      for (let items of embed){
        if (items.contents[0].attrs.class=== 'twitter-tweet'){
          flag = true
        } 
      }
      if (flag){
        let script = document.createElement("script");
        script.setAttribute("src", "https://platform.twitter.com/widgets.js");
        document.head.appendChild(script);
      }
    },
    detectiFrame(html) {
      let soup = new JSSoup(html);
      let links = soup.findAll("iframe");
      let iframes = [];
      let i = 1;

      if (links.length > 0) {
        for (let items of links) {
          let obj;
          if (items.attrs.src.includes("mixcloud")) {
            obj = {
              link: items.attrs.src,
              number: i,
              mixcloud: true,
            };
          } else {
            obj = {
              link: items.attrs.src,
              number: i,
              mixcloud: false,
            };
          }
          iframes.push(obj);
          i++;
        }
        console.log(iframes);
        this.iframe = iframes[0];
        this.html = this.stripiFrameFromHTML(this.post.html);
      }
    },
  },
  components: { Nav },
};
</script>

<style lang='scss' scoped>
.ht ::v-deep p {
  font-size: 1.4rem;
}
html {
  font-family: $body-font;
  background-color: #d3e2ee;
  font-size: 16px;
  word-spacing: 1px;
}
p,
span,
div {
  // font-size: (var(--body-size)) + "px";
  color: $primary;
  font-size: var(--body-size);
}

article {
  background-color: white !important;
}
.content >>> img {
  padding-top: 10px;
  padding-bottom: 10px;
}
.content >>> h1,
.content >>> h2,
.content >>> p {
  padding-top: 15px;
}

.content >>> a {
  color: $primary;
  text-decoration: none;
  font-weight: 900;
}

.content >>> a:hover {
  text-decoration: underline;
}

.content ::v-deep .kg-card {
  margin: auto;
  width: 50%;
}

.content >>> figure {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}

.content >>> iframe {
  border: 0px solid #ffffff;

  padding-top: 20px;
  width: 100%;
  height: 100vh;
}

div ::v-deep iframe {
  border: none;
}
</style>
