<template>
  <div
    @click="selectAnswer(answer)"
    :class="{
      'bg-[#e84a4a] border-[#d63d3d] duration-200':
        goodAnswer != answer && goodAnswer != null,
      'bg-[#5a46da] border-[#5340cd] duration-200':
        goodAnswer == answer && goodAnswer != null,
    }"
    class="w-[20vw] lg:w-[23vw] bg-[#ffffff] border-t border-l border-r-4 border-b-4 rounded-md shadow duration-200 p-1 lg:p-2 hover:shadow-lg active:w-[24vw]"
  >
    <p
      :class="{ 'text-[#BF6415] drop-shadow': selectedAnswer === answer }"
      class="text-sm md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold"
    >
      {{ answer.Text_Answer }}
    </p>
  </div>
  <slot></slot>
</template>

<script setup>
const props = defineProps({
  answer: Object,
  selectedAnswer: Object,
  goodAnswer: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["selectAnswer"]);

function selectAnswer(answer) {
  if (answer == props.selectedAnswer) {
    answer = null;
  }

  emit("selectAnswer", answer);
}
</script>

<style scoped>
.active {
  color: green;
}
</style>
