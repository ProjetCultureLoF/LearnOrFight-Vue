<template>
  <div class="flex flex-col justify-center items-center place-self-center">
    <div
      v-if="isFinished"
      class="flex flex-col justify-center items-center place-self-center mt-24 gap-8"
    >
      <h1 class="text-shadow-sm shadow-black">Vous avez terminé le quiz !</h1>
      <h2
        class="text-[#614ddf] text-shadow-lg shadow-[#614ddf] duration-200 hover:text-shadow"
      >
        Bonnes réponses: {{ goodAnswer }}
      </h2>
      <h2
        class="text-[#ed4e4e] text-shadow-lg shadow-[#ed4e4e] duration-200 hover:text-shadow"
      >
        Mauvaises réponses: {{ badAnswer }}
      </h2>
      <h1>{{ score }}</h1>
    </div>

    <div
      v-else-if="quizes.length > 0"
      class="flex flex-col justify-center items-center place-self-center mt-24 gap-10"
    >
      <Quiz
        :quiz="quizes[currentQuiz].quiz"
        @validate="waitNextQuestion"
        @nextQuestion="nextQuestion"
        :waitNext="waitNext"
      >
      </Quiz>
    </div>
    <Progress
      :list="quizes"
      :current="currentQuiz"
      :listWasTrue="listWasTrue"
    />
  </div>
</template>

<script setup>
import Quiz from "@/components/Quiz.vue";
import { onMounted, ref, provide } from "vue";

import { api } from "@/plugins/requete";
import { useRoute } from "vue-router";
import Progress from "@/components/Progress.vue";
import Cookies from "js-cookie";
const route = useRoute();

const quizes = ref([]);
const currentQuiz = ref(0);

const goodAnswer = ref(0);
const badAnswer = ref(0);
const wasTrue = ref(null);
const isFinished = ref(false);

const waitNext = ref(false);
const score = ref(0);

const listWasTrue = ref([]);

async function getQuizes() {
  const response = await api.get(
    `departmentQuizzes/?Name_Department=${route.params.dep}`
  );

  quizes.value = response.data;
  console.log("Liste de quizzes: ", quizes.value);

  const response2 = await api.get(
    `userAnswers/?Token_User=${Cookies.get("token")}`
  );

  console.log("Liste de quizzes répondus: ", response2.data);

  if (response2.data.length > 0) {
    listWasTrue.value = isQuizStarted(response2.data);
    console.log("List Was True 79: ", listWasTrue);
  }
}

function isQuizStarted(quizList) {
  console.log("Quiz Actuelle: ", quizes.value[currentQuiz.value]);
  const tempWasTrueList = [];
  quizList.forEach((quiz) => {
    if (quiz.quizIDQuiz == quizes.value[currentQuiz.value].quiz.ID_Quiz) {
      // console.log(quiz.Answer_UserAnswer);
      tempWasTrueList.push(quiz.Answer_UserAnswer);
      // wasTrue.value = quiz.Answer_UserAnswer;
      currentQuiz.value++;
      // isQuizStarted(quizList);
    }
    console.log("WasTrueList", tempWasTrueList);
  });
  return tempWasTrueList;
}

function waitNextQuestion(response) {
  if (response) {
    goodAnswer.value += 1;
  } else {
    badAnswer.value += 1;
  }

  wasTrue.value = response;
  listWasTrue.value.push(response);
  api.post(
    `/userAnswers/${Cookies.get("token")}/${
      quizes.value[currentQuiz.value].quiz.ID_Quiz
    }/${response}`
  );
  waitNext.value = true;
}

function nextQuestion() {
  if (currentQuiz.value < quizes.value.length) {
    currentQuiz.value++;
    waitNext.value = false;
  }
  if (currentQuiz.value == quizes.value.length) {
    isFinished.value = true;
    score.value = goodAnswer.value * 150;
    console.log(Cookies.get("token"));
    api.post(
      `/scores/${Cookies.get("token")}/${route.params.dep}/${score.value}`
    );
  }
  wasTrue.value = null;
}

onMounted(async () => {
  await getQuizes();
  const response = await api.get(
    `/scores/${Cookies.get("token")}/${route.params.dep}`
  );
  if (response.data) {
    isFinished.value = true;
    score.value = response.data.User_Score;
    goodAnswer.value = score.value / 150;
    badAnswer.value = quizes.value.length - goodAnswer.value;
  }
});
</script>
