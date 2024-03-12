<template>
  <div class="flex w-2/3 h-5 m-10">
    <div class="flex flex-row bg-black w-full h-3 items-center justify-around">
      <div
        class="flex flex-row border-black border-4 rounded-full w-6 h-6 justify-center duration-200"
        :class="{
          '': index == current,
          'bg-blue-500': index <= current && listWasTrue[index],

          'bg-red-500': listWasTrue[index] === false || index > current,
        }"
        v-for="(element, index) of list"
        :key="index"
      >
        <div class="flex flex-col relative top-full bg-transparent">
          <p v-if="index <= current" class="xs:text-base font-semibold">
            {{ element.Question_Quiz }}
          </p>
          <p v-else class="flex flex-col relative top-full italic">?</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
const props = defineProps({
  list: Array,
  current: Number,
  wasTrue: Boolean,
});

const listWasTrue = ref([]);

watch(
  () => props.wasTrue,
  (newValue) => {
    if (newValue != null) {
      listWasTrue.value.push(newValue);
    }
    console.log(listWasTrue.value);
  }
);
</script>
