// Utility functions for managing saved locations in localStorage

const STORAGE_KEY = 'savedLocations';

// Get all saved locations
export const getSavedLocations = () => {
  const locations = JSON.parse(localStorage.getItem('savedLocations')) || [];
  return locations.map((loc, index) => ({...loc, id: index}));
};

// Save a new location
export const saveLocation = (location) => {
  const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];
  const existingIndex = savedLocations.findIndex(loc => loc.latitude === location.latitude && loc.longitude === location.longitude);
  if (existingIndex === -1) {
    savedLocations.push(location);
  }
  localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
};

// Remove a location
export const removeLocation = (key) => {
  const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];
  const updatedLocations = savedLocations.filter(loc => `${loc.latitude}-${loc.longitude}` !== key);
  localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
};

// Check if a location is saved
export const isLocationSaved = (latitude, longitude) => {
  const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];
  return savedLocations.some(loc => loc.latitude === latitude && loc.longitude === longitude);
};