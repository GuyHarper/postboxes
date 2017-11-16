import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import Map from './components/Map';
import Form from './components/Form';

import './scss/style.scss';

class App extends React.Component {

  state = {
    locality: {},
    localityLatLng: { lat: 51.515213, lng: -0.072331 },
    postboxes: []
  }

  handleInputChange = ({ target }) => {
    this.setState({ locality: target.value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    Axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.locality}&key=AIzaSyCNTmlovk2HwuKRICKv2QQzo0BA7MNAgHo`)
      .then(res => {
        this.setState({ localityLatLng: res.data.results[0].geometry.location});
      });
  }

  componentDidMount = () => {
    Axios
      .get('/api/postboxes')
      .then(res => this.setState({ postboxes: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main>
        <Form handleInputChange={this.handleInputChange} handleFormSubmit={this.handleFormSubmit} />
        <Map postboxes={this.state.postboxes} localityLatLng={this.state.localityLatLng}/>
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
