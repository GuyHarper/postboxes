/* global google:ignore */
$(() => {
  console.log('JS loaded');

  const $map = $('.map');
  let map = null;
  let locations = null;

  function initializeMap() {
    const latLng = { lat: 51.515213, lng: -0.072331 };
    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      center: latLng
    });
  }

  function getPostboxes() {
  $.get('http://localhost:3000/postboxes')
    .done((response) => {
      locations = response;
      locations.forEach((location) => {
        showMarker(location);
      });
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
