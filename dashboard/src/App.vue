<template>
  <div id="app" class="h-100 w-100" >
     <SideBar/>
     <TopBar/>
     <Loader v-if="isLoading" />
    <router-view/>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

/* eslint-disable no-console */
// components
import TopBar from "@/components/layout/TopBar";
import SideBar from "@/components/layout/SideBar";
import Loader from "@/components/layout/Loader";



export default {
  name: "App",
  components: {
    TopBar,
    SideBar,
    Loader
  },
  computed: {
    ...mapGetters({
      isLoading: "getIsloading",
    })
  }
};
</script>


<style>
html,
body {
  height: 100%;
}
#app {
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--dark);
}
/* custom bg colors */
.bg-dark-secondary {
  background-color: var(--dark-secondary);
}
</style>
