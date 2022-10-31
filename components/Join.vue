<template lang="pug">
div
    .o-70.primary-bg.z-2.vh-75-l.vh-50.w-100.absolute.join-bg
    .newsletter.w-100.relative
        .flex.justify-center.items-center.primary.vh-75-l.vh-50.join-bg.dt.w-50-l.w-90.center
            .dtc.v-mid.white.z-3.absolute.w-50-l.w-90
                h1.tl.f1-l Join us!
                p.f3.tl.pt4 Like what you've heard? Click below to find out more about joining us.
                //- .center.primary-bg.white.pa3.btn
                .tl.pt4
                    .f4-l.f3.link.dib.ph4.secondary-bg.btn.fw9.pv2
                        a.no-underline.fw7(href="/join")
                            p.primary Join LLARC
</template>


<style lang="scss" scoped>
.newsletter {
//   background-image: url("../assets/header.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
    min-height: 300px

}

h1, p {
    color: white;
}

.join-bg{
      min-height: 300px

}
</style>