<template>  

    <body>
    </body>
</template>

<script>
export default{
    data() {
        return {
            width: 800,
            height: 600,
            departements: new Map(),
            codeDepartements: [
                "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15"
                , "16", "17", "18", "19", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "2B", "30"
                , "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"
                , "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62"
                , "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78"
                , "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94"
                , "95"]
        }
    },
    methods: {
        themeAleatoire() {
                    let themes = ["Maths", "Geographie", "Histoire", "Litterature", "Musique"
                        , "Cinema", "Sport", "Sciences", "Divertissement", "Films-et-series"];
                    let index = Math.floor(Math.random() * themes.length); return themes[index];
                }
    },
    mounted() {
        
        for (let code of this.codeDepartements) {
            this.departements.set(code, this.themeAleatoire());
        } 
        console.log(this.departements); 
        const svg = d3.select('body')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        let dataFrance = "{{getDataFrance}}";

        
        const projection = d3.geoMercator().fitSize([this.width, this.height], dataFrance); 
        const path = d3.geoPath().projection(projection); // // Ajouter les départements à la carte

        svg.selectAll('path').data(dataFrance.features).enter().append('a').attr('href', d =>
            `http://localhost:5173/${d.properties.nom}`) // Lien vers chaque département
            .append('path')
            .attr('d', path)
            .attr('class', d => this.departements.get(d.properties.code))
            .attr('stroke', '#666')
            .attr('stroke-width', 1)    
            // Statistiques sur le nombre de départements par thème
        let stats = new Map();
        for (let theme of this.$departements.values()) {
            if (stats.has(theme)) {
                stats.set(theme, stats.get(theme) + 1);
            } else {
                stats.set(theme, 1);
            }
        }
       console.log(stats);

    }
}
            // Exemple de code D3.js pour charger une carte de la France
            

        </script>