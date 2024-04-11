<template>
  <div
    @click="selectAnswer(answer)"
    :class="{
      // 'bg-[#ffffff]': goodAnswer == null || goodAnswer.ID_Answer == undefined,
      'bg-[#ffffff]': answering == true,
      'bg-[#ed4e4e] border-[#d63d3d] duration-200':
        // goodAnswer !== null &&
        // goodAnswer.ID_Answer !== undefined &&
        // goodAnswer.ID_Answer !== answer.ID_Answer,
        answer.quizAnswer.Is_QuizAnswer == false && answering == false,
      'bg-[#614ddf] border-[#5340cd] duration-200':
        // goodAnswer !== null && goodAnswer.ID_Answer === answer.ID_Answer,
        answer.quizAnswer.Is_QuizAnswer == true && answering == false,
      'shadow-red-600 shadow-lg':
        // answer == selectedAnswer &&
        // goodAnswer !== null &&
        // goodAnswer.ID_Answer !== answer.ID_Answer,
        answer == selectedAnswer &&
        answer.quizAnswer.Is_QuizAnswer == false &&
        answering == false,

      'shadow-[#614ddf] shadow-lg':
        // answer == selectedAnswer &&
        // goodAnswer !== null &&
        // goodAnswer.ID_Answer === answer.ID_Answer,
        answer == selectedAnswer &&
        answer.quizAnswer.Is_QuizAnswer == true &&
        answering == false,
    }"
    class="w-[20vw] lg:w-[23vw] xs:w-[21vw] border-t border-l border-r-4 border-b-4 rounded-md shadow duration-200 p-1 lg:p-2 hover:shadow-lg active:w-[24vw] md:active:w-[22vw] xs:active:-[21vw ]"
  >
    <p
      :class="{ 'text-[#f4b44e]': selectedAnswer === answer }"
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
  answering: Boolean,
});

const emit = defineEmits(["selectAnswer"]);

function selectAnswer(answer) {
  if (answer == props.selectedAnswer) {
    answer = null;
  }
  emit("selectAnswer", answer);
}

console.log(props.answer.quizAnswer.Is_QuizAnswer);
</script>

<style scoped>
.active {
  color: green;
}
</style>
