document.addEventListener("DOMContentLoaded", function () {
    let nav = document.querySelector(".nav_1_component");
    let target = document.querySelector(".navigation_menu");
    let lastScrollY = window.scrollY;
    let isMobile = window.matchMedia("(max-width: 991px)").matches; // Check for tablet & mobile screens

    // ✅ Function 1: Initial Navbar Reveal (Disabled on Mobile & Tablet)
    function initNavReveal() {
        if (!target || isMobile) return; // Skip execution on small screens

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

    // ✅ Function 2: Hide on Scroll Down, Show on Scroll Up (Works on all screen sizes)
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

    // ✅ Run functions
    initNavReveal(); // This runs only on desktops
    handleNavScroll(); // This runs on all screen sizes
});
