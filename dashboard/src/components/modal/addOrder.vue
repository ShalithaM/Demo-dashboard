<template>
  <!-- Add item modal -->
  <b-modal
    id="add-order-modal"
    title="Add New Order"
    header-bg-variant="dark"
    header-text-variant="light"
    footer-border-variant="light"
    size="lg"
    ref="addOrderModal"
    @hide="closeModal()"
  >
    <template v-slot:modal-footer>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-row class="d-flex flex-row align-items-center justify-content-between mx-0 w-100">
        <b-button variant="secondary" @click="saveItem()">Submit</b-button>
        <b-button variant="outline-secondary" @click="closeModal()">Cancel</b-button>
      </b-row>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon icon="x" @click="closeModal()" aria-label="Close Modal"></b-icon>
    </template>
    <!-- add item form -->
    <form
      id="add-order-form"
      class="d-flex flex-column align-items-center justify-content-center w-100"
    >
      <!-- full row input (Order ID [Auto-generated]) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="order-id-group"
            :state="null"
            label="Order ID"
            label-for="order-id-group-input"
          >
            <b-form-input
              id="order-id-group-input"
              v-model="orderID"
              disabled
              form="add-order-form"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row input (Order Date [Auto-generated]) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="order-date-group"
            :state="null"
            label="Order Date"
            label-for="order-date-group-input"
          >
            <b-form-input
              id="order-date-group-input"
              v-model="orderDate"
              disabled
              form="add-order-form"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row input (Customer ID) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="customer-id-group"
            :state="customerIDError.status"
            :invalid-feedback="`${customerIDError.message}`"
            label="Customer"
            label-for="customer-name-select"
          >
            <b-form-select
              id="customer-name-select"
              v-model="customerID"
              :options="customersList"
              form="add-order-form"
              :state="customerIDError.status"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row input (Items Adder (with form tags [see https://bootstrap-vue.org/docs/components/form-tags])) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="order-items-group"
            label="Items"
            :state="orderItemsError.status"
            :invalid-feedback="`${orderItemsError.message}`"
          >
            <b-form-tags v-model="orderItems" no-outer-focus class="mb-2">
              <template v-slot="{ tags, disabled, addTag, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      @remove="removeTag(tag)"
                      :title="tag"
                      :disabled="disabled"
                      variant="info"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>
                <!-- items search input -->
                <b-form-group id="item-search-group" :description="searchDesc" :disabled="disabled">
                  <b-form-input
                    id="item-search-group-input"
                    v-model="itemsSearch"
                    placeholder="Search Item (Name/Code)"
                    form="add-order-form"
                    type="search"
                    autocomplete="off"
                  ></b-form-input>
                </b-form-group>
                <!-- existing items list -->
                <b-row
                  class="d-flex flex-row align-items-center justify-content-center items-list-container"
                  no-gutters
                >
                  <b-col
                    class="d-flex flex-row align-items-center justify-content-center"
                    cols="12"
                  >
                    <b-list-group class="w-100">
                      <b-list-group-item
                        v-for="option in availableOptions"
                        :key="option"
                        @click="onOptionClick({ option, addTag })"
                        button
                      >{{ option }}</b-list-group-item>
                      <b-list-group-item
                        v-if="availableOptions.length === 0"
                        button
                        disabled
                      >There are no tags available to select</b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>
              </template>
            </b-form-tags>
          </b-form-group>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AddSupplier",
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      orderID: "",
      orderDate: "",
      customerID: null,
      orderItems: [],
      itemsSearch: "",
      itemsList: [
        "Apple",
        "Orange",
        "Banana",
        "Lime",
        "Peach",
        "Chocolate",
        "Strawberry"
      ],
      maxLength: 10,

      customerIDError: {
        status: null,
        message: ""
      },
      orderItemsError: {
        status: null,
        message: ""
      }
    };
  },
  computed: {
    customersList() {
      return this.itemCategories.filter(function(obj) {
        return obj.value !== null;
      });
    },
    criteria() {
      // Compute the search criteria
      return this.itemsSearch.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // Filter out already selected options
      const options = this.itemsList.filter(
        opt => this.orderItems.indexOf(opt) === -1
      );
      if (criteria) {
        // Show only options that match criteria
        return this.itemsList.filter(
          opt => opt.toLowerCase().indexOf(criteria) > -1
        );
      }
      // Show all options available
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "There are no tags matching your search criteria";
      }
      return "";
    },
    ...mapGetters({
      itemCategories: "getCategories"
    })
  },
  watch: {
    isShow(value) {
      if (value) {
        this.$refs["addOrderModal"].show();
      } else {
        // this.clearFn();
        this.$refs["addOrderModal"].hide();
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
      this.clear();
    },
    saveItem() {
      return true;
    },
    clear() {
      return true;
    },
    validateForm() {
      return true;
    },
    onOptionClick({ option, addTag }) {
      addTag(option);
      this.search = "";
    }
  }
};
</script>
<style scoped>
.items-list-container {
  max-height: 150px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>