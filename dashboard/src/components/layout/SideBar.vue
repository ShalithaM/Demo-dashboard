<template>
  <b-navbar
    :variant="mode"
    :type="mode"
    class="d-flex flex-column justify-content-between align-items-center px-0 py-0"
    :class="isCollapse ? 'side-navbar collapsed' : 'side-navbar'"
  >
    <b-navbar-brand class="px-0 px-md-1 mx-auto my-1" to="/">
      <!-- the logo comes here -->
      <h2 v-if="isCollapse">LG</h2>
      <h2 v-else>LOGO</h2>
    </b-navbar-brand>

    <b-icon
      :icon="isCollapse ? 'arrow-right-short' : 'arrow-left-short'"
      class="collapse-icon"
      @click="toggleCollapse"
    ></b-icon>

    <b-col
      id="nav-collapse"
      class="d-flex flex-column justify-content-between align-items-center"
      is-nav
    >
      <b-navbar-nav class="d-flex flex-column py-3 py-md-0">
        <template v-for="(item, index) in menuArrayTop">
          <!-- @click.prevent is to prevent default behavior of anchor tag (that is in the b-nav-item component) -->
          <b-nav-item
            :key="key + index"
            :href="item.route"
            @click.prevent
            :active="sideMenuIndex == index ? true : false"
            class="my-2"
            :class="isCollapse ? 'side-nav-item collapsed' : 'side-nav-item'"
          >
            <b-row
              class="d-flex flex-row align-items-center justify-content-start side-nav-item-row mx-auto"
            >
              <b-icon
                font-scale="2"
                :icon="item.icon"
                class="d-flex jusify-content-center align-items-center side-nav-icon"
                :class="isCollapse ? 'px-1' : 'pr-2'"
              ></b-icon>
              <span
                class="text-left pl-2"
                :class="isCollapse ? 'side-nav-text collapsed' : 'side-nav-text'"
              >{{item.label}}</span>
            </b-row>
          </b-nav-item>
        </template>
      </b-navbar-nav>
    </b-col>
  </b-navbar>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  props: {
    mode: {
      default: "light",
      type: String
    }
  },
  data() {
    return {
      isCollapse: false,
      key: Number(new Date()),
      menuArrayTop: [],
    };
  },
  computed: {
    ...mapGetters({
      sideMenuIndex: "getSideMenuIndex"
    })
  },
  created() {
    this.menuArrayTop = [
      {
        icon: "columns",
        label: "Dashboard",
        route: "/"
      }
    ];
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$store.dispatch("setIsShowSideMenu", this.isCollapse);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-navbar {
  /* background-color: var(--white); */
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 200px;
  max-width: 200px;
  min-height: 100vh;
  z-index: 200;
  top: 0;
  bottom: 0;
  left: 0;
  transition: max-width 300ms cubic-bezier(0.2, 0, 0, 1) 0s,
    background-color 300ms cubic-bezier(0.2, 0, 0, 1) 0s;
}
/* collapsed state design */
.side-navbar.collapsed {
  max-width: 80px;
}
.logo-img {
  height: 40px;
}
.collapse-icon {
  position: absolute;
  opacity: 0;
  right: -12px;
  top: 60px;
  width: 24px;
  height: 24px;
  font-size: 0.3rem;
  z-index: 500;
  color: var(--accent);
  background-color: var(--white);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 100ms linear 0s, color 100ms linear 0s,
    opacity 300ms cubic-bezier(0.2, 0, 0, 1) 0s,
    transform 300ms cubic-bezier(0.2, 0, 0, 1) 0s;
}
.collapse-icon:hover {
  color: var(--white);
  background-color: var(--accent);
}
#nav-collapse {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
}
/* scrollbar size fix for webkit browsers (chrome/safari) */
.nav-collapse::-webkit-scrollbar {
  width: 0.5rem;
  scrollbar-width: thin;
}
.nav-collapse::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f0f0f0;
}
.nav-collapse::-webkit-scrollbar-thumb {
  background-color: #cdcdcd;
}
.icon-left-open {
  padding-right: 0.65rem !important;
}
.icon-right-open {
  padding-left: 0.65rem !important;
}
.side-navbar:hover .collapse-icon {
  opacity: 1;
}
/* side nav design for both light/dark mode */
.navbar-light .navbar-nav .side-nav-item,
.navbar-dark .navbar-nav .side-nav-item {
  width: 180px;
  border-radius: 2px;
  transition: background-color 100ms linear 0s, color 100ms linear 0s,
    max-width 300ms cubic-bezier(0.2, 0, 0, 1) 0s;
}
/* nav item hover state for light mode */
.navbar-light .navbar-nav .side-nav-item:hover {
  background-color: var(--primary);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
/* nav item hover state for dark mode */
.navbar-dark .navbar-nav .side-nav-item:hover {
  background-color: var(--light);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
/* collapsed state design for both light/dark mode */
.navbar-light .navbar-nav .side-nav-item.collapsed,
.navbar-dark .navbar-nav .side-nav-item.collapsed {
  width: 50px;
  border-radius: 2px;
}
/* nav link color for light mode */
.navbar-light .navbar-nav a.nav-link {
  color: var(--dark);
  padding: 0.5rem;
  transition: color 150ms ease-in;
}
/* nav link color for dark mode */
.navbar-dark .navbar-nav a.nav-link {
  color: var(--light);
  padding: 0.5rem;
  transition: color 150ms ease-in;
}
/* nav link hover color for light mode */
.navbar-light .navbar-nav .side-nav-item:hover a.nav-link {
  color: var(--white);
}
/* nav link hover color for dark mode */
.navbar-dark .navbar-nav .side-nav-item:hover a.nav-link {
  color: var(--dark);
}
/* active link color for both light/dark mode */
.navbar-light .navbar-nav a.nav-link.active,
.navbar-dark .navbar-nav a.nav-link.active {
  color: var(--accent);
}
/* .navbar-light .navbar-nav .side-nav-item:hover a.nav-link.active {
  color: var(--accent);
} */
.side-nav-icon {
  color: inherit;
  transition: color 150ms ease-in;
}
.side-nav-text {
  font-size: 1rem;
  color: inherit;
  transition: color 150ms ease-in, opacity 300ms cubic-bezier(0.2, 0, 0, 1) 0s;
  opacity: 1;
  display: block;
}
.side-nav-text.collapsed {
  opacity: 0;
  display: none;
}
/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {
  .side-navbar.collapsed {
    max-width: 60px;
  }
  .collapse-icon {
    opacity: 1;
  }
}
/* smartphones, touchscreens */
@media (hover: none) and (pointer: coarse) {
  .collapse-icon {
    opacity: 1;
  }
}
</style>