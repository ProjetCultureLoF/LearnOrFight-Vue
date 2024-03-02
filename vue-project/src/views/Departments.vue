<template>
  {{ $route.params.dep }}
  <div v-if="quizes.length > 0">
    <Quiz :quiz="quizes[currentQuiz]" @nextQuestion="nextQuestion" />
  </div>
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

async function getQuizes() {
  const departments = await api.get(
    `/departments/?Name_Department=${route.params.dep}`
  );
  console.log(departments.data);
  const themeQuizes = await api.get(
    `/themeQuiz/?themeIDTheme=${departments.data[0].themes[0].ID_Theme}`
  );
  console.log(themeQuizes.data);
  for (let i = 0; i < themeQuizes.data.length; i++) {
    const quizesApi = await api.get(
      `/quiz/byId/${themeQuizes.data[i].quizIDQuiz}`
    );
    quizes.value.push(quizesApi.data);
    console.log(quizes.value);
  }
}

function nextQuestion(answer) {
  if (currentQuiz.value + 1 < quizes.value.length) {
    currentQuiz.value++;
  }
  if (answer) {
    goodAnswer.value += 1;
  } else {
    badAnswer.value += 1;
  }
}

onMounted(async () => {
  await getQuizes();
});
</script>
