import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const infoEl = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

selectEl.addEventListener('change', onSearchBreedCat);

loader.classList.add('loader');
selectEl.classList.add('visually-hidden');
errorEl.classList.add('visually-hidden');

fetchBreeds()
  .then(data => {
    const dataMarkup = selectMarkUp(data);
    new SlimSelect({
      select: selectEl,
      data: dataMarkup,
    });

    setTimeout(() => {
      selectEl.classList.remove('visually-hidden');
    }, 500);
  })
  .catch(error => {
    errorShow();
  })
  .finally(() => {
    loader.classList.replace('loader', 'visually-hidden');
  });

function selectMarkUp(arr) {
  const markUp = arr
    .map(
      ({ name, reference_image_id }) =>
        `<option value="${reference_image_id}">${name}</option>`
    )
    .join('');
  return selectEl.insertAdjacentHTML('beforeend', markUp);
}

function onSearchBreedCat() {
  loader.classList.remove('visually-hidden');
  infoEl.classList.add('visually-hidden');

  fetchCatByBreed(selectEl.value)
    .then(data => {
      renderCat(data);
      setTimeout(() => {
        infoEl.classList.remove('visually-hidden');
      }, 200);
    })
    .catch(error => {
      errorShow();
    })
    .finally(() => {
      loader.classList.add('visually-hidden');
    });
}

function renderCat({ url, breeds }) {
  const markUp = `<img  class="image" src="${url}" alt="${breeds[0].name} width="500" height="300">
    <div class="content">
    <h2 class="title">${breeds[0].name}</h2>
    <p class="description">${breeds[0].description}</p>
    <p class="temperament">${breeds[0].temperament}</p></div>`;
  return (infoEl.innerHTML = markUp);
}

function errorShow() {
  loader.classList.add('visually-hidden');

  Notify.failure(errorEl.textContent, {
    position: 'center-top',
    timeout: 3000,
  });
}
