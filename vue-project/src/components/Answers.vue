<template>
  <div
    @click="selectAnswer(answer)"
    :class="{
      'bg-[#5487d9] hover:bg-[#3f72c4] duration-200': isActive == answer,
    }"
    class="w-[400px] bg-gray-200 rounded-md hover:bg-gray-300 duration-200 p-1"
  >
    <p class="text-2xl font-semibold">{{ answer.Text_Answer }}</p>
  </div>
  <slot></slot>
</template>

<script setup>
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
