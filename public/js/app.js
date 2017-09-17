/* global google:ignore */
$(() => {
  console.log('JS loaded');

  const $map = $('.map');
  let map = null;

  function initializeMap() {
    const latLng = { lat: 51.515213, lng: -0.072331 };
    map = new google.maps.Map($map.get(0), {
      zoom: 14,
      center: latLng
    });
  }

  initializeMap();
});
