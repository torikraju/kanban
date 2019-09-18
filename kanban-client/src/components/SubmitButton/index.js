import React from 'react';

const SubmitButton = ({ loading }) => (
  loading
    ? (
      <button className="btn btn-primary btn-block mt-4" type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" />
                Loading...
      </button>
    )
    : <input type="submit" className="btn btn-primary btn-block mt-4" />
);

export default SubmitButton;
