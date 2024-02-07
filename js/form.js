import { resetMap, renderUpdate, render, allData } from './map';
import { debounce } from './utils';
import {previewImage} from './avatar';
const TIMEOUT = 500;
const form = document.querySelector('.ad-form');
const resetButton = form.querySelector('.ad-form__reset');
const mapForm = document.querySelector('.map__filters');

const activeForm = () => {
  form.classList.remove('ad-form--disabled');
};

const activeFilter = () => {
  mapForm.classList.remove('ad-form--disabled');
};

const onActiveForm = () => {
  activeForm();
};

const onActiveFilter = () => {
  activeFilter();
};


resetButton.addEventListener('click', () => {
  resetMap();
  mapForm.reset();
  render(allData);
  previewImage.src = 'img/muffin-grey.svg';
  if (document.querySelector('.ad-form__photo-main')) {
    document.querySelector('.ad-form__photo-main').remove();
  }
});


const onChange = () => {
  renderUpdate();
};

mapForm.addEventListener('change', debounce(onChange, TIMEOUT));

export { onActiveForm, onActiveFilter };
