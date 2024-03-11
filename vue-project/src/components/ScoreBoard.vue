<template>
  <p>Faudra faire un tableau qui get tous les scores de toutes les régions</p>
  {{ listScore }}
  <table>
    <thead>
      <tr>
        <th>N°</th>
        <th>Pseudo</th>
        <th>Total de points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(score, index) in listScore" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ score.Name_User }}</td>
        <td>{{ score.UserScore }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  listScore: Array,
});
</script>
