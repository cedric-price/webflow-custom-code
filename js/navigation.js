document.addEventListener("DOMContentLoaded", function () {
    let nav = document.getElementById("nav-scroll");
    let target = document.getElementById("hero-nav-menu");
    let lastScrollY = window.scrollY;
    let isMobile = window.matchMedia("(max-width: 991px)").matches; // Tablet & mobile check

    // ✅ Function 1: Initial Navbar Reveal (Desktop only)
    function initNavReveal() {
        if (!target || isMobile) return;

        let observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        nav.style.transform = "translateY(0%)"; // Show navbar
                    }
                });
            },
            { root: null, threshold: 0 }
        );

        observer.observe(target);
    }

    // ✅ Function 2: Hide on scroll down, show on scroll up (except at top), only on desktop
    function handleNavScroll() {
        if (isMobile) return;

        window.addEventListener("scroll", function () {
            let currentScrollY = window.scrollY;
            let scrollThreshold = window.innerHeight * 0.5; // 50svh

            if (currentScrollY === 0) {
                // At top of page, keep navbar hidden
                nav.style.transform = "translateY(-100%)";
            } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                // Scroll down past threshold
                nav.style.transform = "translateY(-100%)";
            } else if (currentScrollY < lastScrollY) {
                // Scroll up
                nav.style.transform = "translateY(0%)";
            }

            lastScrollY = currentScrollY;
        });
    }

    // ✅ Run
    initNavReveal();
    handleNavScroll();
});
