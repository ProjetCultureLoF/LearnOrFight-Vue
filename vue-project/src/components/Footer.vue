<template>
  <footer
    class="flex fixed bottom-0 bg-opacity-45 bg-black w-full text-center justify-center"
  >
    <p class="text-white">
      © {{ new Date().getFullYear() }} Tous droits réservés. Learn or Fight.
    </p>
  </footer>
</template>

<script setup>
import { ref } from "vue";
</script>
