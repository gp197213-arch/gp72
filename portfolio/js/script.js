/**
 * Portfolio — Интерактивность
 * Плавный скролл, анимация появления, переключение темы, мобильное меню
 */
(function () {
    'use strict';

    // =============================================
    // Переключение темы
    // =============================================
    var THEME_KEY = 'portfolio-theme';

    function getPreferredTheme() {
        var saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        var icon = document.querySelector('#themeToggle i');
        if (!icon) return;
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    // Применяем тему сразу
    applyTheme(getPreferredTheme());

    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // =============================================
    // Мобильное меню
    // =============================================
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');

    function closeMenu() {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    function openMenu() {
        if (navToggle) navToggle.classList.add('active');
        if (navMenu) navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            if (navMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Закрытие при клике на ссылку
        var navLinks = navMenu.querySelectorAll('.nav__link');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', closeMenu);
        }

        // Закрытие при ресайзе до десктопа
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    }

    // =============================================
    // Анимация появления (Intersection Observer)
    // =============================================
    function initRevealObserver() {
        var revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length) return;

        // Fallback для старых браузеров
        if (!('IntersectionObserver' in window)) {
            for (var i = 0; i < revealElements.length; i++) {
                revealElements[i].classList.add('visible');
            }
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            for (var j = 0; j < entries.length; j++) {
                if (entries[j].isIntersecting) {
                    entries[j].target.classList.add('visible');
                    observer.unobserve(entries[j].target);
                }
            }
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        for (var i = 0; i < revealElements.length; i++) {
            observer.observe(revealElements[i]);
        }
    }

    // =============================================
    // Подсветка активной секции в навигации
    // =============================================
    function initActiveNavHighlight() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav__link');
        if (!sections.length || !navLinks.length) return;

        if (!('IntersectionObserver' in window)) return;

        var observer = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var id = entries[i].target.getAttribute('id');
                    for (var j = 0; j < navLinks.length; j++) {
                        var link = navLinks[j];
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    }
                }
            }
        }, {
            threshold: 0.3,
            rootMargin: '-64px 0px -50% 0px'
        });

        for (var k = 0; k < sections.length; k++) {
            observer.observe(sections[k]);
        }
    }

    // =============================================
    // Форма контактов (демо-обработчик)
    // =============================================
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = form.querySelector('#name');
            var email = form.querySelector('#email');
            var message = form.querySelector('#message');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            // Демо-ответ
            var submitBtn = form.querySelector('button[type="submit"]');
            var originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Отправлено!';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            form.reset();

            setTimeout(function () {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
            }, 3000);
        });
    }

    // =============================================
    // Закрытие меню при клике вне
    // =============================================
    function initOutsideClick() {
        document.addEventListener('click', function (e) {
            if (
                navMenu && navMenu.classList.contains('open') &&
                !navMenu.contains(e.target) &&
                !navToggle.contains(e.target)
            ) {
                closeMenu();
            }
        });
    }

    // =============================================
    // Инициализация
    // =============================================
    document.addEventListener('DOMContentLoaded', function () {
        initRevealObserver();
        initActiveNavHighlight();
        initContactForm();
        initOutsideClick();
    });
})();
