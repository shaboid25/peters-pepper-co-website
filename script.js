// Peter's Pepper Co. — site behaviour
// Everything here is progressive enhancement: with JS off the site is fully usable.

(function () {
    'use strict';

    var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Header: shadow once the page has scrolled ----------------------------
    function initHeader() {
        var header = document.querySelector('.site-header');
        if (!header) return;
        var onScroll = function () {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // --- Mobile menu ----------------------------------------------------------
    function initMenu() {
        var toggle = document.querySelector('.menu-toggle');
        var nav = document.getElementById('site-nav');
        if (!toggle || !nav) return;

        function setOpen(open) {
            toggle.setAttribute('aria-expanded', String(open));
            nav.classList.toggle('is-open', open);
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) setOpen(false);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
                toggle.focus();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 800) setOpen(false);
        });
    }

    // --- Scroll reveal (also triggers the heat-meter climb) -------------------
    function initReveal() {
        var items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        if (reducedMotion || !('IntersectionObserver' in window)) {
            items.forEach(function (el) { el.classList.add('in'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

        items.forEach(function (el) { observer.observe(el); });
    }

    // --- Footer year ----------------------------------------------------------
    function initYear() {
        var year = String(new Date().getFullYear());
        document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
    }

    // --- Easter egg: Konami code -> racing mode -------------------------------
    function initRacingMode() {
        var code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        var progress = 0;

        document.addEventListener('keydown', function (e) {
            progress = e.code === code[progress] ? progress + 1 : (e.code === code[0] ? 1 : 0);
            if (progress !== code.length) return;
            progress = 0;

            var toast = document.createElement('div');
            toast.className = 'racing-toast';
            toast.setAttribute('role', 'status');
            toast.textContent = '🏁 Racing mode activated! 🏁';
            document.body.appendChild(toast);
            if (!reducedMotion) document.body.classList.add('racing-mode');

            setTimeout(function () {
                toast.remove();
                document.body.classList.remove('racing-mode');
            }, 4000);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initHeader();
        initMenu();
        initReveal();
        initYear();
        initRacingMode();
    });
})();
