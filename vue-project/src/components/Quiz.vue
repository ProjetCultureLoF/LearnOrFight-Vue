<template>
  <div id="answers" class="flex flex-col items-center text-center w-1/2 gap-5">
    <h1 class="">{{ quiz.Question_Quiz }}</h1>
    <h3 class="">{{ quiz.themes[0].Title_Theme }}</h3>
    <h2 v-if="admin == false" class="duration-200">{{ time }}</h2>
    <slot></slot>
    <div class="flex flex-wrap gap-5 justify-center items-center max-w-full">
      <Answers
        v-for="(answer, index) in quiz.answers"
        :key="index"
        :answer="answer"
        :selectedAnswer="selectedAnswer"
        :goodAnswer="goodAnswer"
        @selectAnswer="selectAnswer"
      >
        <button v-if="admin" class="duration-200 rounded-md p-2">
          Modifier
        </button>
      </Answers>
    </div>
  </div>
  <div v-if="admin == false" class="flex flex-col justify-center items-center">
    <button
      v-if="waitNext == false"
      @click="isAnswer(selectedAnswer)"
      class="duration-200 rounded-md p-4 text-xs lg:text-2xl shadow"
    >
      Valider
    </button>
    <button
      v-else
      @click="nextQuestion"
      class="duration-200 rounded-md p-4 text-xs lg:text-2xl shadow"
    >
      Prochaine question
    </button>
    <p v-if="errorMessages != ''">{{ errorMessages }}</p>
  </div>
</template>

<script setup>
import Answers from "./Answers.vue";
import { api } from "@/plugins/requete";
import { ref, watch } from "vue";

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
const errorMessages = ref("");
const time = props.admin ? ref(0) : ref(30);
const goodAnswer = ref(null);
function selectAnswer(answer) {
  console.log(answer);

  selectedAnswer.value = answer;
}

async function isAnswer(answer) {
  if (answer != null) {
    const response = await api.get(
      `/quizAnswers/?quizIDQuiz=${props.quiz.ID_Quiz}&Is_QuizAnswer=1`
    );

    if (answer.ID_Answer == response.data[0].answer.ID_Answer) {
      goodAnswer.value = response.data[0].answer;

      emit("validate", true);
    } else {
      goodAnswer.value = response.data[0].answer;

      emit("validate", false);
    }
    errorMessages.value = "";
  } else {
    errorMessages.value = "Vous devez selectionner une réponse";
  }
}
function nextQuestion() {
  selectedAnswer.value = null;
  goodAnswer.value = null;
  emit("nextQuestion");
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
      isAnswer({ ID_Answer: 0 });
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
