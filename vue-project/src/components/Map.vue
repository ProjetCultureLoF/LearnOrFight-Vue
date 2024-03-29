<template>
  <div
    id="map"
    class="bg-blue-400 rounded-lg border-black border-2 m-5 p-2"
  ></div>
</template>
//max-lg:w-[${width} max-lg:h-[${width}]
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { api } from "@/plugins/requete";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
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

const width = computed(() => {
  let width = window.innerWidth;

  if (window.innerWidth < 600) {
    return Math.round(window.innerWidth / 1.2);
  } else if (600 <= window.innerWidth >= 1200) {
    return Math.round(window.innerWidth / 2.5);
  } else {
    return Math.round(window.innerWidth / 3);
  }
});

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
async function drawMap() {
  const svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width.value)
    .attr("height", width.value);

  const projection = d3
    .geoMercator()
    .fitSize([width.value, width.value], dataFrance.value);

  const path = d3.geoPath().projection(projection); // // Ajouter les departements à la carte
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
  // Statistiques sur le nombre de departements par theme
  let stats = new Map();
  for (let theme of departements.value) {
    if (stats.has(theme)) {
      stats.set(theme, stats.get(theme) + 1);
    } else {
      stats.set(theme, 1);
    }
  }
}

onMounted(async () => {
  await loadData();
  const departments = await api.get(`/departments/`);
  for (let code of departments.data) {
    departements.value.set(code.Code_Department, code.themes[0].Title_Theme);
  }
  drawMap();
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

/* Ajoutez des styles supplementaires au survol si necessaire */
path:hover {
  fill: #8cbf8c;
  /* Nouvelle couleur de remplissage au survol */
}

/* Maths */
.Math {
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
.Films.et.series {
  fill: #d8bfd8;
}
</style>
