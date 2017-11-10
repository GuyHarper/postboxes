/* global google:ignore */

import React from 'react';
import Axios from 'axios';

class Map extends React.Component {
  state = {
    postboxes: [],
    locality: { lat: 51.515213, lng: -0.072331 }
  }

  componentDidMount() {
    this.initializeMap();
    Axios
      .get('/api/postboxes')
      .then(res => this.setState({ postboxes: res.data }, () => this.findNearby()))
      .catch(err => console.log(err));
  }

  initializeMap = () => {
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 14,
      center: this.state.locality
    });
  }

  showMarker = (location) => {
    const latLng = { lat: location.lat, lng: location.lng };
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
  }

  findNearby = () => {
    const nearbyPostboxLocations = this.state.postboxes.filter((postbox) => {
      return (Math.abs(postbox.lng - this.state.locality.lng) < 0.005) && (Math.abs(postbox.lat - this.state.locality.lat) < 0.005);
    });
    nearbyPostboxLocations.forEach((location) => {
      this.showMarker(location);
    });
  }

  render() {
    return (
      <div className="map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default Map;
