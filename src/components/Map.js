/* global google:ignore */

import React from 'react';
import Axios from 'axios';

class Map extends React.Component {
  state = {
    postboxes: [],
    locality: { lat: 51.515213, lng: -0.072331 }
  }

  initializeMap = () => {
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 14,
      center: this.state.locality
    });
  }

  componentWillMount() {
    Axios
      .get('/api/postboxes')
      .then(res => this.setState({ postboxes: res.data }, () => this.initializeMap()))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default Map;
