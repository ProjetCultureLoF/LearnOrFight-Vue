<template>
  <div id="answers">
    <h1>{{ quiz.Question_Quiz }}</h1>
    <h3>{{ quiz.themes[0].Title_Theme }}</h3>
    <Answers
      v-for="(answer, index) in quiz.answers"
      :key="index"
      :answer="answer"
      @selectAnswer="selectAnswer(answer)"
    >
      <button v-if="admin">Modifier</button>
    </Answers>
    <slot></slot>
  </div>
  <button v-if="admin == false" @click="isAnswer(selectedAnswer)">
    Valider
  </button>
  <p v-if="errorMessages != ''">{{ errorMessages }}</p>
</template>

<script setup>
import Answers from "./Answers.vue";
import { api } from "@/plugins/requete";
import { provide, ref } from "vue";

const emit = defineEmits(["nextQuestion"]);

const props = defineProps({
  quiz: Object,
  admin: {
    type: Boolean,
    default: false,
  },
});

const selectedAnswer = ref(null);
provide("changeColor", selectedAnswer);
const errorMessages = ref("");

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
</script>
