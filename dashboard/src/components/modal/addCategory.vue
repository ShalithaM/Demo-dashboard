<template>
  <!-- Add item modal -->
  <b-modal
    id="add-category-modal"
    title="Add New Category"
    header-bg-variant="dark"
    header-text-variant="light"
    footer-border-variant="light"
    ref="addCategoryModal"
    @hide="closeModal()"
  >
    <template v-slot:modal-footer>
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-row class="d-flex flex-row align-items-center justify-content-between mx-0 w-100">
        <b-button variant="secondary" @click="saveCategory()">Submit</b-button>
        <b-button variant="outline-secondary" @click="closeModal()">Cancel</b-button>
      </b-row>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon icon="x" @click="closeModal()" aria-label="Close Modal"></b-icon>
    </template>
    <!-- add item form -->
    <form
      id="add-category-form"
      class="d-flex flex-column align-items-center justify-content-center w-100"
    >
      <!-- full row input (Category Name) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="category-name-group"
            :state="categoryNameError.status"
            label="Category Name"
            label-for="category-name-group-input"
            :invalid-feedback="`${categoryNameError.message}`"
          >
            <b-form-input
              id="category-name-group-input"
              v-model="categoryName"
              :state="categoryNameError.status"
              placeholder="Category Name"
              trim
              form="add-category-form"
              type="text"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- full row input (Multiple Sub-Category) -->
      <b-row class="d-flex flex-row align-items-center justify-content-center w-100">
        <b-col cols="12">
          <b-form-group
            id="sub-categories-group"
            :state="subCategoriesError.status"
            label="Sub Category Name"
            label-for="sub-categories-input"
            :invalid-feedback="`${subCategoriesError.message}`"
          >
            <b-input-group>
              <template v-slot:append>
                <b-button variant="primary" @click="addSubCategory()">Add Another</b-button>
              </template>
              <b-form-input
                id="sub-categories-input"
                :state="subCategoriesError.status"
                v-model="subCategoryName"
                placeholder="Sub Category Name"
                trim
                form="add-category-form"
                type="text"
                v-on:keyup="enterKey"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-row class="sub-category-group bg-light text-dark pt-3" v-if="subCategories.length > 0">
            <b-col>
              <!-- if categories are already added (do a v-for here) -->
              <b-form-group
                id="sub-categories-group"
                :state="null"
                :key="key + index"
                v-for="(subcategory, index) in subCategories"
              >
                <b-input-group>
                  <template v-slot:append>
                    <b-button
                      size="sm"
                      variant="secondary"
                      @click="editSubcategory(subcategory,index)"
                    >
                      <b-icon icon="pencil" aria-label="Edit Category"></b-icon>
                    </b-button>
                    <b-button size="sm" variant="danger" @click="deleteSubcategory(index)">
                      <b-icon icon="trash" aria-label="Delete Category"></b-icon>
                    </b-button>
                  </template>
                  <b-form-input
                    id="sub-categories-input"
                    :value="subcategory"
                    :state="null"
                    placeholder="Sub Category Name"
                    trim
                    form="add-category-form"
                    type="text"
                    disabled
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </form>
  </b-modal>
</template>

<script>
import categoryService from "../../services/category.sevice";

export default {
  name: "AddCategory",
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      key: Number(new Date()),
      categoryName: "",
      subCategoryName: "",
      subCategories: [],
      maxLength: 120,
      categoryNameError: {
        status: null,
        message: ""
      },
      subCategoriesError: {
        status: null,
        message: ""
      },
      index: "",
      isEdit: false
    };
  },
  watch: {
    isShow(value) {
      if (value) {
        this.$refs["addCategoryModal"].show();
      } else {
        // this.clearFn();
        this.$refs["addCategoryModal"].hide();
      }
    },

    categoryName(value) {
      if (value) {
        this.categoryNameError.status = true;
      } else {
        this.categoryNameError.status = false;
        this.categoryNameError.message =
          "Enter that info! Please fill your category name";
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
      this.clear();
    },
    saveCategory() {
      if (
        this.categoryNameError.status == true &&
        this.subCategories.length > 0
      ) {
        console.log(this.subCategories);
        var payload = {
          StoreVendorId: JSON.parse(localStorage.getItem("vendor")).userId,
          StoreId: JSON.parse(localStorage.getItem("vendor")).stores[0]._id,
          CategoryName: this.categoryName,
          Description: ""
        };

        categoryService
          .createCategory(payload)
          .then(response => {
            console.log(response.data);
            if (response.data.message == "success") {
              var subCategoryPayload = {
                CategoryId: response.data.content.categoryId,
                SubCategoryName: this.subCategories,
                StoreVendorId: JSON.parse(localStorage.getItem("vendor"))
                  .userId,
                StoreId: JSON.parse(localStorage.getItem("vendor")).stores[0]
                  ._id
              };
              categoryService
                .createSubCategory(subCategoryPayload)
                .then(response => {
                  console.log(response.data);
                  if (response.data.message == "success") {
                    this.$store.dispatch("setCategories");
                    this.$emit("onClose");
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.validateForm();
      }
    },
    addSubCategory() {
      if (this.subCategoryName) {
        console.log(this.index);

        var contains = this.subCategories.includes(this.subCategoryName);
        if (this.isEdit) {
          this.subCategories.splice(this.index, 1);
          this.isEdit = false;
          if (!contains) {
            this.subCategories.push(this.subCategoryName);
            this.subCategoryName = "";
            this.subCategoriesError.status = null;
          }
        } else {
          if (!contains) {
            this.subCategories.push(this.subCategoryName);
            this.subCategoryName = "";
            this.subCategoriesError.status = null;
          }
        }
      }
    },
    editSubcategory(subCategoryName, index) {
      this.subCategoryName = subCategoryName;
      this.index = index;
      this.isEdit = true;
    },

    deleteSubcategory(index) {
      this.subCategories.splice(index, 1);
    },

    validateForm() {
      if (!this.categoryName) {
        this.categoryNameError.status = false;
        this.categoryNameError.message =
          "Enter that info! Please fill your category name";
      }
      if (this.subCategories.length == 0) {
        this.subCategoriesError.status = false;
        this.subCategoriesError.message =
          "Enter that info! Please fill your sub category name";
      }
    },
    clear() {
      this.categoryName = "";
      this.subCategoris = [];
    },

    enterKey: function(e) {
      if (e.keyCode === 13) {
        this.addSubCategory();
      }
    }
  }
};
</script>