<template>
  <div id="answers">
    <h1>{{ quiz.Question_Quiz }}</h1>
    <h3>{{ quiz.themes[0].Title_Theme }}</h3>
    <h4 v-if="admin == false">{{ time }}</h4>
    <slot></slot>

    <Answers
      v-for="(answer, index) in quiz.answers"
      :key="index"
      :answer="answer"
      @selectAnswer="selectAnswer(answer)"
    >
      <button v-if="admin">Modifier</button>
    </Answers>
  </div>
  <div v-if="admin == false">
    <button v-if="waitNext == false" @click="isAnswer(selectedAnswer)">
      Valider
    </button>
    <p v-if="errorMessages != ''">{{ errorMessages }}</p>
  </div>
</template>

<script setup>
import Answers from "./Answers.vue";
import { api } from "@/plugins/requete";
import { inject, provide, ref, watch } from "vue";

const emit = defineEmits(["nextQuestion"]);

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
    emit("nextQuestion", response.data.Is_QuizAnswer);
    errorMessages.value = "";
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
      emit("nextQuestion", false);
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
