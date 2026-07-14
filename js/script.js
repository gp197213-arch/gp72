/**
 * Portfolio — Interactivity
 * Smooth scroll · reveal on scroll · theme toggle · mobile nav
 */
(function () {
    'use strict';

    // =============================================
    // Theme
    // =============================================
    var THEME_KEY = 'portfolio-theme';

    function getTheme() {
        var saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        var icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }

    setTheme(getTheme());

    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // =============================================
    // Mobile nav
    // =============================================
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');

    function closeMenu() {
        if (toggle) toggle.classList.remove('active');
        if (menu) menu.classList.remove('open');
        document.body.style.overflow = '';
    }

    function openMenu() {
        if (toggle) toggle.classList.add('active');
        if (menu) menu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.contains('open') ? closeMenu() : openMenu();
        });

        var links = menu.querySelectorAll('.nav__link');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', closeMenu);
        }

        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) closeMenu();
        });

        document.addEventListener('click', function (e) {
            if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // =============================================
    // Reveal on scroll
    // =============================================
    var revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var revealObs = new IntersectionObserver(function (entries) {
            for (var j = 0; j < entries.length; j++) {
                if (entries[j].isIntersecting) {
                    entries[j].target.classList.add('visible');
                    revealObs.unobserve(entries[j].target);
                }
            }
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

        for (var k = 0; k < revealEls.length; k++) {
            revealObs.observe(revealEls[k]);
        }
    } else {
        for (var m = 0; m < revealEls.length; m++) {
            revealEls[m].classList.add('visible');
        }
    }

    // =============================================
    // Active nav highlight
    // =============================================
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');

    if ('IntersectionObserver' in window && sections.length && navLinks.length) {
        var navObs = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    var id = entries[i].target.getAttribute('id');
                    for (var j = 0; j < navLinks.length; j++) {
                        var match = navLinks[j].getAttribute('href') === '#' + id;
                        navLinks[j].classList.toggle('active', match);
                    }
                }
            }
        }, { threshold: 0.3, rootMargin: '-64px 0px -50% 0px' });

        for (var n = 0; n < sections.length; n++) {
            navObs.observe(sections[n]);
        }
    }

    // =============================================
    // Contact form (demo)
    // =============================================
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = form.querySelector('#name');
            var email = form.querySelector('#email');
            var message = form.querySelector('#message');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }

            var btn = form.querySelector('button[type="submit"]');
            var original = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Отправлено!';
            btn.disabled = true;
            btn.style.opacity = '0.7';
            form.reset();

            setTimeout(function () {
                btn.innerHTML = original;
                btn.disabled = false;
                btn.style.opacity = '';
            }, 3000);
        });
    }
})();
