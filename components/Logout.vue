<template lang="pug">
div(@click="logout()")
  Button.pointer(primary="true", text="Log out")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    async logout() {
      await this.$store.dispatch("shop/logout");
      this.$router.push("/account");
    },
  },

  computed: {
    ...mapGetters("shop", ["getUser"]),
  },
};
</script>
