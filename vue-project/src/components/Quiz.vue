<template>
  <div id="answers" class="flex flex-col items-center text-center w-1/2 gap-5">
    <h1 v-on:dblclick="changeTitle" v-if="isTitle == false" class="">
      {{ quiz.Question_Quiz }}
    </h1>
    <div v-if="isTitle == true" class="flex gap-4">
      <textarea
        id="w3review"
        name="w3review"
        rows="4"
        cols="50"
        class="bg-gray-100 p-1 w-[50vw] h-[5vh]"
        v-model="newTitle"
        v-on:dblclick="changeTitle"
      ></textarea>
      <button @click="uploadNewTitle">Changer</button>
    </div>
    <h3 class="">{{ quiz.themes[0].Title_Theme }}</h3>
    <h2 v-if="admin == false" class="duration-200">{{ time }}</h2>

    <slot></slot>
    <div class="flex flex-wrap gap-5 justify-center items-center max-w-full">
      <Answers
        v-for="(answer, index) in quiz.answers"
        :key="index"
        :answer="answer"
        :answering="answering"
        :selectedAnswer="selectedAnswer"
        @selectAnswer="selectAnswer"
      >
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
  <button
    v-if="admin"
    class="duration-200 rounded-md p-2 w-fit"
    @click="$emit('modify', selectedAnswer, quiz, goodAnswer)"
  >
    Changer réponse
  </button>
</template>

<script setup>
import Answers from "./Answers.vue";
import { api } from "@/plugins/requete";
import router from "@/router";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const emit = defineEmits(["validate", "nextQuestion", "modify"]);

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
const timer = ref(null);
const goodAnswer = ref(null);
const isTitle = ref(false);
const newTitle = ref(props.quiz.Question_Quiz);
const answering = ref(false);

function selectAnswer(answer) {
  console.log(answer);

  selectedAnswer.value = answer;
}

function changeTitle() {
  if (props.admin === true) {
    isTitle.value = !isTitle.value;
  }
}

async function uploadNewTitle() {
  try {
    await api
      .patch(
        `/quiz/${props.quiz.ID_Quiz}?Question_Quiz=${encodeURIComponent(
          newTitle.value
        )}`
      )
      .then((response) => {
        props.quiz.Question_Quiz = newTitle.value;
        isTitle.value = false;
      });
  } catch (error) {
    console.log(error);
  }
}

async function isAnswer(answer) {
  console.log(answer);
  if (answer != null && answer.ID_Answer != 0) {
    answering.value = false;

    if (answer.quizAnswer.Is_QuizAnswer) {
      emit("validate", true);
    } else {
      emit("validate", false);
    }

    errorMessages.value = "";
  } else {
    errorMessages.value = "Vous devez selectionner une réponse";
  }
}

function nextQuestion() {
  selectedAnswer.value = null;
  emit("nextQuestion");
}

watch(
  () => time.value,
  (count) => {
    if (
      count > 0 &&
      props.waitNext == false &&
      route.name.includes("departments")
    ) {
      answering.value = true;
      setTimeout(() => {
        time.value--;
      }, 1000);
    }
    if (count == 0 && selectedAnswer.value == null) {
      isAnswer({ ID_Answer: 0 });
      answering.value = false;
    } else if (count == 0) {
      isAnswer(selectedAnswer.value);
      answering.value = false;
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
      answering.value = true;
    }
  }
);
</script>
