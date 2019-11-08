'use strict';

// var getRandomInteger = function (min, max) {
//   return Math.floor(min + Math.random() * (max - min + 1));
// };

// var TYPE = ['palace', 'flat', 'house', 'bungalo'];
// var CHECKIN = ['12:00', '13:00', '14:00'];
// var CHECKOUT = ['12:00', '13:00', '14:00'];
// var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// var OFFERS_QUANTITY = 8;

var ENTER_KEYCODE = 13;

// var PIN_ARROW_HEIGHT = 22;

// var generateRentalOfferMocks = function (quantity) {
//   var rentalOffersMocks = [];
//   for (var i = 1; i <= quantity; i++) {
//     var rentalOffer = {};
//     rentalOffer.author = {avatar: 'img/avatars/user0' + i + '.png'};
//     rentalOffer.location = {
//       x: getRandomInteger(0, 1200),
//       y: getRandomInteger(130, 630)
//     };
//     rentalOffer.offer = {
//       title: 'Заголовок предложения ' + i,
//       address: rentalOffer.location.x + ', ' + rentalOffer.location.y,
//       price: getRandomInteger(100, 500),
//       type: TYPE[getRandomInteger(0, 3)],
//       rooms: getRandomInteger(1, 5),
//       guests: getRandomInteger(1, 5),
//       checkin: CHECKIN[getRandomInteger(0, 2)],
//       checkout: CHECKOUT[getRandomInteger(0, 2)],
//       features: FEATURES.slice(0, getRandomInteger(1, FEATURES.length)),
//       description: 'Описание ' + i,
//       photos: PHOTOS.slice(0, getRandomInteger(1, PHOTOS.length))
//     };
//
//     rentalOffersMocks.push(rentalOffer);
//   }
//   return rentalOffersMocks;
// };

// var mocks = generateRentalOfferMocks(OFFERS_QUANTITY);

var map = document.querySelector('.map');
// map.classList.remove('map--faded');

// var mapPins = document.querySelector('.map__pins');
// var mapPinTemplate = document.querySelector('#pin')
//   .content
//   .querySelector('.map__pin');


// var renderRentalOffer = function (offerObj) {
//   var offer = mapPinTemplate.cloneNode(true);
//   offer.style = 'left: ' + (offerObj.location.x - 25) + 'px; top: ' + (offerObj.location.y - 70) + 'px;';
//   offer.querySelector('img').src = offerObj.author.avatar;
//   offer.querySelector('img').alt = offerObj.offer.title;
//   return offer;
// };

// var fragment = document.createDocumentFragment();
// for (var i = 0; i < mocks.length; i++) {
//   fragment.appendChild(renderRentalOffer(mocks[i]));
// }
//
// mapPins.appendChild(fragment);


// добавить атрибут disabled элементам input и select (или родительским fieldset) класса .ad-form в соответствии с ТЗ
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
for (var i = 0; i < adFormFieldset.length; i++) {
  adFormFieldset[i].setAttribute('disabled', 'true');
}


// Форма с фильтрами .map__filters заблокирована - содержит класс .map__filters--disabled

var mapFilters = document.querySelector('.map__filters');
mapFilters.classList.add('map__filters--disabled');

var getElementCoord = function (DOMElement) {
  var DOMElementRect = DOMElement.getBoundingClientRect();
  var DOMElementCoord = {
    // centerX: DOMElementRect.x + Math.round(DOMElementRect.width / 2) + pageXOffset,
    centerX: DOMElementRect.offsetX,
    // centerY: DOMElementRect.y + Math.round(DOMElementRect.height / 2) + pageYOffset,
    centerY: DOMElementRect.offsetY,
    // pinX: DOMElementRect.x + Math.round(DOMElementRect.width / 2) + pageXOffset,
    pinX: DOMElementRect.offsetX,
    // pinY: DOMElementRect.y + Math.round(DOMElementRect.height + PIN_ARROW_HEIGHT) + pageYOffset,
    pinY: DOMElementRect.offsetY
  };
  return DOMElementCoord;
};


var inputAddress = document.querySelector('.ad-form input[name=address]');

document.addEventListener('DOMContentLoaded', function () {
  inputAddress.value = getElementCoord(mapPinMain).centerX + ', ' + getElementCoord(mapPinMain).centerY;
});


// добавьте обработчик события mousedown на элемент .map__pin--main
var mapPinMain = document.querySelector('.map__pin--main');

var turnPageToActiveState = function () {
  map.classList.remove('map--faded');
  mapFilters.classList.remove('map__filters--disabled');
  for (i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].removeAttribute('disabled');
  }
  adForm.classList.remove('ad-form--disabled');
  inputAddress.value = getElementCoord(mapPinMain).pinX + ', ' + getElementCoord(mapPinMain).pinY;
};

mapPinMain.addEventListener('mousedown', function () {
  turnPageToActiveState();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    turnPageToActiveState();
  }
});

