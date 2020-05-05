// Get data
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson';


// Create base map
var mymap = L.map('map').setView([10.00, 0.00], 3);

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
        if (magn > 6) {
            return magn * 50000;
        }
        else if (magn > 5) {
            return magn * 25000;
        }
        else if (magn > 4) {
            return magn * 10000;
        }
        else {
            return magn * 5000;
        }
        
    };
    function markerColor(magnitude) {
        var magn = [];
        var color = [];
        magn.push(magnitude);
        color.push(color)
        if (magn > 6) {
            color = '#ff3300';
            return color;
        }
        else if (magn > 5) {
            color = '#ffa31a';
            return color;
        }
        else if (magn > 4) {
            color = '#ffff00';
            return color;
        }
        else {
            color = '#99cc00';
            return color;
        }
        
    };

    // Based on https://stackoverflow.com/questions/57092388/converting-a-13-digit-unix-timestamp-to-datetime-with-javascript
    function dateTime(time) {
        var date = [];
        date.push(new Date(time).toISOString().substr(0, 10));
        return date;
    }

    features = data.features
    for (var i = 0; i < features.length; i++) {
        L.circle(markerLocation(features[i].geometry.coordinates), {
            color: markerColor(features[i].properties.mag),
            fillColor: markerColor(features[i].properties.mag),
            fillOpacity: 0.5,
            radius: markerSize(features[i].properties.mag),
        }).bindPopup('<h1>' + features[i].properties.place + '</h1><hr><h3> Magnitude: ' + features[i].properties.mag + '</h3><h3>Date: ' + dateTime(features[i].properties.time) + '</h3>').addTo(mymap);
    };
});
