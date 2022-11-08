

<template lang="pug">
.w-100.canny-light
  div(v-if="page")
    .w-100.h4.canny-dark
      .w-80.center
        h1.pt4.f1.canny-logo-serif.font-canny-yellow.fw5 {{ this.page.title }}
    .w-100.center.canny-light
      //- sections begin
      .f2.font-canny-dark(v-for="items of sections")
        //- no h2 sub element content
        div(v-if="!items.flex")
          .w-100.canny-dark(v-if="items.header")
            .w-80.pv5.center
              h1.fw5.pt4.f1.section-banner {{ items.header }}
          .w-100.canny-light.pv5
            .w-80.center.tc.justify-center
              .f2.font-canny-dark.pt4.tl.w-70-l.w-100(
                v-for="stuff of items.rest",
                v-html="stuff"
              ) 
          .w-100.vh-50(
            :style="{ 'background-image': 'url(' + items.image + ')', 'background-size': 'cover', 'background-repeat': 'no-repeat', 'background-position': 'center top' }",
            v-if="items.image"
          )

    .w-100.canny-light
      .w-80.center.flex
        .w-40-l
        .w-60-l.w-100
          form.measure.w-100.fr(v-if="!submitted")
            fieldset.ba.b--transparent.ph0.mh0
              .mt3
                label.db.fw6.lh-copy.f3 Name
                input.pa2.input-reset.ba.bg-transparent.outline.w-100(
                  type="text",
                  name="name",
                  v-model="name"
                )
              .mt3
                .flex-l
                  .w-100.pr2-l
                    label.db.fw6.lh-copy.f3 Email address
                    input.pa2.input-reset.ba.bg-transparent.outline.w-100(
                      type="email",
                      name="email-address",
                      v-model="email"
                    )
                  .w-100.pl2-l
                    label.db.fw6.lh-copy.f3 Phone number
                    input.pa2.input-reset.ba.bg-transparent.outline.w-100(
                      type="tel",
                      name="phone",
                      v-model="phone"
                    )
              .mt3
                label.db.fw6.lh-copy.f3 Business name
                input.pa2.input-reset.ba.bg-transparent.outline.w-100(
                  type="text",
                  name="business-name",
                  v-model="business"
                )
              .mt3
                label.db.fw6.lh-copy.f3 What does your business do?
                textarea.pa2.input-reset.ba.bg-transparent.outline.w-100(
                  type="text",
                  name="business-type",
                  v-model="businessType"
                )
              .mt3
                label.db.fw6.lh-copy.f3 Address
                textarea.pa2.input-reset.h4.ba.bg-transparent.outline.w-100(
                  type="text",
                  name="address",
                  v-model="address"
                )
              .mt3
                label.db.fw6.lh-copy.f3 Anything else we should know?
                textarea.pa2.input-reset.ba.bg-transparent.outline.w-100(
                  type="text",
                  name="other",
                  v-model="other"
                )
              .mt3
                legend.db.fw6.lh-copy.f3 Preferred contact:
                div
                  input.mh3(
                    type="checkbox",
                    name="pref-email",
                    v-model="pref.email"
                  )
                  label.fw6.lh-copy.f3 Email
                div
                  input.mh3(
                    type="checkbox",
                    name="pref-phone",
                    v-model="pref.phone"
                  )
                  label.fw6.lh-copy.f3 Phone

              .mt4.tc.v-btm.f4.flex.center
                .w-100(@click="submit()", v-if="!submitted")
                  Button.pointer(primary="true", text="Submit")
</template>




<script>
export default {
  methods: {
    submit() {
      //submit to sendgrid?
      this.submitted = true;
    },
  },
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {
      await this.$store.dispatch("posts/fetchPages");
    } // console.log(this.$store.getters)
    let route;
    if (this.$route.path.startsWith("/")) {
      route = this.$route.path.substring(1, this.$route.path.length);
    }
    this.page = this.$store.getters["posts/getPageBySlug"](route);
    this.sections = this.pageProcessor(this.page.html, "h1");

    for (let i = 0; i < this.sections.length; i++) {
      if (this.sections[i].includes("h2")) {
        this.sections[i] = this.pageProcessor(this.sections[i], "h2");
        this.sections[i] = {
          header: this.elementExtractor(this.sections[i][0], "h1"),
          // header: this.sections[i][0],
          rest: this.sections[i].slice(1, this.sections[i].length),
          flex: true,
        };
        for (let j = 0; j < this.sections[i].rest.length; j++) {
          this.sections[i].rest[j] = this.elementExtractor(
            this.sections[i].rest[j],
            "h2"
          );
        }
      } else {
        let temp = this.elementExtractor(this.sections[i], "h1");

        this.sections[i] = {
          header: temp.title,
          rest: temp.text,
          image: temp.image,
          flex: false,
        };
        console.log(this.sections[i]);
      }
    }
    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }
  },
  data() {
    return {
      page: null,
      submitted: false,
      name: null,
      email: null,
      phone: null,
      business: null,
      businessType: null,
      address: null,
      other: null,
      pref: { email: false, phone: false },
    };
  },
};
</script>
