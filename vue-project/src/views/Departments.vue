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
    <Progress :list="quizes" :current="currentQuiz" :wasTrue="wasTrue" />
  </div>
</template>

<script setup>
import Quiz from "@/components/Quiz.vue";
import { onMounted, ref } from "vue";
import { api } from "@/plugins/requete";
import { useRoute } from "vue-router";
import Progress from "@/components/Progress.vue";
const route = useRoute();

const quizes = ref([]);
const currentQuiz = ref(0);

const goodAnswer = ref(0);
const badAnswer = ref(0);
const wasTrue = ref(null);
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
  }
  wasTrue.value = null;
}

onMounted(async () => {
  await getQuizes();
});
</script>
