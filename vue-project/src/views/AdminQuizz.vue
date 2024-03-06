<template>
  <div class="flex flex-col gap-10 items-center text-center">
    <div
      class="flex flex-col justify-center items-center place-self-center mt-24 gap-8"
    >
      <Quiz
        v-for="(quiz, index) in quizes"
        :key="index"
        :quiz="quiz"
        :admin="true"
      >
        <button
          @click="deleteQuiz(quiz.ID_Quiz)"
          class="duration-200 rounded-md p-2 w-fit"
        >
          Supprimer
        </button>
      </Quiz>
    </div>

    <div id="quiz" class="flex flex-row gap-2 text-center items-center m-8">
      <input
        type="text"
        v-model="quizName"
        placeholder="Nom du Quiz"
        class="bg-gray-100 rounded p-1"
      />

      <input
        type="radio"
        name="goodAnswer"
        :value="0"
        v-model="goodAnswer"
        checked
        @click="goodAnswer = 0"
      />
      <input
        type="text"
        v-model="a1"
        placeholder="Question N°1"
        class="bg-gray-100 rounded p-1"
      />

      <input
        type="radio"
        name="goodAnswer"
        :value="1"
        v-model="goodAnswer"
        @click="goodAnswer = 1"
      />
      <input
        type="text"
        v-model="a2"
        placeholder="Question N°2"
        class="bg-gray-100 rounded p-1"
      />

      <input
        type="radio"
        name="goodAnswer"
        :value="2"
        v-model="goodAnswer"
        @click="goodAnswer = 2"
      />
      <input
        type="text"
        v-model="a3"
        placeholder="Question N°3"
        class="bg-gray-100 rounded p-1"
      />

      <input
        type="radio"
        name="goodAnswer"
        :value="3"
        v-model="goodAnswer"
        @click="goodAnswer = 3"
      />
      <input
        type="text"
        v-model="a4"
        placeholder="Question N°4"
        class="bg-gray-100 rounded p-1"
      />
      <label for="type-rental">Theme:</label>
      <select
        name="Theme"
        v-model="themesValue"
        class="bg-gray-100 rounded p-1"
      >
        <option v-for="theme in themes" :key="theme.ID_Theme">
          {{ theme.Title_Theme }}
        </option>
      </select>
      <button
        @click="createQuiz"
        class="bg-[#5b90b3cc] hover:bg-[#467798cc] duration-200 rounded-md p-2"
      >
        Créer quiz
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import Quiz from "@/components/Quiz.vue";
import { api } from "@/plugins/requete";
const quizName = ref("");
const a1 = ref("");
const a2 = ref("");
const a3 = ref("");
const a4 = ref("");
const goodAnswer = ref(0);
const themes = ref(null);
const themesValue = ref("");

const quizes = ref([]);
const questions = computed(() => {
  return [a1, a2, a3, a4];
});

async function getQuizes() {
  const tempValue = await api.get(`/quiz`);
  console.log(tempValue.data);

  quizes.value = tempValue.data;
}
async function getThemes() {
  const tempValue = await api.get(`/themes`);
  console.log(tempValue.data);

  themes.value = tempValue.data;
  themes.value = tempValue.data;
}

onBeforeMount(async () => {
  await getQuizes();
  await getThemes();
});

async function deleteQuiz(quizId) {
  try {
    await api.delete(`quiz/byId/${quizId}`).then((response) => {
      console.log(response.data);
      quizes.value = quizes.value.filter((quiz) => quiz.ID_Quiz != quizId);
    });
  } catch (error) {
    console.log(error);
  }
}

async function createQuiz() {
  let isGoodAnswer = 0;
  try {
    await api.post(`/quiz/${quizName.value}`).then((quizData) => {
      api.post(`/themeQuiz/${quizData.data.ID_Quiz}/${themesValue.value}`);

      for (const question of questions.value) {
        api.post(`/answers/${question.value}`).then((answerData) => {
          if (questions.value[goodAnswer.value] === question) {
            isGoodAnswer = 1;
          } else {
            isGoodAnswer = 0;
          }
          api.post(
            `/quizAnswers/${quizData.data.ID_Quiz}/${answerData.data.ID_Answer}/${isGoodAnswer}`
          );
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
</script>
