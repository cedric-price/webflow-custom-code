document.addEventListener("DOMContentLoaded", function () {
    // Only execute script on desktop (min-width: 992px)
    function isDesktop() {
        return window.innerWidth >= 992;
    }

    if (!isDesktop()) return; // Stop script if not desktop

    let nav = document.querySelector(".nav_1_component");
    let target = document.querySelector(".navigation_menu");
    let lastScrollY = window.scrollY;
    let isNavVisible = false;

    // Observer to show navbar when .navigation_menu exits viewport
    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    nav.style.transform = "translateY(0%)"; // Show navbar
                    isNavVisible = true;
                } else {
                    nav.style.transform = "translateY(-100%)"; // Hide navbar
                    isNavVisible = false;
                }
            });
        },
        { root: null, threshold: 0 }
    );
    observer.observe(target);

    // Scroll event for hiding/showing navbar when scrolling past 50svh
    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;
        let scrollThreshold = window.innerHeight * 0.5; // 50svh in pixels

        if (isNavVisible) {
            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                // Scrolling down past 50svh → Hide navbar
                nav.style.transform = "translateY(-100%)";
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up → Show navbar
                nav.style.transform = "translateY(0%)";
            }
        }

        lastScrollY = currentScrollY;
    });
});
