<template>
  <div
    id="answer"
    @click="selectAnswer(answer)"
    :class="{ active: isActive == answer ? true : false }"
  >
    {{ answer.Text_Answer }}
  </div>
  <slot></slot>
</template>

<script setup>
import { ref } from "vue";
import { inject } from "vue";

const props = defineProps({
  answer: Object,
});

const emit = defineEmits(["selectAnswer"]);

const isActive = inject("changeColor");

function selectAnswer(answer) {
  emit("selectAnswer", answer);
}
</script>

<style scoped>
.active {
  color: green;
}
</style>
