<template lang="pug">
.w-100.ph4.pb5
  .w-60-l.items-center.justify-center.align-center.center.pt5(v-if="page")
    form#mc-embedded-subscribe-form(action='https://twitter.us19.list-manage.com/subscribe/post?u=cb0908bc898603531b06908bf&id=658dc3da10' method='post' name='mc-embedded-subscribe-form' target='_blank' novalidate='')
      .flex
        h1.tl.w-50 {{joinSub}}
        h1.f4.w-50.tr.pointer(v-if='newsletter || join' @click='newsletter= false; join = false; joinSub = "Join us"') 
          .ph3.f4-l.f3.link.dib.ph4-l.btn.fw5.pv3.primary.w-40.tc < Back
      //- form
      div(v-if='!newsletter && !join')
        p.lh-copy The Later Life Audio and Radio Cooperative (LLARC) is an award-winning and growing network of older radio show hosts, age-friendly radio stations, voluntary and community sector organisations and academic researchers working on age-related issues. We advocate for greater representation of older people in public debates.
        p.lh-copy We are always looking for new members, but if you're not ready for that yet, you can subscribe to our newsletter below, too.
        .tc.w-100
          .ma3.ph3.f4-l.f3.link.dib.ma3.ph4-l.btn.fw5.pv3.primary-bg.w-50.tc.pointer(@click='join= true; joinSub = "Join us"') Join LLARC
          .ma3.ph3.f4-l.f3.link.dib.ma3.ph4-l.btn.fw5.pv3.secondary-bg.primary.w-50.tc.pointer(@click='newsletter= true; joinSub = "Subscribe"') Subscribe to our newsletter


      div(v-if='newsletter')
        
        .flex
            .pr4
             
              .pr3.mc-field-group
                label.f6.db.mb2.tl(for="mce-EMAIL") Email address
                input#mce-EMAIL.required.email.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                  type='email' value='' name='EMAIL'
                  aria-describedby="name-desc"
                )
              
              .flex#mc_embed_signup_scroll
                .measure.pr4.mc-field-group
                  label.f6.db.mb2.tl(for="mce-FNAME") Name
                  input#mce-FNAME.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type="text" value='' name="FNAME")
                .measure.pl4.mc-field-group
                  label.f6.db.mb2.tl(for="mce-LNAME") Surname
                  input#mce-LNAME.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                    type="text" value='' name="LNAME"
                    aria-describedby="name-desc"
                  )
              div
                .measure.mc-field-group
                  label.f6.db.mb2.tl(for="mce-PNAME") Preferred name
                  small#name-desc.f4.black-60.db.mb2.tl The name you would like to be known by
                  input#mce-PNAME.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                    type="text" value='' name="PNAME"
                    aria-describedby="name-desc"
                  )
              #mce-responses.clear.foot
                #mce-error-response.response(style='display:none')
                #mce-success-response.response(style='display:none')
              div(style='position: absolute; left: -5000px;' aria-hidden='true')
                input(type='text' name='b_cb0908bc898603531b06908bf_658dc3da10' tabindex='-1' value='')
              input#mc-embedded-subscribe(type='submit' value='Subscribe to our newsletter' name='subscribe').mt4.ph3.f4-l.f3.link.dib.ph4-l.primary-bg.btn.fw5.pv3.pointer.bw0



      div(v-if='join')
        div
          .pr4
            h2.tl About you
            
            .flex#mc_embed_signup_scroll
              .measure.pr4.mc-field-group
                label.f6.db.mb2.tl(for="mce-FNAME") Name
                input#mce-FNAME.input-reset.ba.b--black-20.pa2.mb2.db.w-100(type="text" value='' name="FNAME")
              .measure.pl4.mc-field-group
                label.f6.db.mb2.tl(for="mce-LNAME") Surname
                input#mce-LNAME.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                  type="text" value='' name="LNAME"
                  aria-describedby="name-desc"
                )
            div
              .measure.mc-field-group
                label.f6.db.mb2.tl(for="mce-PNAME") Preferred name
                small#name-desc.f4.black-60.db.mb2.tl The name you would like to be known by
                input#mce-PNAME.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                  type="text" value='' name="PNAME"
                  aria-describedby="name-desc"
                )

            //- in the middle
            h2.tl Demographic details
            div
              .measure.mc-field-group
                label.f6.db.mb2.tl(for="mce-YEAR") Year of birth
                small#name-desc.f4.black-60.db.mb2.tl We'd love to know more about our members, so we're asking for your age so we can make sure we stay relevant to our membership.
                input#mce-YEAR.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                  type="text" value='' name="YEAR"
                  aria-describedby="name-desc"
                )
              .measure.mc-field-group
                label.f6.db.mb2.tl(for="mce-TOWN") Town / city
                small#name-desc.f4.black-60.db.mb2.tl The town / city that you live in or spend most of your time in
                input#mce-TOWN.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                  type="text" value='' name="TOWN"
                  aria-describedby="name-desc"
                )
              .measure.mc-field-group
                label.f6.db.mb2.tl(for="mce-ORG") Organisation
                small#name-desc.f4.black-60.db.mb2.tl Are you affiliated with an organisation that you would like to let us know about?
                input#mce-ORG.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                  type="text", value='' name="ORG"
                  aria-describedby="name-desc"
                )
        div
          div
            h2.tl Contact details
            .flex
              .pr3.mc-field-group
                label.f6.db.mb2.tl(for="mce-EMAIL") Email address
                input#mce-EMAIL.required.email.input-reset.ba.b--black-20.pa2.mb2.db.w-100(
                  type='email' value='' name='EMAIL'
                  aria-describedby="name-desc"
                )
    
          div
            h2.tl Circle membership
            div.mc-field-group.input-group
              p.lh-copy LLARC is a sociocratic cooperative, meaning that we work in circles that make autonomous decisions. As a new member, you may join any circle besides the General Circle. Would you like to become a member of any of the following circles? 
              .tc.mb4
                .ph3.-center.f4-l.f3.link.dib.ph4-l.btn.fw5.pv3.w-40.tc.pointer(@click='aboutCircles=!aboutCircles' :class="aboutCircles ? 'secondary-bg primary' : 'primary-bg secondary'") {{!aboutCircles ? "Find out more about our circles" : "Close"}}
              div(v-if='aboutCircles')
                h1 General circle
                p.pb4.lh-copy The LLARC general circle is the connection point between all circles. We share updates and discuss our overarching strategy.
                h1 Finance and Funding circle
                p.pb4.lh-copy The finance and funding circle is responsible for managing LLARC’s budget, applying for new funding and discussing all finance-related matters.
                h1 Membership and Governance circle
                p.pb4.lh-copy This circle manages our governance and supports the administration process for admitting new members into the coop.
                h1 Branding and Marketing circle
                p.pb4.lh-copy This circle works on LLARC’s outreach and promotion. We manage LLARC’s social media, recruit new members and engage with LLARC’s public engagement.
                h1 Production circle
                p.pb4.lh-copy The production circle steers on the production of new LLARC content. This is where we plan new series, connect the radio stations, work on joint radio projects and manage the Mixcloud.
                h1 Teaching and Learning circle
                p.pb4.lh-copy This is a very new circle. Here we are working on all things related to skill-sharing, so that our members can learn in a collaborative environment. We also put on educational events.
              .tl.pb3
                input.mr2(type='checkbox' value='2' name='group[78992][2]' id='mce-group[78992]-78992-1')
                label.relative.hide-child(for='mce-group[78992]-78992-1') Finance and Funding circle
               
                
                    
              .tl.pb3
                input.mr2(type='checkbox' value='4' name='group[78992][4]' id='mce-group[78992]-78992-2')
                label.relative.hide-child(for='mce-group[78992]-78992-2') Membership and Governance circle
                
              .tl.pb3
                input.mr2(type='checkbox' value='8' name='group[78992][8]' id='mce-group[78992]-78992-3')
                label.relative.hide-child(for='mce-group[78992]-78992-3') Branding and Marketing circle 
                 
              .tl.pb3
                input.mr2(type='checkbox' value='16' name='group[78992][16]' id='mce-group[78992]-78992-4')
                label.relative.hide-child(for='mce-group[78992]-78992-4') Production circle 
                 
              .tl.pb3
                input.mr2(type='checkbox' value='32' name='group[78992][32]' id='mce-group[78992]-78992-5')
                label.relative.hide-child(for='mce-group[78992]-78992-5') Teaching and Learning circle
                 
        .pt3
          h2.tl Governance documents
          .pt3
            input.mr2(type="checkbox" id='consent')
            label(for='consent') I agree to abide by the <a href='http://138.68.177.39/content/images/uploads/LLARC_Governance.pdf'>governance documents</a>
          p Once you click 'join', your request will be sent to our Membership and Governance circle, who will be in contact with you to confirm your membership. Clicking 'join' does not commit you to joining the cooperative.

        #mce-responses.clear.foot
          #mce-error-response.response(style='display:none')
          #mce-success-response.response(style='display:none')
        div(style='position: absolute; left: -5000px;' aria-hidden='true')
          input(type='text' name='b_cb0908bc898603531b06908bf_658dc3da10' tabindex='-1' value='')
              
        input#mc-embedded-subscribe(type='submit' value='Join LLARC!' name='subscribe').mt4.ph3.f4-l.f3.link.dib.ph4-l.primary-bg.btn.fw5.pv3.pointer.bw0



    
          //- .mc-field-group.input-group
          //-   
          //-       input(type='radio' value='64' name='group[78996]' id='mce-group[78996]-78996-0')
          //-       label(for='mce-group[78996]-78996-0') Member
    
              
</template>



<style lang='scss' scoped>
div ::v-deep img {
  width: 100%;
  height: auto;
  text-align: center;
}

div ::v-deep p {
  text-align: left;
}

.boxwidth{
  width: 50vw;
}

p {
  font-size: 1.5rem;;
}
label, a {
  font-size: 1.2rem;
}

small {
  margin-bottom:25px;
  line-height: 1.25;
}

.logo {
  width: 60vw;
}

input {
  margin-bottom: 25px;
}
</style>

<script>

export default {
  data() {
    return {
      joinSub: 'Join us',
      aboutCircles: false,
      page: null,
      error: false,
     newsletter: false, join: false
    };
  },
  async mounted() {
    if (this.$store.getters["posts/getAllPages"] === null) {
      console.log(this.$route.name);
      await this.$store.dispatch("posts/fetchPages");
    } // console.log(this.$store.getters)
    this.page = this.$store.getters["posts/getPageBySlug"]("join");
    if (this.page == null) {
      this.page = {
        title: "Oops!",
      };
      this.error = true;
    }

  },
};
</script>
