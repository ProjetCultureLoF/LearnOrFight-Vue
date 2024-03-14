<template>
  <div class="relative overflow-x-auto rounded-lg w-1/5">
    <table class="w-full text-sm text-left rtl:text-right text-black">
      <thead class="text-xs text-white uppercase bg-[#a76a30]">
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

      <tbody>
        <tr
          v-for="(item, index) in listScore"
          :key="index"
          class="bg-white border-b border-[#a76a30]"
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
});
</script>
