document.addEventListener("DOMContentLoaded", function () {
    const isMobile = window.matchMedia("(max-width: 991px)").matches;

    // Skip everything if it's mobile/tablet
    if (isMobile) return;

    let nav = document.getElementById("nav-scroll");
    let target = document.getElementById("hero-nav-menu");
    let lastScrollY = window.scrollY;

    // ✅ Function 1: Initial Navbar Reveal
    function initNavReveal() {
        if (!target) return;

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

    // ✅ Function 2: Hide on Scroll Down, Show on Scroll Up
    function handleNavScroll() {
        window.addEventListener("scroll", function () {
            let currentScrollY = window.scrollY;
            let scrollThreshold = window.innerHeight * 0.5; // 50svh in pixels

            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                nav.style.transform = "translateY(-100%)"; // Hide navbar
            } else if (currentScrollY < lastScrollY) {
                nav.style.transform = "translateY(0%)"; // Show navbar
            }

            lastScrollY = currentScrollY;
        });
    }

    // ✅ Run functions (Desktop only)
    initNavReveal();
    handleNavScroll();
});
