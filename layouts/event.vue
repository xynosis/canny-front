<template lang="pug">
div
  Nav(
    @changeFontSize="activeFontSize = activeFontSize + $event",
    :activeFontSize="activeFontSize"
  )
  article.w-100.pv6(v-if="post")
    .pv3(:class="{ ph3: $store.getters['settings/isMobile'] }")
      .center.content.f5.f3-ns.lh-copy.mw-none.mw8-l
        h1.center.f2 {{ post.title }}
    div(v-if="post.feature_image")
      .vh-75-ns.vh-25.w-100.cover(:style="{ 'background-image': 'url(' + post.feature_image + ')', 'background-repeat': 'no-repeat', 'background-position': 'center' }")
    .pv3.center.content.f5.f3-ns.lh-copy.mw-none.mw8-l(:class="{ ph3: $store.getters['settings/isMobile'] }")
        //- p.fw1.black(v-html='post.excerpt')
        header.black-70
          h3.f3.pr3.lh-title.tr {{ date }}
          h3.f3.pr3.lh-title.tr {{ time }}
        .f4
          div(v-html="html")
    
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
      time: null,
      html: null,
      activeFontSize: 16,
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

    let now = new Date(this.post.excerpt);
    this.date = dateformat(now, "mmmm dS, yyyy");
    this.time = dateformat(now, "HH:MM");
    this.html = this.post.html;
    this.detectiFrame(this.post.html);
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
    detectiFrame(html) {
      let soup = new JSSoup(html);
      let links = soup.findAll("iframe");
      let iframes = [];
      let i = 1;

      if (links.length > 0) {
        for (let items of links) {
          let obj = {
            link: items.attrs.src,
            number: i,
          };
          iframes.push(obj);
          i++;
        }
        this.iframe = iframes[0];
        this.html = this.stripiFrameFromHTML(this.post.html);
      }
    },
  },
  components: { Nav },
};
</script>

<style lang='scss' scoped>
article {
  background-color: white;
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

.minvh {
  min-height: 70vh;
}
</style>
