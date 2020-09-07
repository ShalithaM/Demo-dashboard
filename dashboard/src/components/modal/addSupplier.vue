<template>
  <!-- Add item modal -->
  <b-modal
    id="add-supplier-modal"
    title="Add New Supplier"
    header-bg-variant="dark"
    header-text-variant="light"
    footer-border-variant="light"
    size="lg"
    ref="addSupplierModal"
    @hide="closeModal()"
  >
    <template v-slot:modal-footer>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-row class="d-flex flex-row align-items-center justify-content-between mx-0 w-100">
        <b-button variant="secondary" @click="saveSupplier()">Submit</b-button>
        <b-button variant="outline-secondary" @click="closeModal()">Cancel</b-button>
      </b-row>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon icon="x" @click="closeModal()" aria-label="Close Modal"></b-icon>
    </template>
    <!-- add item form -->
    <form
      id="add-supplier-form"
      class="d-flex flex-column align-items-center justify-content-center w-100"
    >
      <!-- full row input (Supplier Name) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="supplier-name-group"
            :state="supplierNameError.status"
            :invalid-feedback="`${supplierNameError.message}`"
            label="Supplier Name"
            label-for="supplier-name-group-input"
          >
            <b-form-input
              id="supplier-name-group-input"
              v-model="supplierName"
              :state="supplierNameError.status"
              trim
              form="add-supplier-form"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row input (Supplier Email) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="supplier-email-group"
            :state="emailAddressError.status"
            :invalid-feedback="`${emailAddressError.message}`"
            label="Email Address"
            label-for="supplier-email-group-input"
          >
            <b-form-input
              id="supplier-email-group-input"
              v-model="emailAddress"
              :state="emailAddressError.status"
              trim
              form="add-supplier-form"
              type="email"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row input (Supplier Contact) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="supplier-contact-group"
            :state="contactNumberError.status"
            :invalid-feedback="`${contactNumberError.message}`"
            label="Contact Number"
            label-for="supplier-contact-group-input"
          >
            <b-input-group prepend="+94">
              <b-form-input
                id="supplier-contact-group-input"
                v-model="contactNumber"
                :state="contactNumberError.status"
                placeholder="Contact Number"
                trim
                form="add-supplier-form"
                type="text"
                oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row group input (Supplier Address) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group id="supplier-address-group" :state="null"
            label="Supplier Address"
            label-class="font-weight-bold">
            <b-row no-gutters>
              <!-- full row input (Supplier Building/House/Flat Number) -->
              <b-col cols="12">
                <b-form-group
                  id="supplier-address-number-group"
                  :state="supplierAddressNumberError.status"
                  :invalid-feedback="`${supplierAddressNumberError.message}`"
                >
                  <b-form-input
                    id="supplier-address-number-group-input"
                    v-model="number"
                    :state="supplierAddressNumberError.status"
                    label="Building/House/Flat No."
                  label-for="supplier-address-number-group-input"
                    placeholder="Building/House/Flat No."
                    trim
                    form="add-supplier-form"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <!-- full row input (Supplier Street Address) -->
              <b-col cols="12">
                <b-form-group
                  id="supplier-address-street-group"
                  :state="supplierAddressStreetError.status"
                  :invalid-feedback="`${supplierAddressStreetError.message}`"
                >
                  <b-form-input
                    id="supplier-address-street-group-input"
                    v-model="street"
                    :state="supplierAddressStreetError.status"
                    label="Street Address"
                  label-for="supplier-address-street-group-input"
                    placeholder="Street Address"
                    trim
                    form="add-supplier-form"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <!-- half row input (Supplier Zip/Postal Code) -->
              <b-col cols="12" sm="6" class="pr-0 pr-md-2">
                <b-form-group
                  id="supplier-address-zipcode-group"
                  :state="supplierZipCodeError.status"
                  :invalid-feedback="`${supplierZipCodeError.message}`"
                >
                  <b-form-input
                    id="supplier-address-zipcode-group-input"
                    v-model="zipCode"
                    :state="supplierZipCodeError.status"
                    placeholder="Zip/Postal Code"
                    label="Zip/Postal Code"
                  label-for="supplier-address-zipcode-group-input"
                    trim
                    form="add-supplier-form"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <!-- half row input (Supplier City) -->
              <b-col cols="12" sm="6" class="pl-0 pl-md-2">
                <b-form-group
                  id="supplier-address-city-group"
                  :state="supplierCityError.status"
                  :invalid-feedback="`${supplierCityError.message}`"
                >
                  <b-form-input
                    id="supplier-address-city-group-input"
                    v-model="city"
                    :state="supplierCityError.status"
                    placeholder="City"
                    label="City"
                  label-for="supplier-address-city-group-input"
                    trim
                    form="add-supplier-form"
                    type="text"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

import supplierService from "../../services/supplier.sevice";

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
      supplierName: "",
      emailAddress: "",
      contactNumber: "",
      number: "",
      street: "",
      zipCode: "",
      city: "",
      maxLength: 10,

      supplierNameError: {
        status: null,
        message: ""
      },
      emailAddressError: {
        status: null,
        message: ""
      },
      contactNumberError: {
        status: null,
        message: ""
      },
      supplierAddressNumberError: {
        status: null,
        message: ""
      },
      supplierAddressStreetError: {
        status: null,
        message: ""
      },
      supplierZipCodeError: {
        status: null,
        message: ""
      },
      supplierCityError: {
        status: null,
        message: ""
      }
    };
  },
  computed: {
    listedItemCategories() {
      return this.itemCategories.filter(function(obj) {
        return obj.value !== null;
      });
    },
    ...mapGetters({
      itemCategories: "getCategories",
      itemSuppliers: "getSuppliers"
    })
  },
  mounted() {
    this.$store.dispatch("setSuppliers");
  },
  watch: {
    isShow(value) {
      if (value) {
        this.$refs["addSupplierModal"].show();
      } else {
        // this.clearFn();
        this.$refs["addSupplierModal"].hide();
      }
    },
    supplierName(value) {
      if (value) {
        this.supplierNameError.status = true;
      } else {
        this.supplierNameError.status = false;
        this.supplierNameError.message =
          "Enter that info! Please fill the Supplier Name";
      }
    },

    emailAddress(value) {
      if (value) {
        this.emailAddressError.status = true;
      } else {
        this.emailAddressError.status = false;
        this.emailAddressError.message =
          "Enter that info! Please fill your Email Address";
      }
    },
    contactNumber(value) {
      if (value) {
        this.contactNumberError.status = true;
      } else {
        this.contactNumberError.status = false;
        this.contactNumberError.message =
          "Enter that info! Please fill your Contact Number";
      }
    },

    number(value) {
      if (value) {
        this.supplierAddressNumberError.status = true;
      } else {
        this.supplierAddressNumberError.status = false;
        this.supplierAddressNumberError.message =
          "Enter that info! Please fill the Supplier Address";
      }
    },

    street(value) {
      if (value) {
        this.supplierAddressStreetError.status = true;
      } else {
        this.supplierAddressStreetError.status = false;
        this.supplierAddressStreetError.message =
          "Enter that info! Please fill the Supplier Address";
      }
    },

    zipCode(value) {
      if (value) {
        this.supplierZipCodeError.status = true;
      } else {
        this.supplierZipCodeError.status = false;
        this.supplierZipCodeError.message =
          "Enter that info! Please fill the Zip Code";
      }
    },

    city(value) {
      if (value) {
        this.supplierCityError.status = true;
      } else {
        this.supplierCityError.status = false;
        this.supplierCityError.message =
          "Enter that info! Please fill the City";
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
      this.clear();
    },
    saveSupplier() {
      if (
        this.supplierNameError.status == true &&
        this.emailAddressError.status == true &&
        this.contactNumberError.status == true &&
        this.supplierAddressNumberError.status == true &&
        this.supplierAddressStreetError.status == true &&
        this.supplierZipCodeError.status == true &&
        this.supplierCityError.status == true
      ) {
        var payload = {
          Email: this.emailAddress,
          Name: this.supplierName,
          PhoneNumber: this.contactNumber,
          Address:  this.number + ", " + this.street + ", " + this.city,
          ZipCode: this.zipCode
        };

        supplierService
          .createSupplier(payload)
          .then(response => {
            console.log(response.data);
            if (response.data.message == "success") {
              this.$store.dispatch("setSuppliersList");
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
      this.supplierName = "";
      this.emailAddress = "";
      this.contactNumber = "";
      this.number = "";
      this.street = "";
      this.zipCode = "";
      this.city = "";

      this.supplierNameError.status = null;
      this.emailAddressError.status = null;
      this.contactNumberError.status = null;
      this.supplierAddressNumberError.status = null;
      this.supplierAddressStreetError.status = null;
      this.supplierZipCodeError.status = null;
      this.supplierCityError.status = null;
    },

    validateForm() {
      if (!this.supplierName) {
        this.supplierNameError.status = false;
        this.supplierNameError.message =
          "Enter that info! Please fill the Supplier Name";
      }

      if (!this.emailAddress) {
        this.emailAddressError.status = false;
        this.emailAddressError.message =
          "Enter that info! Please fill your Email Address";
      }

      if (!this.contactNumber) {
        this.contactNumberError.status = false;
        this.contactNumberError.message =
          "Enter that info! Please fill your Contact Number";
      }

      if (!this.number) {
        this.supplierAddressNumberError.status = false;
        this.supplierAddressNumberError.message =
          "Enter that info! Please fill the Supplier Address";
      }

      if (!this.street) {
        this.supplierAddressStreetError.status = false;
        this.supplierAddressStreetError.message =
          "Enter that info! Please fill the Supplier Address";
      }

      if (!this.zipCode) {
        this.supplierZipCodeError.status = false;
        this.supplierZipCodeError.message =
          "Enter that info! Please fill the Zip Code";
      }

      if (!this.city) {
        this.supplierCityError.status = false;
        this.supplierCityError.message =
          "Enter that info! Please fill the City";
      }
    }
  }
};
</script>