<template>
  <div id="app" class="h-100 w-100" >
     <SideBar/>
     <TopBar/>
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable no-console */
// components
import TopBar from "@/components/layout/TopBar";
import SideBar from "@/components/layout/SideBar";


export default {
  name: "App",
  components: {
    TopBar,
    SideBar,
  },
  data() {
    return {
      key: Number(new Date())
    };
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
