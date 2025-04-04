document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav-scroll");
    const target = document.getElementById("hero-nav-menu");
    let lastScrollY = window.scrollY;
    const isMobile = window.matchMedia("(max-width: 991px)").matches;

    // ✅ Function 1: Initial Navbar Reveal (Desktop only)
    function initNavReveal() {
        if (!target || isMobile) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        nav.style.transform = "translateY(0%)"; // Show navbar when hero is out of view
                    }
                });
            },
            { root: null, threshold: 0 }
        );

        observer.observe(target);
    }

    // ✅ Function 2: Hide on scroll down, show on scroll up, but hide at top (Desktop only)
    function handleNavScroll() {
        if (isMobile) return;

        window.addEventListener("scroll", function () {
            const currentScrollY = window.scrollY;
            const scrollThreshold = window.innerHeight * 0.5;

            if (currentScrollY === 0) {
                // If at top of the page
                nav.style.transform = "translateY(-100%)"; // Hide navbar
            } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                // Scrolling down
                nav.style.transform = "translateY(-100%)"; // Hide navbar
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                nav.style.transform = "translateY(0%)"; // Show navbar
            }

            lastScrollY = currentScrollY;
        });
    }

    // ✅ Run functions
    initNavReveal();
    handleNavScroll();
});
