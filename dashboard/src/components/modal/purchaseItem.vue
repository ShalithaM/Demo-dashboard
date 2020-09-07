<template>
  <!-- Add item modal -->
  <b-modal
    id="purchase-item-modal"
    title="Purchase New Item"
    header-bg-variant="dark"
    header-text-variant="light"
    footer-border-variant="light"
    ref="purchaseItemModal"
    size="lg"
    @hide="closeModal()"
  >
    <template v-slot:modal-footer>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-row class="d-flex flex-row align-items-center justify-content-between mx-0 w-100">
        <b-button variant="secondary" @click="purchaseItem()">Submit</b-button>
        <b-button variant="outline-secondary" @click="closeModal()">Cancel</b-button>
      </b-row>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon icon="x" @click="closeModal()" aria-label="Close Modal"></b-icon>
    </template>
    <!-- add item form -->
    <form
      id="purchase-item-form"
      class="d-flex flex-column align-items-center justify-content-center w-100"
    >
      <!-- full row input (Item Name) -->
      <b-row class="d-flex flex-row align-items-start justify-content-center w-100">
        <b-col cols="12">
          <b-form-group id="item-name-group" :state="true" :description="`Item Name`">
            <b-form-input
              id="item-name-group-input"
              v-model="itemName"
              :state="true"
              placeholder="Item Name"
              trim
              form="purchase-item-form"
              type="text"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- half row input (Item Total Price and Available Count) -->
      <b-row class="d-flex flex-row align-items-start justify-content-center w-100">
        <b-col cols="12" sm="6">
          <b-form-group id="item-price-group" :state="true" 
          :description="`Total Price`"
          label="Total Price"
            label-for="item-price-group-input">
            <b-input-group prepend="LKR">
              <b-form-input
                id="item-price-group-input"
                v-model="totalPrice"
                :state="true"
                placeholder="Total Price"
                trim
                form="purchase-item-form"
                type="number"
                disabled
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-available-count-group"
            :state="true"
            :description="`Available Count`"
          >
            <b-form-input
              id="item-available-count-group-input"
              v-model="availableCount"
              :state="true"
              placeholder="Available Count"
              trim
              form="purchase-item-form"
              type="number"
              label="Available Count"
            label-for="item-available-count-group-input"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- half row input (Purchase Count and Item Supplier) -->
      <b-row class="d-flex flex-row align-items-start justify-content-center w-100">
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-purchase-count-group"
            :state="purchaseCountError.status"
            :invalid-feedback="`${purchaseCountError.message}`"
          >
            <b-form-input
              id="item-purchase-count-group-input"
              v-model="purchaseCount"
              :state="purchaseCountError.status"
              placeholder="Purchase Count"
              trim
              form="purchase-item-form"
              type="number"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <!-- <b-form-group id="item-supplier-group" :state="null">
            <b-form-select
              id="item-supplier-select"
              v-model="itemSupplier"
              :options="suppliers"
              form="purchase-item-form"
              :state="null"
            ></b-form-select>
          </b-form-group>-->
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

import purchaseService from "../../services/purchase.sevice";

export default {
  name: "PurchaseItem",
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      itemId: "",
      itemName: "",
      totalPrice: "",
      availableCount: "",
      purchaseCount: "",

      purchaseCountError: {
        status: null,
        message: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      selectedItem: "getSelectedItem"
    })
  },
  watch: {
    isShow(value) {
      if (value) {
        this.$refs["purchaseItemModal"].show();
      } else {
        // this.clearFn();
        this.$refs["purchaseItemModal"].hide();
      }
    },

    selectedItem(value) {
      if (value) {
        this.itemId = value._id;
        this.itemName = value['Item Name']
        this.totalPrice = value.Price;
        this.availableCount = value.Inventory;
      }
    },

    purchaseCount(value) {
      if (value) {
        this.purchaseCountError.status = true;
      } else {
        this.purchaseCountError.status = false;
        this.purchaseCountError.message =
          "Enter that info! Please fill your purchase count";
      }
    }
  },

  methods: {
    closeModal() {
      this.$emit("onClose");
      // this.clear();
    },
    clear() {
      this.itemName = "";
      this.totalPrice = "";
      this.availableCount = "";
      this.purchaseCount = "";
    },

    purchaseItem() {
      if (this.purchaseCountError.status == true) {
        var payload = {
          ItemId: this.itemId,
          Inventory: this.purchaseCount
        };

        purchaseService
          .purchaseItem(payload)
          .then(response => {
            console.log(response.data);
            if (response.data.message == "success") {
              this.$store.dispatch("setItems");
              this.$emit("onClose");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.validateForm();
      }
    },

    validateForm() {
      if (!this.purchaseCount) {
        this.purchaseCountError.status = false;
        this.purchaseCountError.message =
          "Enter that info! Please fill your purchase count";
      }
    }
  }
};
</script>