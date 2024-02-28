<template>
  <div id="map"></div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const dataFrance = ref("");
async function loadData() {
  try {
    const response = await fetch(
      "src/assets/data/departements-version-simplifiee.geojson"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dataFrance.value = data;
    console.log(dataFrance.value);
  } catch (error) {
    console.error("Error loading the GeoJSON:", error);
  }
}

const height = ref(600);
const width = ref(600);
const departements = ref(new Map());
const codeDepartements = ref([
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "2A",
  "2B",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "90",
  "91",
  "92",
  "93",
  "94",
  "95",
]);

function themeAleatoire() {
  let themes = [
    "Maths",
    "Geographie",
    "Histoire",
    "Litterature",
    "Musique",
    "Cinema",
    "Sport",
    "Sciences",
    "Divertissement",
    "Films-et-series",
  ];
  let index = Math.floor(Math.random() * themes.length);
  return themes[index];
}

onMounted(async () => {
  await loadData();

  for (let code of codeDepartements.value) {
    departements.value.set(code, themeAleatoire());
  }
  console.log(departements.value);
  console.log(dataFrance.value);

  const svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width.value)
    .attr("height", height.value);
  const projection = d3
    .geoMercator()
    .fitSize([height.value, width.value], dataFrance.value);
  const path = d3.geoPath().projection(projection); // // Ajouter les départements à la carte
  svg
    .selectAll("path")
    .data(dataFrance.value.features)
    .enter()
    .append("a")
    .attr(
      "href",
      (d) => `http://localhost:5173/departments/${d.properties.nom}`
    )
    .append("path")
    .attr("d", path)
    .attr("class", (d) => departements.value.get(d.properties.code))
    .attr("stroke", "#666")
    .attr("stroke-width", 1);
  // Statistiques sur le nombre de départements par thème
  let stats = new Map();
  for (let theme of departements.value) {
    if (stats.has(theme)) {
      stats.set(theme, stats.get(theme) + 1);
    } else {
      stats.set(theme, 1);
    }
  }
  console.log(stats);
});
</script>

<style>
#map {
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
}

path {
  fill: #b4ccb9;
  /* Couleur de remplissage */
  stroke: #666;
  /* Couleur de la bordure */
  stroke-width: 1;
  /* Largeur de la bordure */
}

/* Ajoutez des styles supplémentaires au survol si nécessaire */
path:hover {
  fill: #8cbf8c;
  /* Nouvelle couleur de remplissage au survol */
}

/* Maths */
.Maths {
  fill: #fa8072;
}

/* Geographie */
.Geographie {
  fill: #87ceeb;
}

/* Histoire */
.Histoire {
  fill: #e6e6fa;
}

/* Litterature */
.Litterature {
  fill: #ffb6c1;
}

/* Musique */
.Musique {
  fill: #ffdab9;
}

/* Cinema */
.Cinema {
  fill: #c5e8fb;
}

/* Sport */
.Sport {
  fill: #aeeeee;
}

/* Sciences */
.Sciences {
  fill: #98fb98;
}

/* Divertissement */
.Divertissement {
  fill: #ffffe0;
}

/* Films-et-series */
.Films-et-series {
  fill: #d8bfd8;
}
</style>
