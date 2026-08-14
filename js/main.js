(function () {
	'use strict';

	/* ---------------------------------------------------------------
	   Тема: сохранённый выбор → системная настройка
	   --------------------------------------------------------------- */

	var root = document.documentElement;
	var STORAGE_KEY = 'resume-theme';

	function storedTheme() {
		try {
			return localStorage.getItem(STORAGE_KEY);
		} catch (e) {
			return null;
		}
	}

	function systemTheme() {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}

	function applyTheme(theme) {
		root.setAttribute('data-theme', theme);
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch (e) { /* приватный режим — просто не запоминаем */ }
	}

	var saved = storedTheme();
	if (saved) {
		root.setAttribute('data-theme', saved);
	}

	var toggle = document.querySelector('.theme-toggle');
	if (toggle) {
		toggle.addEventListener('click', function () {
			var current = root.getAttribute('data-theme') || systemTheme();
			applyTheme(current === 'dark' ? 'light' : 'dark');
		});
	}

	/* ---------------------------------------------------------------
	   Появление блоков при скролле
	   --------------------------------------------------------------- */

	var reduceMotion = window.matchMedia
		&& window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (!reduceMotion && 'IntersectionObserver' in window) {
		var targets = document.querySelectorAll('.job, .stack__group, .edu__item, .prose');

		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		}, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

		targets.forEach(function (el) {
			el.classList.add('reveal');
			observer.observe(el);
		});
	}

	/* ---------------------------------------------------------------
	   Год в подвале
	   --------------------------------------------------------------- */

	var year = document.getElementById('year');
	if (year) {
		year.textContent = String(new Date().getFullYear());
	}
})();
