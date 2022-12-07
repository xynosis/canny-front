<template lang="pug">
main.pa4.black-80
  //- if loggedin or cookie stay loggedin
  //- form.measure.center(v-if="!loggedIn && !signedUp")

  form.measure.center(v-if="getUser === null")
    fieldset#sign_up.ba.b--transparent.ph0.mh0
      .mt3 
        h1(v-if="signup") Sign up
        h1(v-if="!signup && !passwordReset") Log in
        h1(v-if="passwordReset") Reset your password
      .mt3(v-if="signup")
        label.db.fw6.lh-copy.f3 First name
        input.pa2.input-reset.ba.bg-transparent.outline.w-100(
          type="text",
          name="first-name",
          v-model="first"
        )
      .mt3(v-if="signup")
        label.db.fw6.lh-copy.f3 Last name
        input.pa2.input-reset.ba.bg-transparent.outline.w-100(
          type="text",
          name="last-name",
          v-model="last"
        )
      .mt3(v-if="emailSent")
        p Check your inbox for details on how to reset your password.
      .mt3(v-if="!emailSent")
        p(v-if="passwordReset && !resetToken") We will send you an email to reset your password.
        p(v-if="passwordReset && resetToken") Please enter your new password below.

        label.db.fw6.lh-copy.f3(
          :class="(exists && signup ? 'red' : 'black-80', !exists && !signup && logAttempt ? 'red' : 'black-80')"
        ) Email
        input.pa2.input-reset.ba.bg-transparent.outline.w-100(
          :class="(exists && signup ? 'red' : 'black-80', !exists && !signup && logAttempt ? 'red' : 'black-80')",
          type="email",
          name="email-address",
          v-model="email"
        )
        label.db.fw6.lh-copy.mt3.red(for="email", v-if="exists && signup") A user already exists with that email
        label.db.fw6.lh-copy.mt3.red(
          for="email",
          v-if="!exists && !signup && logAttempt"
        ) No user exists with that email address

      .mt3(
        :class="incorrectPass ? 'red' : 'black-80'",
        v-if="!passwordReset || resetToken"
      )
        label.db.fw6.lh-copy.f3(for="password") Password
        div
          input#password.b.pa2.ba.w-100.bg-transparent.outline(
            :class="incorrectPass ? 'red' : 'black-80'",
            :type="passwordFieldType1",
            name="password",
            v-model="password"
          )
          font-awesome-icon(
            :icon="passwordFieldType1 === 'password' ? 'eye' : 'eye-slash'",
            @click="viewPass1()"
          )
        label.db.fw6.lh-copy.mt3.red(v-if="incorrectPass") Your password is incorrect
      .mt3(
        v-if="signup || resetToken",
        :class="passwordError ? 'red' : 'black-80'"
      )
        label.db.fw6.lh-copy.f3(for="password-conf") Retype your password
        input#password.b.pa2.input-reset.ba.bg-transparent.outline.w-100(
          :class="passwordError ? 'red' : 'black-80'",
          :type="passwordFieldType2",
          name="password-conf",
          v-model="passwordValidator"
        )
        font-awesome-icon(
          :icon="passwordFieldType2 === 'password' ? 'eye' : 'eye-slash'",
          @click="viewPass2()"
        )
        label.db.fw6.lh-copy.mt3.red(
          for="password-error",
          v-if="passwordError"
        ) Your passwords don't match!
      .lh-copy.mt3.tr.pointer(
        v-if="!signup && !passwordReset",
        @click="(passwordReset = true), (signup = false)"
      )
        .f6.link.dim.black.db Forgot your password?
      //- .lh-copy.mt3.tr.flex(v-if="signup")
        input(type='checkbox') 
        label I agree to receiving emails necessary for the running of this account, including updates and password resets
      .mt4.tc.v-btm.f4.flex.center
        //-login method, shows if not on sign up screen 
        .w-100.pointer(@click="login()", v-if="!signup && !passwordReset")
          Button(primary="true", text="Log in")
        //-sign up button, shows on log in screen
        .w-100.pointer(
          @click="signup = true",
          v-if="!signup && !passwordReset"
        )
          Button(tertiary="true", text="Sign up")

        //-back button
        .w-100.pointer(
          @click="(signup = false), (exists = false), ((passwordError = false), (passwordReset = false))",
          v-if="signup || (passwordReset && !emailSent && !resetToken)"
        )
          Button(tertiary="true", text="< Back")
        //-sign up method, shows if not on log in screen
        .w-100.pointer(@click="signUpMethod()", v-if="signup")
          Button(primary="true", text="Sign up")
        //-send password reset,
        .w-100.pointer(
          @click="triggerPasswordReset()",
          v-if="passwordReset && !emailSent && !resetToken"
        )
          Button(primary="true", text="Submit")
        .w-100.pointer(@click="resetPasswordWithToken()", v-if="resetToken")
          Button(primary="true", text="Reset password")
</template>


  
<script>
import { mapGetters } from "vuex";

import medusaAPI from "../api/medusa";

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
      passwordReset: false,
      emailSent: false,
      exists: null,
      logAttempt: false,
      incorrectPass: false,
      resetToken: "",
    };
  },
  async mounted() {
    await this.$store.dispatch("shop/getSession");
    if (this.$route.query.hasOwnProperty("reset")) {
      this.resetToken = this.$route.query.reset;
      this.email = this.$route.query.email;
      this.passwordReset = true;
    }
  },
  watch: {
    getUser() {
      if (this.getUser !== null) {
        this.$router.push("/account/orders");
      } else if (this.getUser === null) {
        this.$router.push("/account");
      }
    },
  },
  computed: {
    ...mapGetters("shop", ["getUser"]),
  },
  methods: {
    async login() {
      if (this.email) {
        const user = await medusaAPI.checkEmail(this.email);
        if (!user.exists) {
          this.exists = false;
          this.logAttempt = true;
        } else {
          this.exists = true;
        }
        if (this.exists) {
          let data = {
            email: this.email,
            password: this.password,
          };
          try {
            await this.$store.dispatch("shop/login", data);
          } catch (e) {
            this.incorrectPass = true;
            // console.error(e)
          }
        }
        // this.loggedIn = true;
      }
    },

    async signUpMethod() {
      const user = await medusaAPI.checkEmail(this.email);
      if (!user.exists) {
        this.exists = false;
      } else {
        this.exists = true;
      }
      if (this.password === this.passwordValidator && !this.exists) {
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
    async triggerPasswordReset() {
      this.getPasswordToken(this.email);
      this.emailSent = true;

      // does this work? also make editable
    },
    async resetPasswordWithToken() {
      if (this.password === this.passwordValidator) {
        this.passwordError = false;

        let data = {
          email: this.email,
          password: this.password,
          token: this.resetToken,
        };
  
        await this.$store.dispatch("shop/resetPassword", data);
      } else {
        this.passwordError = true;
      }
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