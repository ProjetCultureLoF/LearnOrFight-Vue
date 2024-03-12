<template>
  <div class="relative overflow-x-auto rounded-lg md:w-1/5">
    <table class="w-full text-sm text-left rtl:text-right text-black">
      <thead class="text-xs text-white uppercase bg-[#a76a30]">
        <tr>
          <th scope="col" class="px-6 py-3 xs:text-xs">N°</th>
          <th scope="col" class="px-6 py-3 xs:text-xs">Pseudo</th>
          <th scope="col" class="px-6 py-3 xs:text-xs">Total de points</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b border-[#a76a30]"
          v-for="(score, index) in listScore"
          :key="index"
        >
          <td class="px-6 py-4 xs:text-xs">{{ index + 1 }}</td>
          <td class="px-6 py-4 xs:text-xs">{{ score.user.Name_User }}</td>
          <td class="px-6 py-4 xs:text-xs">{{ score.maxScore }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  listScore: Array,
});
</script>
