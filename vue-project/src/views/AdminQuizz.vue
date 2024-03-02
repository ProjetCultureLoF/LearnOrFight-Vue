User
<template>
  <Quiz v-for="(quiz, index) in quizes" :key="index" :quiz="quiz" :admin="true">
    <button @click="deleteQuiz(quiz.ID_Quiz)">Supprimer</button>
  </Quiz>
  <div id="quiz">
    <input type="text" v-model="quizName" placeholder="Nom du Quiz" />

    <input
      type="radio"
      name="goodAnswer"
      :value="0"
      v-model="goodAnswer"
      checked
      @click="goodAnswer = 0"
    />
    <input type="text" v-model="a1" placeholder="Question N°1" />

    <input
      type="radio"
      name="goodAnswer"
      :value="1"
      v-model="goodAnswer"
      @click="goodAnswer = 1"
    />
    <input type="text" v-model="a2" placeholder="Question N°2" />

    <input
      type="radio"
      name="goodAnswer"
      :value="2"
      v-model="goodAnswer"
      @click="goodAnswer = 2"
    />
    <input type="text" v-model="a3" placeholder="Question N°3" />

    <input
      type="radio"
      name="goodAnswer"
      :value="3"
      v-model="goodAnswer"
      @click="goodAnswer = 3"
    />
    <input type="text" v-model="a4" placeholder="Question N°4" />
    <label for="type-rental">Theme:</label>
    <select name="Theme" v-model="themesValue">
      <option v-for="theme in themes" :key="theme.ID_Theme">
        {{ theme.Title_Theme }}
      </option>
    </select>
    <button @click="createQuiz">Créer quiz</button>
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
    await api
      .post(`/quiz/${quizName.value}`)
      .then((quizData) => {
        for (const question of questions.value) {
          api.post(`/answers/${question.value}`).then((answerData) => {
            if (questions.value[goodAnswer.value] == question) {
              isGoodAnswer = 1;
            }
            api.post(
              `/quizAnswers/${quizData.data.ID_Quiz}/${answerData.data.ID_Answer}/${isGoodAnswer}`
            );
          });
        }
        api.post(`/themeQuiz/${quizData.data.ID_Quiz}/${themesValue.value}`);
      })
      .finally(await getQuizes());
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.active::before {
  content: "";
  position: absolute;
  border-color: #009933;
  border-style: solid;
  border-width: 0 0.3em 0.25em 0;
  height: 1em;
  top: 1.3em;
  left: 0.6em;
  margin-top: -1em;
  transform: rotate(45deg);
  width: 0.5em;
}
</style>
