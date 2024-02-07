const fileChooserAvatar = document.querySelector('#avatar');
const fileChooserHousing = document.querySelector('#images');
const previewImage = document.querySelector('.ad-form-header__preview-image');
const previewHousingBlock = document.querySelector('.ad-form__photo');


fileChooserAvatar.addEventListener('change', () => {
  const fileAvatar = fileChooserAvatar.files[0];
  previewImage.src = URL.createObjectURL(fileAvatar);
});


let img;

const createImage = () => {
  img = document.createElement('img');
  previewHousingBlock.append(img);
  img.classList.add('ad-form__photo-main');
  img.alt = 'Аватар пользователя';
};

fileChooserHousing.addEventListener('change', () => {
  createImage();
  const fileHousing = fileChooserHousing.files[0];
  img.src = URL.createObjectURL(fileHousing);
});


export {previewImage};
