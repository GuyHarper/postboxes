import React from 'react';
import Axios from 'axios';

class Map extends React.Component {
  state = {
    postboxes: []
  }

  componentWillMount() {
    Axios
      .get('/api/postboxes')
      .then(res => this.setState({ postboxes: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

  render() {
    if(this.state.postboxes.length > 0) {
      return (
        <p>postboxes loaded</p>
      );
    } else return false;
  }
}

export default Map;
