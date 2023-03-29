"use strict"

window.onload = function () {
	adaptiveHeader();
	const headerMenuBurger = document.querySelector('.header-menu');
	const headerBurger = document.querySelector('.header-menu__icon');
	if (headerBurger) {
		headerBurger.addEventListener("click", function (element) {
			headerBurger.classList.toggle('_active');
			headerMenuBurger.classList.toggle('_active');
			if (headerMenuBurger.classList.contains('_active')) {
				scrollStop();
			} else {
				scrollActive();
			}
		});
	}
}

function scrollStop() {
	document.body.classList.add("stop-scrolling");
}
function scrollActive() {
	document.body.classList.remove("stop-scrolling");
}

window.addEventListener('resize', function () {
	adaptiveHeader();
});

function adaptiveHeader() {
	let factWidth = window.innerWidth;
	let headerMenuBurger = document.querySelector('.header-menu');
	let headerLang = document.querySelector('.header-top-lang');
	let headerTop = document.querySelector('.header-top');
	if (factWidth <= 750) {
		if (!headerLang.classList.contains('done')) {
			headerLang.classList.add('done');
			[headerLang].forEach(element => {
				headerMenuBurger.insertAdjacentElement('beforeend', element);
			});
		}
	} else if (factWidth > 750) {
		if (headerLang.classList.contains('done')) {
			headerLang.classList.remove('done');
			[headerLang].forEach(element => {
				headerTop.insertAdjacentElement('afterbegin', element);
			});
		}
	}

	let columnLeft = document.querySelector('.header-bottom__column--left');
	let columnRight = document.querySelector('.header-bottom__column--right');
	let headerMenuLeft = document.querySelector('.header-bottom-menu');
	let headerMenuRight = document.querySelector('.header-bottom-menu--right');
	if (factWidth <= 750) {
		if (!headerMenuLeft.classList.contains('done')) {
			headerMenuLeft.classList.add('done');
			[headerMenuLeft].forEach(element => {
				headerMenuBurger.insertAdjacentElement('beforeend', element);
			});
			headerMenuRight.classList.add('done');
			[headerMenuRight].forEach(element => {
				headerMenuBurger.insertAdjacentElement('beforeend', element);
			});
		}
	} else if (factWidth > 750) {
		if (headerMenuLeft.classList.contains('done')) {
			headerMenuLeft.classList.remove('done');
			[headerMenuLeft].forEach(element => {
				columnLeft.insertAdjacentElement('afterbegin', element);
			});
			headerMenuRight.classList.remove('done');
			[headerMenuRight].forEach(element => {
				columnRight.insertAdjacentElement('afterbegin', element);
			});
		}
	}
}

function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(\'' + ibg[i].querySelector('img').getAttribute('src') + '\')';
		}
	}
}
ibg();

function initMap() {
	const uluru = { lat: 55.759374, lng: 37.619661 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10,
		center: uluru,
	});
	const marker = new google.maps.Marker({
		position: uluru,
		map: map,
	});
}

window.initMap = initMap;

const googleTranslateConfig = {
	lang: "en",
};

function TranslateInit() {

	if (googleTranslateConfig.langFirstVisit && !Cookies.get('googtrans')) {
		TranslateCookieHandler("/auto/" + googleTranslateConfig.langFirstVisit);
	}

	let code = TranslateGetCode();
	if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
		document.querySelector('[data-google-lang="' + code + '"]').classList.add('language__active');
	}

	if (code == googleTranslateConfig.lang) {
		TranslateCookieHandler(null, googleTranslateConfig.domain);
	}

	new google.translate.TranslateElement({
		pageLanguage: googleTranslateConfig.lang,
	});


	TranslateEventHandler('click', '[data-google-lang]', function (e) {
		TranslateCookieHandler("/" + googleTranslateConfig.lang + "/" + e.getAttribute("data-google-lang"), googleTranslateConfig.domain);
		window.location.reload();
	});
}

function TranslateGetCode() {
	let lang = (Cookies.get('googtrans') != undefined && Cookies.get('googtrans') != "null") ? Cookies.get('googtrans') : googleTranslateConfig.lang;
	return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}

function TranslateCookieHandler(val, domain) {
	Cookies.set('googtrans', val);
	Cookies.set("googtrans", val, {
		domain: "." + document.domain,
	});

	if (domain == "undefined") return;
	Cookies.set("googtrans", val, {
		domain: domain,
	});

	Cookies.set("googtrans", val, {
		domain: "." + domain,
	});
}

function TranslateEventHandler(event, selector, handler) {
	document.addEventListener(event, function (e) {
		let el = e.target.closest(selector);
		if (el) handler(el);
	});
}















