import { onActiveInactiveState, onActiveForm } from './form';
import { getRandomFloat } from './utils';
import { typeList, createOffer, createAuthor } from './getting-data';
const form = document.querySelector('.ad-form');
const address = document.querySelector('#address');
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const iconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};
const iconConfigDefault = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};
const ZOOM = 10;
const cityCenter = {
  lat: 35.5519,
  lng: 139.4533
};
const startCoordinate = {
  lat: 35.5519,
  lng: 139.4533
};

const createCustomPopup = (offer, author) => {
  const popup = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = popup.cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = typeList[offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} для ${offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupElement.querySelectorAll('.popup__feature').textContent = offer.features;
  popupElement.querySelector('.popup__description').textContent = offer.description;
  popupElement.querySelector('.popup__photo').src = offer.photos;
  popupElement.querySelector('.popup__avatar').src = author.avatar;

  return popupElement;

};

const map = L.map('map-canvas')
  .on('load', () => {
    onActiveInactiveState();
    onActiveForm();
  })
  .setView(cityCenter, ZOOM);

L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

const DefaultPinIcon = L.icon({
  iconUrl: iconConfigDefault.url,
  iconSize: [iconConfigDefault.width, iconConfigDefault.height],
  iconAnchor: [iconConfigDefault.anchorX, iconConfigDefault.anchorY],
});

const marker = L.marker(startCoordinate, {
  draggable: true,
  icon: mainPinIcon,
});

marker.addTo(map);

address.value = `${cityCenter.lat.toFixed(5)}, ${cityCenter.lng.toFixed(5)}`;

marker.on('moveend', (evt) => {
  const coordinate = evt.target.getLatLng();
  address.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
});

form.addEventListener('submit', () => {
  mainPinIcon.setLatLng(startCoordinate);
  map.setView(cityCenter, ZOOM);
});

const createLocationLat = () => {
  const lat = getRandomFloat(35.65, 35.7).toFixed(5);
  return lat;
};

const createLocationLng = () => {
  const lng = getRandomFloat(139.7, 139.8).toFixed(5);
  return lng;
};

const points = [{
  lat: createLocationLat(),
  lng: createLocationLng(),
},
{
  lat: createLocationLat(),
  lng: createLocationLng(),
},
{
  lat: createLocationLat(),
  lng: createLocationLng(),
},
{
  lat: createLocationLat(),
  lng: createLocationLng(),
}];

points.forEach(({ lat, lng }) => {
  const markerDefault = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: DefaultPinIcon,
    },
  );
  markerDefault
    .addTo(map)
    .bindPopup(createCustomPopup(createOffer(), createAuthor()));
});