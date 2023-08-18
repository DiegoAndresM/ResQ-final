const Cord = require('../../models/cord')
var map;
function initMap() {
  Cord.find({}, (err, coordinates) => {
    if (err) {
      console.error(err);
      return;
    }

    // Iterar a través de las coordenadas y crear un marcador en el mapa para cada una
    coordinates.forEach(coordinate => {
      const markerLatLng = new google.maps.LatLng(coordinate.location.y, coordinate.location.x);

      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: markerLatLng
    });

      const markerOptions = {
        position: markerLatLng,
        map: map,
        title: coordinate.Rname
      };

      const marker = new google.maps.Marker(markerOptions);
    });
  });

  // ...
}