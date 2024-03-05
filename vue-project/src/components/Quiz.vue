<template>
  <div id="answers" class="flex flex-col items-center text-center w-1/2 gap-5">
    <p class="font-bold text-5xl">{{ quiz.Question_Quiz }}</p>
    <p class="font-semibold text-3xl">{{ quiz.themes[0].Title_Theme }}</p>
    <p v-if="admin == false" class="font-bold text-3xl">{{ time }}</p>
    <slot></slot>
    <div class="flex flex-wrap gap-5 justify-center items-center max-w-full">
      <Answers
        v-for="(answer, index) in quiz.answers"
        :key="index"
        :answer="answer"
        @selectAnswer="selectAnswer(answer)"
      >
        <button
          v-if="admin"
          class="bg-[#5b90b3cc] hover:bg-[#467798cc] duration-200 rounded-md p-2"
        >
          Modifier
        </button>
      </Answers>
    </div>
  </div>
  <div v-if="admin == false" class="flex flex-col justify-center items-center">
    <button
      v-if="waitNext == false"
      @click="isAnswer(selectedAnswer)"
      class="bg-[#745cbccc] hover:bg-[#634ca8cc] duration-200 rounded-md p-2"
    >
      Valider
    </button>
    <button
      v-else
      @click="$emit('nextQuestion')"
      class="bg-slate-400 rounded-md p-2"
    >
      Prochaine question
    </button>
    <p v-if="errorMessages != ''">{{ errorMessages }}</p>
  </div>
</template>

<script setup>
import Answers from "./Answers.vue";
import { api } from "@/plugins/requete";
import { inject, provide, ref, watch } from "vue";

const emit = defineEmits(["validate", "nextQuestion"]);

const props = defineProps({
  quiz: Object,
  admin: {
    type: Boolean,
    default: false,
  },
  waitNext: {
    type: Boolean,
    default: false,
  },
});

const selectedAnswer = ref(null);
provide("changeColor", selectedAnswer);
const errorMessages = ref("");
const time = ref(30);

function selectAnswer(answer) {
  selectedAnswer.value = answer;
}

async function isAnswer(answer) {
  if (answer != null) {
    const response = await api.get(
      `/quizAnswers/?answerIDAnswer=${answer.ID_Answer}`
    );
    emit("validate", response.data.Is_QuizAnswer);
    errorMessages.value = "";
    selectedAnswer.value = null;
  } else {
    errorMessages.value = "Vous devez selectionner une réponse";
  }
}

watch(
  () => time.value,
  (count) => {
    if (count > 0 && props.waitNext == false) {
      setTimeout(() => {
        time.value--;
      }, 1000);
    }
    if (count == 0) {
      emit("validate", false);
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => props.waitNext,
  (newWaitNext) => {
    if (newWaitNext == false) {
      time.value = 30;
    }
  }
);
</script>
