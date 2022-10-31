<template lang="pug">
.w-100.mb4
    .w-60-l.w-90.center
      
        h1 Upload a file
        .pv3 Files can be accessed from https://laterlifeaudioradio.org/content/images/uploads/NAMEOFFILE.FILETYPE
        .pv3 e.g. a file uploaded as 'photo.jpg' would be accessible as https://laterlifeaudioradio.org/content/images/uploads/photo.jpg
        .pb4
            Upload
</template>

<script>
import Upload from '../components/Upload'
export default {
    components: {Upload}
}
</script>
