document.addEventListener("DOMContentLoaded", function () {
    let nav = document.querySelector(".nav_1_component");
    let target = document.querySelector(".navigation_menu");
    let lastScrollY = window.scrollY;

    function isDesktop() {
        return window.innerWidth >= 992;
    }

    // **Initial navbar appearance - only for desktop**
    if (isDesktop()) {
        let observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        nav.style.transform = "translateY(0%)"; // Show navbar
                    } else {
                        nav.style.transform = "translateY(-100%)"; // Hide navbar
                    }
                });
            },
            { root: null, threshold: 0 }
        );
        observer.observe(target);
    }

    // **Navbar hides on scroll down, appears on scroll up - on ALL screen sizes**
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
