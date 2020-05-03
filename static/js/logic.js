// Get data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';

// Create base map
var mymap = L.map('map').setView([x, -x], x);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

// Add layers
function markerLocation(coord) {
    return coordinates;
}
function markerSize(magnitude) {
    return mag * 10;
};


for (var i = 0; i < features.length; i++) {
    L.circle(features[i].coord), {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: markerSize
    }).bindPopup('<h1>'+features[i].place+'</h1><hr><h3> Magnitude: '+features[i].mag+'</h3><br></h3>Time:'+features[i].time).addTo(mymap);

}
