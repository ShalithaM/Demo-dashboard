<template>
  <!-- Download report modal -->
  <b-modal
    id="download-report-modal"
    title="Download Table As"
    header-bg-variant="secondary"
    header-text-variant="light"
    footer-border-variant="light"
    ref="downloadReportModal"
    @hide="closeModal()"
  >
    <template v-slot:modal-footer="{ ok, cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-row class="d-flex flex-row align-items-center justify-content-between mx-0 w-100">
        <b-button class="px-4" variant="secondary" @click="ok()">Ok</b-button>
        <b-button variant="outline-secondary" @click="cancel()">Cancel</b-button>
      </b-row>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon icon="x" @click="closeModal()" aria-label="Close Modal"></b-icon>
    </template>
    <!-- download report buttons -->
    <b-col class="d-flex flex-column align-items-center justify-content-center" cols="12">
      <b-row class="d-flex flex-row align-items-center justify-content-start w-100 my-3">
        <span
          class="text-left"
        >Download the items table as a report, chose the most suitable format:</span>
      </b-row>
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100 my-1">
        <!-- download as csv button -->
        <b-col
          class="d-flex flex-column align-items-center justify-content-center px-1"
          cols="12"
          sm="6"
        >
          <b-button
            variant="success"
            class="d-flex flex-row align-items-center justify-content-center my-2"
          >
            <b-icon class="mr-2" icon="file-earmark-spreadsheet" aria-hidden="true"></b-icon>Download as CSV
          </b-button>
        </b-col>
        <!-- download as pdf button -->
        <b-col
          class="d-flex flex-column align-items-center justify-content-center px-1"
          cols="12"
          sm="6"
        >
          <b-button
            variant="danger"
            class="d-flex flex-row align-items-center justify-content-center my-2"
          >
            <b-icon class="mr-2" icon="file-earmark-text" aria-hidden="true"></b-icon>Download as PDF
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-modal>
</template>
<script>
export default {
  name: "DeleteItem",
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    isShow(value) {
      if (value) {
        this.$refs["downloadReportModal"].show();
      } else {
        // this.clearFn();
        this.$refs["downloadReportModal"].hide();
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
    }
  }
};
</script>