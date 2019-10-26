'use strict';

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFERS_QUANTITY = 8;


var generateRentalOfferMocks = function (quantity) {
  var rentalOffersMocks = [];
  for (var i = 1; i <= quantity; i++) {
    var rentalOffer = {};
    rentalOffer.author = {avatar: 'img/avatars/user0' + i + '.png'};
    rentalOffer.location = {
      x: getRandomInteger(0, 1200),
      y: getRandomInteger(130, 630)
    };
    rentalOffer.offer = {
      title: 'Заголовок предложения ' + i,
      // address: getRandomInteger(0, 1200) + ', ' + getRandomInteger(130, 630),
      address: rentalOffer.location.x + ', ' + rentalOffer.location.y,
      price: getRandomInteger(100, 500),
      type: TYPE[getRandomInteger(0, 3)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 5),
      checkin: CHECKIN[getRandomInteger(0, 2)],
      checkout: CHECKOUT[getRandomInteger(0, 2)],
      features: FEATURES.slice(0, getRandomInteger(1, FEATURES.length)),
      description: 'Описание ' + i,
      photos: PHOTOS.slice(0, getRandomInteger(1, PHOTOS.length))
    };

    rentalOffersMocks.push(rentalOffer);
  }
  return rentalOffersMocks;
};

var mocks = generateRentalOfferMocks(OFFERS_QUANTITY);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');


var renderRentalOffer = function (offerObj) {
  var offer = mapPinTemplate.cloneNode(true);
  offer.style = 'left: ' + (offerObj.location.x - 25) + 'px; top: ' + (offerObj.location.y - 70) + 'px;';
  offer.querySelector('img').src = offerObj.author.avatar;
  offer.querySelector('img').alt = offerObj.offer.title;
  return offer;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < mocks.length; i++) {
  fragment.appendChild(renderRentalOffer(mocks[i]));
}

mapPins.appendChild(fragment);


