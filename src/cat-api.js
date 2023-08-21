import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_YWIhlUdzdWKmRAH4BJYsyQzp36DHTzgZKlq2yvYRonWF6Huht4dWz4ZAOldsg2QS';
const BASE_URL = 'https://api.thecatapi.com/v1';
const endPoint1 = '/breeds';
const endPoint2 = '/images';

function fetchBreeds() {
  return fetch(`${BASE_URL}${endPoint1}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}${endPoint2}/${breedId}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchCatByBreed, fetchBreeds };
