/*!
 * Onimisi Sadiq — Portfolio interaction layer
 * Typing hero, scroll-reveal, scroll progress, back-to-top.
 */
(function () {
    "use strict";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.addEventListener("DOMContentLoaded", function () {

        /* ---------- Rotating typed role ---------- */
        const roleEl = document.querySelector(".hero-role");
        if (roleEl && !reduceMotion) {
            const roles = [
                "Software Engineer",
                "Computer Engineering Student",
                "Robotics Tinkerer",
                "Machine Learning Explorer",
                "Systems Builder",
            ];
            let r = 0, c = 0, deleting = false;

            const tick = function () {
                const word = roles[r];
                roleEl.textContent = word.substring(0, c);

                if (!deleting && c < word.length) {
                    c++;
                    setTimeout(tick, 70 + Math.random() * 50);
                } else if (!deleting && c === word.length) {
                    deleting = true;
                    setTimeout(tick, 1600);
                } else if (deleting && c > 0) {
                    c--;
                    setTimeout(tick, 35);
                } else {
                    deleting = false;
                    r = (r + 1) % roles.length;
                    setTimeout(tick, 350);
                }
            };
            tick();
        } else if (roleEl) {
            roleEl.textContent = "Software Engineer";
        }

        /* ---------- Scroll reveal ---------- */
        const revealTargets = document.querySelectorAll(".reveal, .page-section");
        if ("IntersectionObserver" in window && !reduceMotion) {
            const io = new IntersectionObserver(function (entries, obs) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
            revealTargets.forEach(function (el) { io.observe(el); });
        } else {
            revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
        }

        /* ---------- Scroll progress bar ---------- */
        const progress = document.getElementById("scrollProgress");
        const backToTop = document.getElementById("backToTop");

        const onScroll = function () {
            const doc = document.documentElement;
            const scrollTop = doc.scrollTop || document.body.scrollTop;
            const height = doc.scrollHeight - doc.clientHeight;
            const pct = height > 0 ? (scrollTop / height) * 100 : 0;
            if (progress) progress.style.width = pct + "%";
            if (backToTop) backToTop.classList.toggle("show", scrollTop > 500);
        };
        document.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        if (backToTop) {
            backToTop.addEventListener("click", function () {
                window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
            });
        }

        /* ---------- Subtle parallax tilt on stack/portfolio cards ---------- */
        if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
            const tiltCards = document.querySelectorAll(".stack-card");
            tiltCards.forEach(function (card) {
                card.addEventListener("mousemove", function (e) {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    card.style.transform =
                        "translateY(-6px) rotateX(" + (-y * 5) + "deg) rotateY(" + (x * 5) + "deg)";
                });
                card.addEventListener("mouseleave", function () {
                    card.style.transform = "";
                });
            });
        }
    });
})();
