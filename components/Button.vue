<template lang="pug">
a.link.dib.ph3.primary-bg.btn.radius(:href="url")
  p.fw7.f4.white {{ text }}
</template>

<script>
export default {
  props: ["url", "text"],
};
</script>


<style scoped>
.radius {
  border-radius: 9px;
}
</style>