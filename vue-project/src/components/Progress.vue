<template>
  <div class="flex w-2/3 h-5 m-10">
    <div class="flex flex-row bg-black w-full h-3 items-center justify-around">
      <div
        class="flex flex-row border-black border-4 rounded-full w-6 h-6 justify-center duration-200"
        :class="{
          'animate-bounce  ': index == current,
          '!bg-blue-500': index <= current && listWasTrue[index],

          '!bg-red-500': listWasTrue[index] === false || index > current,
        }"
        v-for="(element, index) of list"
        :key="index"
      >
        <div class="flex flex-col relative top-full bg-transparent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, inject } from "vue";
const props = defineProps({
  list: Array,
  current: Number,
  listWasTrue: Array,
});

watch(
  () => props.current,
  (newValue) => {}
);
console.log("Liste true/false: ", props.listWasTrue);
</script>
