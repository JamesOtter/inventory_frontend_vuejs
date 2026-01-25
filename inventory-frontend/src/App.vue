<template>
  <div>
    <Navbar />
    <Toast />

    <!-- This will render the current page -->
    <router-view />
  </div>
  
  
</template>

<script>
  import Navbar from './components/Navbar.vue';
  import Toast from './components/Toast.vue';

  export default {
    components: { Navbar, Toast }
  };
</script>