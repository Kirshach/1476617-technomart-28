////////////////////////////////
/// Скрипты главной страницы ///
////////////////////////////////

//
// Скрипт промо-блока
//

let promoSlides = document.querySelectorAll('.promo-slide');
let promoLength = promoSlides.length;

if (promoLength !== 0) {

	let promoCurrent = 0;
	let promoButtons = document.querySelectorAll('.promo-slidenum-button');

	function promoShowSlides(i) {
		promoSlides[promoCurrent].classList.remove('is-displayed');
		promoButtons[promoCurrent].classList.remove('promo-current-button');
		promoSlides[i].classList.add('is-displayed');
		promoButtons[i].classList.add('promo-current-button');
		promoCurrent = i;
	};

	for (let i = 0; i < promoLength; i++) {
	 	promoButtons[i].onclick = function(event) {
	 		event.preventDefault();
	 		promoShowSlides(i);
		};
	};

	let promoPreviousSlide = document.querySelector('.promo-previous');
	let promoNextSlide = document.querySelector('.promo-next');

	promoPreviousSlide.onclick = function(event) {
		event.preventDefault();
		if (promoCurrent > 0) {
			promoShowSlides(promoCurrent - 1)
		} else {
			promoShowSlides(promoLength - 1)
		};
	};

	promoNextSlide.onclick = function(event) {
		event.preventDefault();
		if (promoCurrent < (promoLength - 1)) {
			promoShowSlides(promoCurrent + 1)
		} else {
			promoShowSlides(0)
		};
	};

}

//
// Скрипт блока "Сервисы"
//

let servicesSlides = document.querySelectorAll('.service-info');
let servicesLength = servicesSlides.length;

if (servicesLength !== 0) {

	let servicesCurrent = 0;
	let servicesButtons = document.querySelectorAll('.services-button');

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

if (mapPopup !== null) {

	let openMapPopupButton = document.querySelector('.open-map-popup');
	let closeMapPopup = document.querySelector('.map-popup-close-button');

	openMapPopupButton.onclick = function(event) {
		event.preventDefault();
		mapPopup.classList.add('is-displayed');
		setTimeout(function() { mapPopup.focus(); }, 600);
	};

	closeMapPopup.onclick = function(event) {
		event.preventDefault();
		mapPopup.classList.remove('is-displayed');
	};

	window.addEventListener("keydown", function (event) {
		if (event.keyCode === 27) {
			if (mapPopup.classList.contains("is-displayed")) {
				event.preventDefault();
				mapPopup.classList.remove("is-displayed");
			};
		}
	});

}

//
// Скрипт "Напишите нам" 
//

let writeUsPopup = document.querySelector('.write-us-popup');

if (writeUsPopup !== null) {

	let writeUsForm = document.querySelector('.write-us-form');
	let writeUsButton = document.querySelector('.write-us-button');
	let closeWriteUsPopup = document.querySelector('.write-us-close-button');
	let writeUsNameField = document.querySelector('.write-us-login');
	let writeUsEmailField = document.querySelector('.write-us-email');
	let writeUsMessage = document.querySelector('.write-us-message');

	var hasStorageSupport = true;
	var storageName = "";
	var storageEmail = "";

	try {
	 	storageName = localStorage.getItem("name");
	 	storageEmail = localStorage.getItem("email");
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
		writeUsPopup.classList.remove("error-animation");
	};

	writeUsForm.addEventListener("submit", function (event) {
		if (!writeUsNameField.value || !writeUsEmailField.value || !writeUsMessage.value) {
			event.preventDefault();
			writeUsPopup.classList.remove("error-animation");
			writeUsPopup.offsetWidth = writeUsPopup.offsetWidth;
			writeUsPopup.classList.add("error-animation");
		} else {
			if (hasStorageSupport) {
				localStorage.setItem("name", writeUsNameField.value);
				localStorage.setItem("email", writeUsEmailField.value);
				writeUsPopup.classList.remove("error-animation");
			};
 		};
	});

	window.addEventListener("keydown", function (event) {
		if (event.keyCode === 27) {
			if (writeUsPopup.classList.contains("is-displayed")) {
				event.preventDefault();
				writeUsPopup.classList.remove("is-displayed");
				writeUsPopup.classList.remove("error-animation");
			};
		}
	});

}


////////////////////////////////
///     Скрипты каталога     ///
////////////////////////////////

//
// Скрипт "Товар добавлен в корзину"
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

	window.addEventListener("keydown", function (event) {
		if (event.keyCode === 27) {
			if (addedToBasket.classList.contains("is-displayed")) {
				event.preventDefault();
				addedToBasket.classList.remove("is-displayed");
			};
		}
	});

};
