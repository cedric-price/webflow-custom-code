document.addEventListener("DOMContentLoaded", function () {
    let nav = document.querySelector(".nav_1_component");
    let target = document.querySelector(".navigation_menu");
    let lastScrollY = window.scrollY;

    // Observer to show navbar when .navigation_menu exits viewport
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

    // Hide navbar on scroll down, show on scroll up
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
});
