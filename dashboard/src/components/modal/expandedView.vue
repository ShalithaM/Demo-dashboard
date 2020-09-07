<template>
  <!-- Add item modal -->
  <b-modal
    id="expanded-view-modal"
    title="Expanded View"
    header-bg-variant="dark"
    header-text-variant="light"
    footer-border-variant="light"
    size="xl"
    ref="expandedViewModal"
    @hide="closeModal()"
    scrollable
  >
    <!-- custom footer controls (table controls) -->
    <template v-slot:modal-footer>
      <!-- table controls -->
      <b-row
        class="d-flex flex-row align-items-center justify-content-center justify-content-md-end w-100 mx-0"
      >
        <!-- pages per page control -->
        <b-col
          class="d-flex flex-column align-items-stretch justify-content-center px-0 px-sm-1 py-2 py-md-1"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <b-form-group
            label="Per page"
            label-cols="12"
            label-cols-sm="4"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select v-model="perPage" id="perPageSelect" size="sm" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
        <!-- pagination controls -->
        <b-col
          class="d-flex flex-column align-items-stretch justify-content-center px-0 px-sm-1 py-2 py-md-1"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
    </template>
    <!-- custom close icon -->
    <template v-slot:modal-header-close>
      <b-icon icon="x" @click="closeModal()" aria-label="Close Modal"></b-icon>
    </template>
    <!-- expanded table view -->
    <!-- search and filter actions -->
    <b-row
      class="d-flex flex-row align-items-center justify-content-between w-100 mx-0 my-1 my-md-2"
    >
      <b-col
        class="d-flex flex-column align-items-start justify-content-center px-0 py-2 py-lg-0"
        cols="12"
      >
        <b-row class="d-flex flex-row align-items-center justify-content-start w-100 mx-0">
          <!-- search input -->
          <b-col class="d-flex flex-column align-items-center justify-content-center px-0" cols="6">
            <b-input-group class="search-input-group">
              <b-form-input class="search-input" type="text" placeholder="Search item (Name/Code)"></b-form-input>
              <b-input-group-append>
                <b-button
                  class="d-flex flex-row align-items-center justify-content-center search-icon-button"
                >
                  <b-icon class="search-icon" icon="search" aria-label="Search" variant="dark"></b-icon>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <!-- filter dropdown -->
          <b-col
            class="d-flex flex-column align-items-center align-items-md-start justify-content-center px-0"
            cols="6"
          >
            <b-dropdown id="dropdown-form" ref="dropdown" class="mx-0 mx-md-2 my-2 my-md-0">
              <template v-slot:button-content>
                <b-icon icon="funnel" class="mr-1" aria-hidden="true"></b-icon>Filter Items
              </template>
              <b-dropdown-form class="filter-dropdown-form">
                <b-form-group label="Category:" label-for="item-category" @submit.stop.prevent>
                  <b-form-select
                    id="item-category"
                    :options="itemCategories"
                    v-model="filteredCategories"
                  ></b-form-select>
                </b-form-group>
                <b-form-group label="Items:" class="mb-3">
                  <b-form-checkbox id="item-stock" value="in-stock">In Stock</b-form-checkbox>
                </b-form-group>
                <b-button variant="primary" size="sm" block>Filter</b-button>
              </b-dropdown-form>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <!-- items table row -->
    <b-row class="d-flex flex-row align-items-center justify-content-center w-100 mx-0 my-3">
      <b-col class="d-flex flex-column align-items-center justify-content-center px-0" cols="12">
        <!-- horizontally scrollable items table -->
        <b-row
          class="d-flex flex-row align-items-center justify-content-start w-100 mx-0 table-container"
        >
          <b-table
            class="item-table w-100"
            :items="tableItems"
            :fields="tableFields"
            :current-page="currentPage"
            :per-page="perPage"
            head-variant="dark"
            bordered
            outlined
          >
            <!-- header style -->
            <template v-slot:head()="data">
              <span class="table-header-text">{{data.label}}</span>
            </template>
          </b-table>
        </b-row>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ExpandedView",
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    tableItems: {
      type: Array
    },
    tableFields: {
      type: Array
    },
    totalRows: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      currentPage: 1,
      perPage: 15,
      pageOptions: [15, 30, 50, 100],
      filteredCategories: null
    };
  },
  watch: {
    isShow(value) {
      if (value) {
        this.$refs["expandedViewModal"].show();
      } else {
        // this.clearFn();
        this.$refs["expandedViewModal"].hide();
      }
    }
  },
  computed: {
    ...mapGetters({
      items: "getItems",
      itemCategories: "getCategories"
    })
  },
  methods: {
    closeModal() {
      this.$emit("onClose");
      this.clear();
    },
    clear() {
      this.currentPage = 1;
      this.perPage = 15;
      this.totalRows = 0;
      this.filteredCategories = null;
    }
  }
};
</script>
<style scoped>
.search-input {
  border-right: none;
}
.search-icon-button {
  background: transparent;
  border: 1px solid #ced4da;
  border-left: none;
}
.search-icon-button .search-icon {
  transition: color 150ms ease-in;
}
.search-icon-button:hover,
.search-icon-button:active,
.search-icon-button:focus {
  background-color: transparent !important;
  border-color: #ced4da !important;
}
.search-icon-button:hover .search-icon,
.search-icon-button:active .search-icon,
.search-icon-button:focus .search-icon {
  color: var(--accent) !important;
}
.filter-dropdown-form {
  min-width: 300px;
}
/* table container */
.table-container {
  overflow: auto hidden;
  overflow-x: auto;
  overflow-y: hidden;
}
.table-container .item-table {
  min-width: 1000px;
}
/* table styling */
.item-table .table-header-text {
  font-size: 0.8rem;
}
/* >>> deep selector */
.item-table >>> th.actions-row {
  display: none;
}
.item-table >>> td.actions-row {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-width: 400px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
}
.item-table >>> th.actions-row,
.item-table >>> td.actions-row {
  position: absolute;
  border: none;
  right: 0;
  opacity: 0;
  padding: 0.75rem 0;
  visibility: hidden;
  transition: all 150ms ease-in-out;
}
/* .item-table >>> tr:hover td.actions-row {
  opacity: 1;
  padding: 0.75rem;
  visibility: visible;
} */
</style>