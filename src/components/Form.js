import React from 'react';

class Form extends React.Component {

  state = {
    locality: {}
  }

  render() {
    return (
      <section className="form-container">
        <form>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Enter your location"></input>
          </div>
          <button type="submit" className="btn">Find postboxes</button>
        </form>
      </section>
    );
  }
}

export default Form;
