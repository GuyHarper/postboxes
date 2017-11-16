/* global google:ignore */

import React from 'react';

class Map extends React.Component {
  state = {
    postboxes: [],
    localityLatLng: {},
    markers: [],
    infowindows: []
  }

  componentDidMount() {
    this.setState({localityLatLng: this.props.localityLatLng}, () => this.initializeMap());
  }

  componentWillReceiveProps(props) {
    if(this.state.localityLatLng !== props.localityLatLng) {
      this.setState({postboxes: props.postboxes, localityLatLng: props.localityLatLng}, () => {
        if(this.state.localityLatLng) {
          this.map.setCenter(new google.maps.LatLng(this.state.localityLatLng.lat, this.state.localityLatLng.lng));
          console.log(this.state);
          // this.state.markers.forEach(marker => {
          //   marker.setMap(null);
          // });
        }
        this.findNearby();
      });
    }
  }

  initializeMap = () => {
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 15,
      center: this.props.localityLatLng
    });
  }

  showMarker = (postbox) => {
    const latLng = { lat: postbox.lat, lng: postbox.lng };
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: '../assets/images/red-dot.svg'
    });
    // this.setState(prevState => {
    //   const markers = [...prevState.infowindows];
    //   markers.push(marker);
    //   return {markers: markers};
    // });
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
      });
    }
  }

  findNearby = () => {
    const nearbyPostboxes = this.state.postboxes.filter((postbox) => {
      return (Math.abs(postbox.lng - this.state.localityLatLng.lng) < 0.005) && (Math.abs(postbox.lat - this.state.localityLatLng.lat) < 0.005);
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
