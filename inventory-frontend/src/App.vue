<template>
  <div>
    <Navbar />

    <!-- This will render the current page -->
    <router-view />
  </div>
  
  
</template>

<script>
  import Navbar from './components/Navbar.vue';

  export default {
    components: { Navbar }
  };
</script>