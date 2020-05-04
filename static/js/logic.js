// Get data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';


// Create base map
var mymap = L.map('map').setView([0.00, 0.00], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/emerald-v8',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(mymap);

// Add layers
d3.json(url, function (data) {
    console.log(data.features);

    function markerLocation(coord) {
        var latLng = [];
        latLng.push(coord[1]);
        latLng.push(coord[0]);
        return latLng;
    };

    function markerSize(magnitude) {
        var magn = [];
        magn.push(magnitude);
        if (magn > 6.5) {
            return magn * 50000;
        }
        else if (magn > 6) {
            return magn * 25000;
        }
        else if (magn > 5) {
            return magn * 10000;
        }
        else {
            return magn * 5000;
        }

    };

    features = data.features
    for (var i = 0; i < features.length; i++) {
        L.circle(markerLocation(features[i].geometry.coordinates), {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: markerSize(features[i].properties.mag)
        }).bindPopup('<h1>' + features[i].properties.place + '</h1><hr><h3> Magnitude: ' + features[i].properties.mag + '</h3><br></h3>Time:' + features[i].properties.time).addTo(mymap);
    };
});
