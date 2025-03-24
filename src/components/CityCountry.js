import React from 'react';
import PropTypes from 'prop-types';

const CityCountry = ({ city, country }) => {
  return (
    <div className="city-country">
      <h2>
        {city}, {country}
      </h2>
    </div>
  );
};

CityCountry.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CityCountry;