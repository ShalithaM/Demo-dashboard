<template>
  <b-navbar
    :variant="mode"
    :type="mode"
    class="d-flex flex-row justify-content-between align-items-center px-3 px-md-6 light navbar-light"
    :class="isCollapse ? 'top-navbar collapsed' : 'top-navbar'"
  >
    <b-row class="d-flex flex-row align-items-center justify-content-start mx-0">
      <h5 class="text-left mb-0 dark">Equipment Dashboard</h5>
    </b-row>
  </b-navbar>
</template>
<script>
/* eslint-disable no-console */

import { mapGetters } from "vuex";

export default {
  name: "TopBar",
  props: {
    mode: {
      default: "light",
      type: String
    }
  },
  data() {
    return {
      key: Number(new Date())
    };
  },
  computed: {
    ...mapGetters({
      isCollapse: "getIsShowSideMenu"
    })
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-navbar {
  /* background-color: var(--white); */
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  max-width: calc(100% - 200px);
  height: 50px;
  z-index: 200;
  top: 0;
  right: 0;
  transition: max-width 300ms cubic-bezier(0.2, 0, 0, 1) 0s,
    background-color 300ms cubic-bezier(0.2, 0, 0, 1) 0s;
}
/* collapsed state design */
.top-navbar.collapsed {
  max-width: calc(100% - 80px);
}
/* top nav item design for both light/dark mode */
.navbar-light .navbar-nav .top-nav-item,
.navbar-dark .navbar-nav .top-nav-item {
  height: 40px;
  width: 40px;
  border-radius: 2px;
  transition: background-color 100ms linear 0s, color 150ms linear 0s,
    max-width 300ms cubic-bezier(0.2, 0, 0, 1) 0s;
}
/* top nav item hover state for light mode */
.navbar-light .navbar-nav .top-nav-item:hover {
  background-color: var(--primary);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
/* top nav item hover state for dark mode */
.navbar-dark .navbar-nav .top-nav-item:hover {
  background-color: var(--light);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
/* nav link color for light mode */
.navbar-light .navbar-nav a.nav-link {
  color: var(--dark);
  padding: 0.5rem;
  transition: color 150ms ease-in-out;
}
/* nav link color for dark mode */
.navbar-dark .navbar-nav a.nav-link {
  color: var(--light);
  padding: 0.5rem;
  transition: color 150ms ease-in-out;
}
/* nav link hover color for light mode */
.navbar-light .navbar-nav .top-nav-item:hover a.nav-link {
  color: var(--white);
}
/* nav link hover color for dark mode */
.navbar-dark .navbar-nav .top-nav-item:hover a.nav-link {
  color: var(--dark);
}
/* active link color for both light/dark mode */
.navbar-light .navbar-nav a.nav-link.active,
.navbar-dark .navbar-nav a.nav-link.active {
  color: var(--accent);
}
.top-nav-icon .b-icon {
  color: inherit;
  transition: color 100ms linear 0s;
}
/* notificiations button nav item for both light/dark mode */
.navbar-light .navbar-nav .top-nav-item.notification-button,
.navbar-dark .navbar-nav .top-nav-item.notification-button {
  z-index: 1036;
}
/* notificiations button nav item (toggled state) for both light/dark mode */
.navbar-light .navbar-nav .top-nav-item.notification-button.toggled,
.navbar-dark .navbar-nav .top-nav-item.notification-button.toggled {
  background-color: transparent;
}
/* notificiations button nav item (toggled hover state) for light mode */
.navbar-light .navbar-nav .top-nav-item.notification-button.toggled:hover {
  color: var(--dark);
  background-color: transparent;
  box-shadow: none;
}
/* notificiations button nav item (toggled hover state) for dark mode */
.navbar-dark .navbar-nav .top-nav-item.notification-button.toggled:hover {
  color: var(--dark);
  background-color: transparent;
  box-shadow: none;
}
/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {
  .top-navbar.collapsed {
    max-width: calc(100% - 60px);
  }
}
</style>