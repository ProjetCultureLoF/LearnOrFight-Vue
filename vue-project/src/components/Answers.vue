<template>
  <div
    @click="selectAnswer(answer)"
    :class="{
      'bg-blue-400 hover:bg-blue-400 duration-200': selectedAnswer == answer,
    }"
    class="w-[20vw] lg:w-[23vw] bg-gray-200 rounded-md hover:bg-blue-300 hover:w-[24vw] shadow duration-200 p-1 lg:p-2"
  >
    <p
      class="text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold"
    >
      {{ answer.Text_Answer }}
    </p>
  </div>
  <slot></slot>
</template>

<script setup>
const props = defineProps({
  answer: Object,
  selectedAnswer: Object,
});

const emit = defineEmits(["selectAnswer"]);

function selectAnswer(answer) {
  emit("selectAnswer", answer);
}
</script>

<style scoped>
.active {
  color: green;
}
</style>
