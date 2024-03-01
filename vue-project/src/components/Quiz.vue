<template>
  <div id="answeres">
    <h1>{{ quiz.Question_Quiz }}</h1>
    <h3>{{ quiz.themes[0].Title_Theme }}</h3>

    <slot></slot>
    <Answers
      v-for="(answer, index) in quiz.answers"
      :key="index"
      :answer="answer"
    />
  </div>
</template>

<script setup>
import Answers from "./Answers.vue";
const props = defineProps({
  quiz: Object,
});
</script>
