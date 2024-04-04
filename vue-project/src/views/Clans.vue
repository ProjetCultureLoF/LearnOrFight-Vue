<template>
  <div class="h-full w-full flex flex-row items-center justify-evenly mt-10">
    <Clan v-for="(clan, index) in clans" :key="index" :clan="clan" />
  </div>
</template>

<script setup>
import Clan from "@/components/Clan.vue";
import { onMounted, ref } from "vue";
import { api } from "@/plugins/requete";

const clans = ref([]);

onMounted(async () => {
  const response = await api.get("/clans");
  console.log(response.data);
  clans.value = response.data;
});
</script>

<style scoped></style>
