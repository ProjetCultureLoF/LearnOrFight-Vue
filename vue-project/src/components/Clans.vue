<template>
  <div
    class="flex md:flex-row xs:flex-col xs:items-center xs:w-[100vw] xs:h-fit h-full w-full text-center xs:pb-10 justify-center"
  >
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
