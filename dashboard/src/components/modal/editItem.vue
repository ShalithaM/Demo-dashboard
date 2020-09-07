<template>
  <!-- Add item modal -->
  <b-modal
    id="edit-item-row-modal"
    title="Edit Item"
    header-bg-variant="dark"
    header-text-variant="light"
    footer-border-variant="light"
    size="lg"
    ref="editItemModal"
    @hide="closeModal()"
  >
    <template v-slot:modal-footer>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-row class="d-flex flex-row align-items-center justify-content-between mx-0 w-100">
        <b-button variant="secondary" @click="modifyItem()">Submit</b-button>
        <b-button variant="outline-secondary" @click="closeModal()">Cancel</b-button>
      </b-row>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon icon="x" @click="closeModal()" aria-label="Close Modal"></b-icon>
    </template>
    <!-- edit item form -->
    <form
      id="edit-item-form"
      class="d-flex flex-column align-items-center justify-content-center w-100"
    >
      <!-- full row input (Item Name) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="item-name-group"
            :state="itemNameError.status"
            :invalid-feedback="`${itemNameError.message}`"
            label="Item Name"
            label-for="item-name-group-input"
          >
            <b-form-input
              id="item-name-group-input"
              v-model="itemName"
              :state="itemNameError.status"
              trim
              form="add-item-form"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row input (Item Code) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="item-code-group"
            :state="null"
            label="Item Code"
            label-for="item-code-group-input"
          >
            <b-form-input
              id="item-code-group-input"
              v-model="itemCode"
              :state="true"
              trim
              form="add-item-form"
              type="text"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- half row input (Item Category and Item Sub Category) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-category-group"
            :state="null"
            label="Item Category"
            label-for="item-category-select"
          >
            <!-- <b-form-select
              id="item-category-select"
              v-model="category"
              :options="itemCategories"
              form="edit-item-form"
              :state="null"
            ></b-form-select>-->
            <b-form-input
              id="item-category-select"
              v-model="category"
              :state="true"
              trim
              form="edit-item-form"
              type="text"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-subcategory-group"
            :state="null"
            label="Item Sub Category"
            label-for="item-subcategory-select"
          >
            <!-- <b-form-select
              id="item-subcategory-select"
              v-model="subCategory"
              :options="itemSubCategories"
              form="edit-item-form"
              :state="null"
            ></b-form-select>-->
            <b-form-input
              id="item-subcategory-select"
              v-model="subCategory"
              :state="true"
              trim
              form="edit-item-form"
              type="text"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- half row input (Item Total Price and Item Discount) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-price-group"
            :state="itemPriceError.status"
            :invalid-feedback="`${itemPriceError.message}`"
            label="Total Price"
            label-for="item-price-group-input"
          >
            <b-input-group prepend="LKR">
              <b-form-input
                id="item-price-group-input"
                v-model="totalPrice"
                :state="itemPriceError.status"
                trim
                form="add-item-form"
                type="number"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-discount-group"
            :state="itemDiscountError.status"
            :invalid-feedback="`${itemDiscountError.message}`"
            label="Discount"
            label-for="item-discount-input"
          >
            <b-input-group>
              <b-form-input
                id="item-discount-input"
                v-model="discountValue"
                :state="itemDiscountError.status"
                :placeholder="discountType == 'Percentage' ? '% value' : 'Amount'"
                trim
                form="add-item-form"
                type="number"
              ></b-form-input>
              <template v-slot:prepend>
                <b-dropdown v-model="discountType" text="Discount" variant="secondary">
                  <b-dropdown-item>Percentage</b-dropdown-item>
                  <b-dropdown-item>Value</b-dropdown-item>
                </b-dropdown>
              </template>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row input (Item Description) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="item-description-group"
            :state="itemDescriptionError.status"
            :description="`${description.length}/${maxLength}`"
            :invalid-feedback="`${itemDescriptionError.message}`"
            label="Item Description"
            label-for="item-description-area"
          >
            <b-form-textarea
              id="item-description-area"
              v-model="description"
              :state="itemDescriptionError.status"
              :placeholder="`Maximum ${maxLength} characters`"
              rows="4"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- half row input (Minimum Count and Enable Inventory Count) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-min-count-group"
            :state="null"
            label="Inventory Count"
            label-for="item-inventory-count-input"
          >
            <b-form-input
              id="item-min-count-input"
              v-model="inventory"
              :state="true"
              trim
              form="add-item-form"
              type="number"
              disabled
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-enable-count-group"
            :state="itemMinCountError.status"
            :invalid-feedback="`${itemMinCountError.message}`"
            label="Minimum Count"
            label-for="item-min-count-input"
          >
            <!-- <b-form-checkbox
              id="item-enable-count"
              v-model="addItem.inventoryCount"
              form="add-item-form"
              :state="null"
            >Enable inventory count?</b-form-checkbox>-->
            <b-form-input
              id="item-min-count-input"
              v-model="minimumCount"
              :state="itemMinCountError.status"
              trim
              form="add-item-form"
              type="number"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- half row input (Item Unit and Item Supplier) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-unit-group"
            :state="itemUnitError.status"
            :invalid-feedback="`${itemUnitError.message}`"
            label="Units of Measurement"
            label-for="item-unit-select"
          >
            <b-form-select
              id="item-unit-select"
              v-model="unitOfMeasurement"
              :options="itemUnitsMeasurement"
              form="add-item-form"
              :state="itemUnitError.status"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group
            id="item-supplier-group"
            :state="itemSupplierError.status"
            :invalid-feedback="`${itemSupplierError.message}`"
            label="Item Supplier"
            label-for="item-supplier-select"
          >
            <b-form-select
              id="item-supplier-select"
              v-model="supplier"
              :options="itemSuppliers"
              form="add-item-form"
              :state="itemSupplierError.status"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

import itemService from "../../services/item.sevice";

export default {
  name: "EditItems",
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
  data() {
    return {
      itemId: "",
      itemName: "",
      itemCode: "",
      category: null,
      subCategory: null,
      totalPrice: "",
      discountType: "Percentage",
      discountValue: "",
      description: "",
      minimumCount: "",
      inventory: "",
      unitOfMeasurement: null,
      supplier: null,
      maxLength: 300,
      itemUnitsMeasurement: [
        { value: null, text: "Select Units of Measurement" },
        { value: "Milligrams", text: "Milligrams (mg)" },
        { value: "Grams", text: "Grams (g)" },
        { value: "Kilograms", text: "Kilograms (kg)" },
        { value: "Litres", text: "Litres (ℓ)" },
        { value: "Millilitres", text: "Millilitres (mℓ)" }
      ],
      itemNameError: {
        status: null,
        message: ""
      },
      itemPriceError: {
        status: null,
        message: ""
      },
      itemDiscountError: {
        status: null,
        message: ""
      },
      itemDescriptionError: {
        status: null,
        message: ""
      },
      itemMinCountError: {
        status: null,
        message: ""
      },
      itemUnitError: {
        status: null,
        message: ""
      },
      itemSupplierError: {
        status: null,
        message: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      itemSuppliers: "getSuppliers",
      selectedItem: "getSelectedItem"
    })
  },
  mounted() {
    this.$store.dispatch("setSuppliers");
  },
  created() {},
  watch: {
    selectedItem(value) {
      console.log(value);
      if(value){
        console.log(value);
        this.itemId = value._id
        this.itemName = value['Item Name']
        this.itemCode = value['Item Code']
        this.totalPrice = value.finalPrice
        this.discountValue = value.discountValue
        this.description = value.description
        this.inventory = value.Inventory
        this.minimumCount = value['Min Count']

        this.category = value.Category
        this.subCategory = value['Sub Category']
      }      
    },

    isShow(value) {
      if (value) {
        this.$refs["editItemModal"].show();
      } else {
        // this.clearFn();
        this.$refs["editItemModal"].hide();
      }
    },
    itemName(value) {
      if (value) {
        this.itemNameError.status = true;
      } else {
        this.itemNameError.status = false;
        this.itemNameError.message =
          "Enter that info! Please fill your Item Name";
      }
    },

    totalPrice(value) {
      if (value) {
        this.itemPriceError.status = true;
      } else {
        this.itemPriceError.status = false;
        this.itemPriceError.message =
          "Enter that info! Please fill your Total Price";
      }
    },

    description(value) {
      if (value.length <= this.maxLength) {
        this.itemDescriptionError.status = true;
      } else {
        this.itemDescriptionError.status = false;
        this.itemDescriptionError.message = `Please enter less than ${this.maxLength} characters`;
      }
    },

    minimumCount(value) {
      if (value) {
        this.itemMinCountError.status = true;
      } else {
        this.itemMinCountError.status = false;
        this.itemMinCountError.message =
          "Enter that info! Please fill your Minimum Count";
      }
    },

    unitOfMeasurement(value) {
      if (value) {
        this.itemUnitError.status = true;
      } else {
        this.itemUnitError.status = false;
        this.itemUnitError.message =
          "Enter that info! Please fill your Units of Measurement";
      }
    },

    supplier(value) {
      if (value) {
        this.itemSupplierError.status = true;
      } else {
        this.itemSupplierError.status = false;
        this.itemSupplierError.message =
          "Enter that info! Please fill your Supplier";
      }
    }
  },
  methods: {
    closeModal() {
      // this.clear();
      this.$emit("onClose");
    },
    modifyItem() {
      console.log(this.supplier);
      if (
        this.itemNameError.status == true &&
        this.itemPriceError.status == true &&
        this.itemMinCountError.status == true &&
        // this.itemUnitError.status == true &&
        this.itemSupplierError.status == true &&
        (this.itemDescriptionError.status == null ||
          this.itemDescriptionError.status == true)
      ) {
        var payload = {
          PCLCode: this.itemCode,
          ItemId: this.itemId,
          Supplier: this.supplier,
          ItemName: this.itemName,
          Inventory: this.inventory,
          Description: this.description,
          Price: this.totalPrice,
          Unit: this.unitOfMeasurement,
          MinCount: this.minimumCount,
          VariantPrice: 0,
          VariantText: '',
          PreparationTime: '',
          IsInventory: true,
          Discount:{
            amount: 0,
            type: 0
          }
        };
        itemService
          .updateItem(payload)
          .then(response => {
            console.log(response.data);
            if (response.data.message == "success") {
              this.$store.dispatch("setItems");
              this.$emit("onClose");
              this.clear();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.validateForm();
      }
    },
    clear() {
      this.itemName = "";
      this.itemCod = "";
      this.category = null;
      this.subCategory = null;
      this.totalPrice = "";
      this.discountType = "";
      this.discountValue = "";
      this.description = "";
      this.minimumCount = "";
      this.inventory = "";
      this.unitOfMeasurement = null;
      this.supplier = null;

      this.itemNameError.status = null;
      this.itemPriceError.status = null;
      this.itemDescriptionError.status = null;
      this.itemMinCountError.status = null;
      this.itemUnitError.status = null;
      this.itemSupplierError.status = null;
    },

    validateForm() {
      if (!this.itemName) {
        this.itemNameError.status = false;
        this.itemNameError.message =
          "Enter that info! Please fill your Item Name";
      }

      if (!this.totalPrice) {
        this.itemPriceError.status = false;
        this.itemPriceError.message =
          "Enter that info! Please fill your Total Price";
      }

      if (!this.minimumCount) {
        this.itemMinCountError.status = false;
        this.itemMinCountError.message =
          "Enter that info! Please fill your Minimum Count";
      }

      if (!this.unitOfMeasurement) {
        this.itemUnitError.status = false;
        this.itemUnitError.message =
          "Enter that info! Please fill your Units of Measurement";
      }

      if (!this.supplier) {
        this.itemSupplierError.status = false;
        this.itemSupplierError.message =
          "Enter that info! Please fill your Supplier";
      }
    }
  }
};
</script>