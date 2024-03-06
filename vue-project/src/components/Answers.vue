<template>
  <div
    @click="selectAnswer(answer)"
    :class="{
      'bg-[#023E74] duration-200': selectedAnswer == answer,
    }"
    class="w-[20vw] lg:w-[23vw] bg-[#ffffff] border-t border-l border-r-4 border-b-4 rounded-md shadow duration-200 p-1 lg:p-2 hover:shadow-lg active:w-[24vw]"
  >
    <p
      :class="{ 'text-[#BF6415] drop-shadow': selectedAnswer === answer }"
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
  if (answer == props.selectedAnswer) {
    answer = null;
  }

  emit("selectAnswer", answer);
}
</script>

<style scoped>
.active {
  color: green;
}
</style>
