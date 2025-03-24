import React from 'react';
import PropTypes from 'prop-types';

const CityCountry = ({ city, country }) => {
  return (
    <div className="location-box">
        <div className='city'>{city}</div>
        <div className='country'>{country}</div>
    </div>
  );
};

CityCountry.propTypes = {
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default CityCountry;