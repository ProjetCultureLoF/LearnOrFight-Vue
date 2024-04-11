<template>
  <div class="flex flex-col items-center justify-center">
    <div
      id="map"
      class="bg-blue-400 rounded-lg border-black border-2 m-5 p-2"
    ></div>
    <div
      class="flex flex-row gap-4 items-center justify-center flex-wrap lg:max-w-[35vw] xs:ml-1 xs:mr-1"
    >
      <div
        v-for="(theme, index) of themes"
        :key="index"
        class="flex flex-col items-center justify-center"
      >
        <div>
          <p>{{ theme }}</p>
        </div>
        <div
          :class="{
            'bg-[#fa8072]': theme == 'Math',
            'bg-[#87ceeb]': theme == 'Geographie',
            'bg-[#e6e6fa]': theme == 'Histoire',
            'bg-[#ffb6c1]': theme == 'Litterature',
            'bg-[#ffdab9]': theme == 'Musique',
            'bg-[#c5e8fb]': theme == 'Cinema',
            'bg-[#aeeeee]': theme == 'Sport',
            'bg-[#98fb98]': theme == 'Sciences',
            'bg-[#ffffe0]': theme == 'Divertissement',
            'bg-[#d8bfd8]': theme == 'Films-et-series',
          }"
          class="xl:w-[20px] xl:h-[20px] lg:w-[20px] lg:h-[20px] md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px] border border-black"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ip } from "@/plugins/ip.js";
import { ref, onMounted, computed } from "vue";
import { api } from "@/plugins/requete";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
const dataFrance = ref("");

console.log(ip);
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

const themes = ref([
  "Math",
  "Geographie",
  "Histoire",
  "Litterature",
  "Musique",
  "Cinema",
  "Sport",
  "Sciences",
  "Divertissement",
  "Films-et-series",
]);
const width = computed(() => {
  if (window.innerWidth < 600) {
    return Math.round(window.innerWidth / 1.2);
  } else if (600 <= window.innerWidth >= 1000) {
    return Math.round(window.innerWidth / 2.5);
  } else {
    return Math.round(window.innerWidth / 3.5);
  }
});

const departements = ref(new Map());
let tooltip; // Déclaration de la variable tooltip

async function drawMap() {
  tooltip = d3
    .select("#map") // Définition de la tooltip ici
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  const svg = d3
    .select("#map")
    .append("svg")
    .attr("width", width.value)
    .attr("height", width.value);

  const projection = d3
    .geoMercator()
    .fitSize([width.value, width.value], dataFrance.value);

  const path = d3.geoPath().projection(projection);

  svg
    .selectAll("path")
    .data(dataFrance.value.features)
    .enter()
    .append("a")
    .attr(
      "href",
      (d) =>
        `http://${ip}:5173/departments/${d.properties.nom.replace(
          /[êéè]/g,
          "e"
        )}`
    )
    .append("path")
    .attr("d", path)
    .attr("class", (d) => departements.value.get(d.properties.code))
    .attr("stroke", "#666")
    .attr("stroke-width", 1)
    .on("mouseover", (event, d) => {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(
          d.properties.nom + " - " + departements.value.get(d.properties.code)
        )
        .style("left", event.pageX + 28 + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", (d) => {
      tooltip.style("opacity", 0);
    });

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

/* Style de la tooltip */
.tooltip {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  opacity: 0;
}
</style>
