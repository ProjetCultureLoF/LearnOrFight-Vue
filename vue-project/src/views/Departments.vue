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
      class="flex flex-col justify-center items-center place-self-center mt-24 gap-8"
    >
      <Quiz
        :quiz="quizes[currentQuiz].quiz"
        @validate="waitNextQuestion"
        @nextQuestion="nextQuestion"
        :waitNext="waitNext"
      >
      </Quiz>
    </div>
    <Progress :list="quizes" :current="currentQuiz" :wasTrue="wasTrue" />
  </div>
</template>

<script setup>
import Quiz from "@/components/Quiz.vue";
import { onMounted, ref } from "vue";
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
async function getQuizes() {
  // const response = await api.get(`quiz/byDepartment/used/${route.params.dep}`);
  const response2 = await api.get(
    `departmentQuizzes/?Name_Department=${route.params.dep}`
  );
  console.log(response2.data);
  // console.log(response.data);
  // quizes.value = randomizeList(response.data);
  quizes.value = response2.data;
  console.log(quizes.value);
}

function randomizeList(arr) {
  const newArray = [];

  for (let i = 3; i > 0; i--) {
    const j = Math.floor(Math.random() * arr.length);
    newArray.push(arr[j]);
    arr.splice(j, 1);
  }
  console.log("NewArray:", newArray);
  return newArray;
}

function waitNextQuestion(answer) {
  if (answer) {
    goodAnswer.value += 1;
    wasTrue.value = true;
  } else {
    badAnswer.value += 1;
    wasTrue.value = false;
  }

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
