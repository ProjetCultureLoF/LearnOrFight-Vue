<template>
  <div v-if="isFinished">
    <h1>Vous avez terminé le quiz !</h1>
    <h2>{{ goodAnswer }}</h2>
    <h2>{{ badAnswer }}</h2>
  </div>
  <div
    v-else-if="quizes.length > 0"
    class="flex flex-col justify-center items-center place-self-center mt-24 gap-8"
  >
    <Quiz
      :quiz="quizes[currentQuiz]"
      @validate="waitNextQuestion"
      @nextQuestion="nextQuestion"
      :waitNext="waitNext"
    >
    </Quiz>
  </div>
  <!-- <button v-if="waitNext" @click="nextQuestion" class="flex place-self-center">
    Prochaine question
  </button> -->
</template>

<script setup>
import Quiz from "@/components/Quiz.vue";
import { onMounted, ref } from "vue";
import { api } from "@/plugins/requete";
import { useRoute } from "vue-router";

const route = useRoute();

const quizes = ref([]);
const currentQuiz = ref(0);

const goodAnswer = ref(0);
const badAnswer = ref(0);
const isFinished = ref(false);

const waitNext = ref(false);

async function getQuizes() {
  const departments = await api.get(
    `/departments/?Name_Department=${route.params.dep}`
  );
  //console.log(departments.data);
  const themeQuizes = await api.get(
    `/themeQuiz/?themeIDTheme=${departments.data[0].themes[0].ID_Theme}`
  );
  //console.log(themeQuizes.data);
  for (let i = 0; i < themeQuizes.data.length; i++) {
    const quizesApi = await api.get(
      `/quiz/byId/${themeQuizes.data[i].quizIDQuiz}`
    );
    quizes.value.push(quizesApi.data);
    //console.log(quizes.value);
  }
}

function waitNextQuestion(answer) {
  if (answer) {
    goodAnswer.value += 1;
  } else {
    badAnswer.value += 1;
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
  }
}

onMounted(async () => {
  await getQuizes();
});
</script>
