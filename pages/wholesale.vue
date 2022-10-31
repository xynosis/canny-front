<template lang="pug">
div(v-if='page')
    .w-80.center.h4.canny-dark
        h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 Wholesale
    .w-100.canny-light
        .w-80.tc.center
            .f2.font-canny-dark.pv5.ph4(v-html='page.html')
    //- img.lh-0
    //- .w-100.canny-dark
    //-     .w-80.h4.pv5.center
    //-         .f1.font-canny-yellow.canny-logo-serif HEADING
        
    //- img.lh-0(src='~/assets/images/canny-1.jpg')
    //- .w-100.canny-dark
    .w-100.canny-light
        .w-80.center
            .w-60.lh-copy.f3.font-canny-dark.pv5.ph4 If you’re interested in stocking Canny Goat Coffee, fill out our form below and we’ll get back to you with next steps.
        .w-80.center.flex
            .w-40 
                div
            .w-60
                .black-80.flex
                
                    .measure.ph4.w-100
                        label.f6.b.db.mb2(for='name')
                        | Name 
                        input.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='name-desc')
                    .measure.ph4.w-100
                        label.f6.b.db.mb2(for='surname')
                        | Surname 
                        input.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='surname-desc')
                .black-80.flex
                    .measure.ph4.w-100
                        label.f6.b.db.mb2(for='email')
                        | Email address 
                        input.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='email-desc')
                    .measure.ph4.w-100
                        label.f6.b.db.mb2(for='phone')
                        | Phone number
                        input.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='phone-desc')
                .black-80
                    .ph4.w-100
                        label.f6.b.db.mb2(for='business-type')
                        | Business type
                        input.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='business-type-desc')
                .black-80
                    .ph4.w-100
                        label.f6.b.db.mb2(for='business-name')
                        | Business name
                        input.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='business-name-desc')
                .black-80
                    .ph4.w-100
                        label.f6.b.db.mb2(for='address')
                        | Address
                        input.h4.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='address-desc')
                .black-80
                    .ph4.w-100
                        label.f6.b.db.mb2(for='other')
                        | Any other info we need to know?
                        input.h3.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='other-desc')

                .black-80
                    .ph4.w-100
                        fieldset#favorite_movies.bn
                            legend Preferred contact:
                            .flex.items-center.mb2
                                input.mh2(type='checkbox' value='email')
                                label.lh-copy(for='email') Email
                                input.mh2(type='checkbox' value='phone')
                                label.lh-copy(for='phone') Phone
                .tr
                    a.ttu.fw6.f3.font-canny-dark.link.br3.ph3.pv2.mb2.dib.white.canny-yellow.mh3(href='#') Send
                //- .black-80
                //-     .ph4.w-100
                //-         label.f6.b.db.mb2(for='template-type')
                //-         | This is a template
                //-         //- span.normal.black-60 (optional)
                //-         input#name.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type='text' aria-describedby='template-desc')
                //-         small#name-desc.f6.black-60.db.mb2 Explainer text


</template>




<script>
export default {
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {
      await this.$store.dispatch("posts/fetchPages");
    } // console.log(this.$store.getters)
    let route;
    if (this.$route.path.startsWith("/")) {
      route = this.$route.path.substring(1, this.$route.path.length);
    }
    this.page = this.$store.getters["posts/getPageBySlug"](route);

    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }

  },
  data() {
    return {
      page: null
    };
  },
};
</script>
