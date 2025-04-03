document.addEventListener("DOMContentLoaded", function () {
    let nav = document.querySelector(".nav_1_component");
    let target = document.querySelector(".navigation_menu");
    let lastScrollY = window.scrollY;
    let isNavVisible = false;

    // Function to check if screen is desktop
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
    } else {
        // On mobile/tablet, set nav visible by default
        nav.style.transform = "translateY(0%)";
        isNavVisible = true;
    }

    // **Navbar hides on scroll down, appears on scroll up - works on ALL screen sizes**
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
