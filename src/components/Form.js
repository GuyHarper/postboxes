import React from 'react';

const Form = ({ handleInputChange, handleFormSubmit }) => {
  return (
    <section className="form-container">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <input className="form-control" type="text" placeholder="Enter your location" onChange={handleInputChange}></input>
        </div>
        <button type="submit" className="btn">Find postboxes</button>
      </form>
    </section>
  );
};

export default Form;
