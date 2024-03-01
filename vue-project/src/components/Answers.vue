<template>
  <div id="answer">
    {{ answer.Text_Answer }}
  </div>
</template>

<script setup>
const props = defineProps({
  answer: Object,
});
</script>
