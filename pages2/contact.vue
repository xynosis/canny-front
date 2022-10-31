<template lang="pug">
.w-100.pb5
  div.pt5(v-if="page")
    div.w-60-l.w-100.center(:class="{ph4: $store.getters['settings/isMobile'] }" )
      h1.tl {{page.title}}
      .lh-copy(v-if='page' v-html='page.html')
      .tc.w-100.flex.center
        a.ma3.ph3.f4-l.f3.link.dib.ma3.ph4-l.btn.fw5.pv3.primary-bg.w-50.tc.pointer(href='mailto:llarcooperative@gmail.com') Email us
        a.ma3.ph3.f4-l.f3.link.dib.ma3.ph4-l.btn.fw5.pv3.secondary-bg.primary.w-50.tc.pointer(href="https://twitter.com/LLARCoop" target="_blank") Follow us on Twitter
  
   
  .justify-center.items-center.flex(v-if='error' :header='page.title')
    p.lh-copy(v-if='error') Looks like the page you are looking for isn't here!
</template>



<style lang='scss' scoped>

div ::v-deep img {
  width: 100%;
  height: auto;
  text-align: center;
}

div ::v-deep h2, div ::v-deep img{
  padding-top: 5vh;
  padding-bottom: 5vh;
}

div ::v-deep h2 {
  font-size: 48px;
  font-weight: 900 !important;
  color: $primary;
}

div ::v-deep p{
  font-size: 1.5rem;
  text-align: left;
}


.container {
  margin: 0 auto;
  min-height: 80vh;
  justify-content: center;
  text-align: center;
}
.logo{
  width: 60vw;
}

</style>

<script>
export default {
  data(){
    return {
      page: null,
      error: false
    }
  }, async mounted(){
    if (this.$store.getters['posts/getAllPages'] === null) {
      console.log(this.$route.name)
      await this.$store.dispatch('posts/fetchPages')
    } // console.log(this.$store.getters)
    this.page = this.$store.getters['posts/getPageBySlug']('contact')
    if (this.page == null) {
      
      this.page = {
        title: 'Oops!'
      } 
      this.error = true
    }
    
  },
}
</script>
