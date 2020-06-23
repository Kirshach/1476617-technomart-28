////////////////////////////////
/// Скрипты главной страницы ///
////////////////////////////////

//
// Скрипт промо-блока
//

let promoSlides = document.querySelectorAll('.promo-slide');
let promoButtons = document.querySelectorAll('.promo-slidenum-button');
let promoPreviousSlide = document.querySelector('.promo-previous-button');
let promoNextSlide = document.querySelector('.promo-next-button');
let promoLength = promoSlides.length;
let promoCurrent = 0;
let promoPrevious = 1;

if (promoLength !== 0) {

	if (promoLength > promoButtons.length) {
		alert('Я сломался из-за того, что кнопок пагинации слайдов меньше, чем самих слайдов ( ͡° ͜ʖ ͡°)')
	}

	function promoShowSlides(i) {
		promoSlides[promoPrevious].classList.remove('promo-previous');
		promoSlides[promoCurrent].classList.remove('promo-current');
		promoButtons[promoCurrent].classList.remove('promo-current-button');

		promoPrevious = promoCurrent;
		promoCurrent = i;

		promoSlides[promoPrevious].classList.add('promo-previous');
		promoSlides[promoCurrent].classList.add('promo-current');
		promoButtons[promoCurrent].classList.add('promo-current-button');
	};

	for (let i = 0; i < promoLength; i++) {
	 		promoButtons[i].onclick = function(event) {
	 		event.preventDefault();
	 		promoShowSlides(i);
			promoSlides[promoPrevious].style.animation = 'slideshow-fadeout 0.4s';
			promoSlides[promoCurrent].style.animation = 'slideshow-fadein 0.4s';
			}
	};

	promoPreviousSlide.onclick = function(event) {
		event.preventDefault();

		if (promoCurrent == 0) {
			promoShowSlides(promoLength - 1)
		} else {
			promoShowSlides(promoCurrent - 1)
		};

		promoSlides[promoPrevious].style.animation = 'slideshow-prev-remove 0.5s';
		promoSlides[promoCurrent].style.animation = 'slideshow-prev 0.5s';
	};

	promoNextSlide.onclick = function(event) {
		event.preventDefault();

		if (promoCurrent == (promoLength - 1)) {
			promoShowSlides(0)
		} else {
			promoShowSlides(promoCurrent + 1)
		};

		promoSlides[promoPrevious].style.animation = 'slideshow-next-remove 0.5s';
		promoSlides[promoCurrent].style.animation = 'slideshow-next 0.5s';
	};

}

//
// Скрипт блока 'Сервисы'
//

let servicesSlides = document.querySelectorAll('.service-info');
let servicesLength = servicesSlides.length;
let servicesCurrent = 0;
let servicesButtons = document.querySelectorAll('.services-button');

if (servicesLength !== 0) {

	function servicesShowSlides(i) {
		servicesSlides[servicesCurrent].classList.remove('current-service-info');
		servicesButtons[servicesCurrent].classList.remove('current-service-button');
		servicesSlides[i].classList.add('current-service-info');
		servicesButtons[i].classList.add('current-service-button');
		servicesCurrent = i;
	}

	for (let i = 0; i < servicesLength; i++) {
	 	servicesButtons[i].onclick = function(event) {
	 		event.preventDefault();
	 		servicesShowSlides(i);
		};
	};

}

//
// Скрипт поп-апа с картой
//

let mapPopup = document.querySelector('.map-popup');
let openMapPopupButton = document.querySelector('.open-map-popup');
let closeMapPopup = document.querySelector('.map-popup-close-button');

if (mapPopup !== null) {

	openMapPopupButton.onclick = function(event) {
		event.preventDefault();
		mapPopup.classList.add('is-displayed');
		setTimeout(function() { closeMapPopup.focus(); }, 600);
	};

	closeMapPopup.onclick = function(event) {
		event.preventDefault();
		mapPopup.classList.remove('is-displayed');
	};

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27) {
			if (mapPopup.classList.contains('is-displayed')) {
				event.preventDefault();
				mapPopup.classList.remove('is-displayed');
			};
		}
	});

}

//
// Скрипт 'Напишите нам' 
//

let writeUsPopup = document.querySelector('.write-us-popup');
let writeUsForm = document.querySelector('.write-us-form');
let writeUsButton = document.querySelector('.write-us-button');
let closeWriteUsPopup = document.querySelector('.write-us-close-button');
let writeUsNameField = document.querySelector('.write-us-login');
let writeUsEmailField = document.querySelector('.write-us-email');
let writeUsMessage = document.querySelector('.write-us-message');
let hasStorageSupport = true;
let storageName = '';
let storageEmail = '';

if (writeUsPopup !== null) {

	try {
	 	storageName = localStorage.getItem('name');
	 	storageEmail = localStorage.getItem('email');
	} catch (err) {
	 	hasStorageSupport = false;
	}

	writeUsButton.onclick = function(event) {
		event.preventDefault();
		writeUsPopup.classList.add('is-displayed');
		if (storageName) {
			writeUsNameField.value = storageName;
			writeUsEmailField.value = storageEmail;
			setTimeout(function() { writeUsMessage.focus(); }, 600);
		} else {
			setTimeout(function() { writeUsNameField.focus(); }, 600);
			}
	};

	closeWriteUsPopup.onclick = function(event) {
		event.preventDefault();
		writeUsPopup.classList.remove('is-displayed');
		writeUsPopup.classList.remove('error-animation');
	};

	writeUsForm.addEventListener('submit', function (event) {
		if (!writeUsNameField.value || !writeUsEmailField.value || !writeUsMessage.value) {
			event.preventDefault();
			writeUsPopup.classList.remove('error-animation');
			writeUsPopup.offsetWidth = writeUsPopup.offsetWidth;
			writeUsPopup.classList.add('error-animation');
		} else {
			if (hasStorageSupport) {
				localStorage.setItem('name', writeUsNameField.value);
				localStorage.setItem('email', writeUsEmailField.value);
				writeUsPopup.classList.remove('error-animation');
			};
 		};
	});

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27) {
			if (writeUsPopup.classList.contains('is-displayed')) {
				event.preventDefault();
				writeUsPopup.classList.remove('is-displayed');
				writeUsPopup.classList.remove('error-animation');
			};
		}
	});

}


////////////////////////////////
///     Скрипты каталога     ///
////////////////////////////////

//
// Скрипт 'Товар добавлен в корзину'
//

let addItemButtons = document.querySelectorAll('.add-item-button');
let addedToBasket = document.querySelector('.added-to-basket-popup');
let closeAddedToBasketButton = document.querySelector('.added-to-basket-close');
let continuePurchaseButton = document.querySelector('.continue-purchase-button');

if (addItemButtons != null) {

	function closeAddedToBasketPopup() {
		addedToBasket.classList.remove('is-displayed');
	};

	for (const button of addItemButtons) {
		button.onclick = function(event) {
			event.preventDefault();
			addedToBasket.classList.add('is-displayed');
			continuePurchaseButton.focus();
		};
	};

	continuePurchaseButton.onclick = function(event) {
		event.preventDefault();
		closeAddedToBasketPopup();
	};
	closeAddedToBasketButton.onclick = function(event) {
		event.preventDefault();
		closeAddedToBasketPopup();
	};

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 27) {
			if (addedToBasket.classList.contains('is-displayed')) {
				event.preventDefault();
				addedToBasket.classList.remove('is-displayed');
			};
		}
	});

};
