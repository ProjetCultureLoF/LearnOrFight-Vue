<template>
  <footer
    class="flex absolute bg-opacity-45 bg-black w-full text-center justify-center"
  >
    <div class="container">
      <p>© {{ date }} Tous droits réservés. Learn or Fight.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
const date = ref(new Date());
</script>
