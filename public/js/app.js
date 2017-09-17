/* global google:ignore */
$(() => {
  console.log('JS loaded');

  const $map = $('.map');
  let map = null;
  let locations = null;
  let locality = { lat: 51.515213, lng: -0.072331 };

  function initializeMap() {
    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      center: locality
    });
  }

  function getPostboxes() {
  $.get('http://localhost:3000/postboxes')
    .done((response) => {
      locations = response;
      findNearby();
    });
  }

  function findNearby() {
    const nearbyPostboxLocations = locations.filter((location) => {
      return (Math.abs(location.lng - locality.lng) < 0.005) && (Math.abs(location.lat - locality.lat) < 0.005);
    });
    nearbyPostboxLocations.forEach((location) => {
      showMarker(location);
    });
  }

  function showMarker(location) {
    const latLng = { lat: location.lat, lng: location.lng };
    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  initializeMap();
  getPostboxes();
});
