<template>
  <div
    class="relative overflow-x-auto rounded-lg w-4/5 max-w-[750px] min-w-[10px] text-center"
  >
    <h2 class="m-4">{{ title }}</h2>
    <table class="w-full text-sm text-left rtl:text-right text-black">
      <thead class="text-xs text-white uppercase bg-[#273445]">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            scope="col"
            class="px-6 py-3 xs:text-xs"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>

      <tbody v-if="listScore != false">
        <tr
          v-for="(item, index) in listScore"
          :key="index"
          class="bg-white border-b border-[#273445]"
        >
          <td
            v-for="(header, headerIndex) in headers"
            :key="headerIndex"
            class="px-6 py-4 xs:text-xs"
          >
            {{ headerIndex == 0 ? index + 1 : item[header.key] }}
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr class="bg-white border-b border-[#a76a30]">
          <td class="px-6 py-4 xs:text-xs">/</td>
          <td class="px-6 py-4 xs:text-xs">Pas de score</td>
          <td
            class="px-6 py-4 xs:text-xs"
            v-for="i in headers.length - 2"
            :key="i"
          >
            /
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, watch } from "vue";
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  listScore: {
    type: Array,
    required: true,
    default: [],
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
});

console.log(props.listScore);
</script>
