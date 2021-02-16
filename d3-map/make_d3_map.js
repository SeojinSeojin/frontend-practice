var width = window.innerWidth - 20,
    height = window.innerHeight - 20,
    centered,
    clicked_point;

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");
console.log("svg : ", svg);

var projection = d3.geoMercator()
    .translate([width / 2.2, height / 1.5]);
console.log("proj : ", projection)

var path = d3.geoPath()
    .projection(projection);
console.log("path : ", path)

var g = svg.append("g");

queue()
    .defer(d3.json, "https://unpkg.com/world-atlas@1/world/110m.json")
    .await(ready);

function ready(error, data) {
    var features = topojson.feature(data, data.objects.countries).features;
    console.log(features)
    svg.selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "rgba(255, 255, 255, 0)")
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
}