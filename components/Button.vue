<template lang="pug">
a.ttu.br3.pv2.ph3.mb2.dib.mh3.link.btn(
  :href="url",
  :class="{ 'canny-yellow font-canny-dark ba primary-border ': primary, 'ba font-canny-yellow': secondary, 'ba font-canny-dark': tertiary }"
)
  div {{ text }}
</template>

<script>
export default {
  props: ["url", "text", "primary", "secondary", "tertiary"],
};
</script>


<style lang="scss" scoped>
.primary-border{
  border-color: $yellow;
}
</style>