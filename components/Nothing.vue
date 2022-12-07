<template lang="pug">
div
    h1 It looks like there isn't anything here.
    .pointer(@click='$router.push("/shop")')
        Button(primary="true", text="Head to the shop")
</template>