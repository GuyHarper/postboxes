/* global google:ignore */

import React from 'react';
import Axios from 'axios';

class Map extends React.Component {
  state = {
    postboxes: [],
    locality: { lat: 51.515213, lng: -0.072331 },
    infowindows: []
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
      zoom: 15,
      center: this.state.locality
    });
  }

  showMarker = (postbox) => {
    console.log(postbox);
    const latLng = { lat: postbox.lat, lng: postbox.lng };
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: '../assets/images/red-dot.svg'
    });
    let content = null;
    if(postbox.lastCollection && postbox.saturdayCollection) {
      content = `<p><strong>Last collection:</strong> ${postbox.lastCollection}</p><p><strong>Saturday collection:</strong> ${postbox.saturdayCollection}</p>`;
    } else {
      content = `<p><strong>Last collection:</strong> ${postbox.lastCollection}</p>`;
    }
    const info = `<div id="content"><div id="bodyContent">${content}</div></div>`;
    if(postbox.lastCollection) {
      const infowindow = new google.maps.InfoWindow({
        content: info
      });
      marker.addListener('click', () => {
        this.state.infowindows.forEach((infowindow) => {
          infowindow.close();
        });
        infowindow.open(this.map, marker);
      });
      this.setState(prevState => {
        const infowindows = [...prevState.infowindows];
        infowindows.push(infowindow);
        return {infowindows: infowindows};
      }, () => console.log(this.state));
    }
  }

  findNearby = () => {
    const nearbyPostboxes = this.state.postboxes.filter((postbox) => {
      return (Math.abs(postbox.lng - this.state.locality.lng) < 0.005) && (Math.abs(postbox.lat - this.state.locality.lat) < 0.005);
    });
    nearbyPostboxes.forEach((postbox) => {
      this.showMarker(postbox);
    });
  }

  render() {
    return (
      <section className="map" ref={element => this.mapCanvas = element}></section>
    );
  }
}

export default Map;
