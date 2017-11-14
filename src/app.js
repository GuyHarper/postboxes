import React from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map';
import Form from './components/Form';

import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <main>
        <Map />
        <Form />
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
