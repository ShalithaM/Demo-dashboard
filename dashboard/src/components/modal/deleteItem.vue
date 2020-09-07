<template>
  <!-- Add item modal -->
  <b-modal
    id="delete-item-row-modal"
    title="Delete Item"
    header-bg-variant="danger"
    header-text-variant="light"
    footer-border-variant="light"
    ref="deleteItemModal"
    @hide="closeModal()"
  >
    <template v-slot:modal-footer="{ ok, cancel }">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-row class="d-flex flex-row align-items-center justify-content-between mx-0 w-100">
        <b-button variant="danger" @click="ok()">Delete</b-button>
        <b-button variant="outline-secondary" @click="cancel()">Cancel</b-button>
      </b-row>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon icon="x" @click="closeModal()" aria-label="Close Modal"></b-icon>
    </template>
    <!-- delete item form -->
    <span>Are you sure you want to delete the following item?</span>
    <b-row
      class="d-flex flex-row align-items-center justify-content-center my-3"
      v-if="itemContent"
    >
      <b-col>
        <b-row
          v-if="itemContent['Item Code']"
          class="d-flex flex-row align-items-center justify-content-center my-1"
        >
          <b-col
            class="d-flex flex-column align-items-start justify-content-center"
            cols="12"
            sm="6"
            lg="4"
          >
            <span class="text-left font-weight-bold">Item Code:</span>
          </b-col>
          <b-col
            class="d-flex flex-column align-items-start justify-content-center"
            cols="12"
            sm="6"
            lg="8"
          >
            <span class="text-left font-weight-light">{{itemContent['Item Code']}}</span>
          </b-col>
        </b-row>
        <b-row
          v-if="itemContent['Item Name']"
          class="d-flex flex-row align-items-center justify-content-center my-1"
        >
          <b-col
            class="d-flex flex-column align-items-start justify-content-center"
            cols="12"
            sm="6"
            lg="4"
          >
            <span class="text-left font-weight-bold">Item Name:</span>
          </b-col>
          <b-col
            class="d-flex flex-column align-items-start justify-content-center"
            cols="12"
            sm="6"
            lg="8"
          >
            <span class="text-left font-weight-light">{{itemContent['Item Name']}}</span>
          </b-col>
        </b-row>
        <b-row
          v-if="itemContent['Category']"
          class="d-flex flex-row align-items-center justify-content-center my-1"
        >
          <b-col
            class="d-flex flex-column align-items-start justify-content-center"
            cols="12"
            sm="6"
            lg="4"
          >
            <span class="text-left font-weight-bold">Category:</span>
          </b-col>
          <b-col
            class="d-flex flex-column align-items-start justify-content-center"
            cols="12"
            sm="6"
            lg="8"
          >
            <span class="text-left font-weight-light">{{itemContent['Category']}}</span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <pre>{{ JSON.stringify(itemContent, null, 2) }}</pre>
  </b-modal>
</template>

<script>
export default {
  name: "DeleteItem",
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    itemIndex: {
      default: null,
      type: Number
    },
    itemContent: {
      default: null,
      type: Object
    }
  },
  watch: {
    isShow(value) {
      if (value) {
        this.$refs["deleteItemModal"].show();
      } else {
        // this.clearFn();
        this.$refs["deleteItemModal"].hide();
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