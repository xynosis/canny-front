<template lang="pug">
main.pa4.black-80
  //- if loggedin or cookie stay loggedin
  form.measure.center(v-if='!loggedIn && !signedUp')
    fieldset#sign_up.ba.b--transparent.ph0.mh0
      .mt3(v-if="signup")
        label.db.fw6.lh-copy.f3(for="email-address") First name
        input#email-address.pa2.input-reset.ba.bg-transparent.outline.w-100(
          type="email",
          name="first-name",
          v-model="first"
        )
      .mt3(v-if="signup")
        label.db.fw6.lh-copy.f3(for="email-address") Last name
        input#email-address.pa2.input-reset.ba.bg-transparent.outline.w-100(
          type="email",
          name="last-name",
          v-model="last"
        )
      .mt3
        label.db.fw6.lh-copy.f3(for="email-address") Email
        input#email-address.pa2.input-reset.ba.bg-transparent.outline.w-100(
          type="email",
          name="email-address",
          v-model="email"
        )
      .mt3
        label.db.fw6.lh-copy.f3(for="password") Password
        div
          input#password.b.pa2.ba.w-100.bg-transparent.outline(
            :type="passwordFieldType1",
            name="password",
            v-model="password"
          )
          font-awesome-icon(
            :icon="passwordFieldType1  === 'password' ? 'eye' : 'eye-slash'",
            @click="viewPass1()"
          )
      .mt3(v-if="signup" :class='passwordError?"red" : "black-80"' )
        label.db.fw6.lh-copy.f3(for="password" ) Retype your password
        input#password.b.pa2.input-reset.ba.bg-transparent.outline.w-100(:class='passwordError?"red" : "black-80"' 
          :type="passwordFieldType2",
          name="password-conf",
          v-model="passwordValidator"
        )
        font-awesome-icon(
          :icon="passwordFieldType2 === 'password' ? 'eye' : 'eye-slash'",
          @click="viewPass2()"
        )
        label.db.fw6.lh-copy.mt3.red(for="password-error" v-if='passwordError') Your passwords don't match!
      .lh-copy.mt3.tr
        a.f6.link.dim.black.db(href="#0" @click='resetPassword()') Forgot your password?
      .mt4.tc.v-btm.f4
        a.ttu.font-canny-dark.link.br3.ph3.pv2.mb2.dib.white.canny-yellow.mh3.pointer(
          type="submit",
          v-if="!signup",
          @click="login()"
        ) Log in
        a.ttu.link.br3.ph3.pv2.mb2.ba.dib.font-canny-dark.mh3.pointer(
          v-if="signup",
          @click="signUpMethod()"
        ) Sign up
        a.ttu.link.br3.ph3.pv2.mb2.ba.dib.font-canny-dark.mh3.pointer(
          v-if="!signup",
          @click="signup = !signup"
        ) Sign up
  OrderHistory(v-if='loggedIn') 
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      first: "",
      last: "",
      signup: false,
      passwordFieldType1: "password",
      passwordFieldType2: "password",
      passwordValidator: "",
      passwordError: false,
      signedUp: false,
      loggedIn: false
    };
  },
  methods: {
    async login() {
      let data = {
        email: this.email,
        password: this.password,
      };
      await this.$store.dispatch("shop/login", data);
      this.getSession();
      this.loggedIn=true;
    },
    async getSession() {
      await this.$store.dispatch("shop/getSession");
    },
    async signUpMethod() {
      if (this.password === this.passwordValidator) {
        this.passwordError = false;
        let data = {
          email: this.email,
          first_name: this.first,
          last_name: this.last,
          password: this.password,
        };
        await this.$store.dispatch("shop/createUser", data);
      } else {
        this.passwordError = true;
      }
    },
    viewPass1() {
      this.passwordFieldType1 =
        this.passwordFieldType1 === "password" ? "text" : "password";
    },
    viewPass2() {
      this.passwordFieldType2 =
        this.passwordFieldType2 === "password" ? "text" : "password";
    },
    async resetPassword() {
      let data = {
        email: "Testuser@test.com",
        password: "test2",
      };
      await this.$store.dispatch("shop/resetPassword", data);

      // does this work? also make editable
    },
  },
};
</script>

<style scoped>
svg {
  margin-left: -50px;
  cursor: pointer;
}
</style>