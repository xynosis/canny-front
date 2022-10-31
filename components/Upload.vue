<template lang='pug'>
div
  vue-file-agent(
    ref="vueFileAgent",
    :theme="'list'",
    :multiple="true",
    :deletable="true",
    :meta="true",
    :helpText="'Upload a file'",
    @select="filesSelected($event)",
    @beforedelete="onBeforeDelete($event)",
    @delete="fileDeleted($event)",
    v-model="fileRecords"
  )
  br
  button.mh3.f4.link.dim.ph4.pv2.mb2.dib.white.br3.primary-bg(
    :disabled="!fileRecordsForUpload.length",
    @click="uploadFiles()"
  )
    | Upload {{ fileRecordsForUpload.length }} files
</template>


<script>
export default {
  data: function () {
    return {
      fileRecords: [],
      uploadUrl: "http://138.68.177.39/fileupload",
    //   uploadUrl: "https://laterlifeaudioradio.org.uk/fileupload",
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: [], // maintain an upload queue
    };
  },
  methods: {
    uploadFiles: function () {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(
        this.uploadUrl,
        this.uploadHeaders,
        this.fileRecordsForUpload
      );
      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile: function (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        var k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  },
};
</script>
