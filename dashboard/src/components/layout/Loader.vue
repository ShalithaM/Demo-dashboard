<template>
  <div id="loader-bg">
    <div id="loader-el">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
    </div>
  </div>
</template>

<style scoped>
#loader-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  top: 0;
  background-color: var(--white);
  opacity: 0.6;
  z-index: 10000;
}
#loader-el {
  margin: auto;
}
</style>
