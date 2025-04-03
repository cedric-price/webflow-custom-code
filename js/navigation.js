<style>
    .nav_1_component {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        transition: transform 0.3s ease-in-out;
        transform: translateY(-100%); /* Initially hidden */
        z-index: 1000; /* Ensure it's always on top */
    }
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
    let nav = document.querySelector(".nav_1_component");
    let target = document.querySelector(".navigation_menu");
    let lastScrollY = window.scrollY;
    let isNavVisible = false;

    function showNav() {
        nav.style.transform = "translateY(0%)"; // Show navbar
        isNavVisible = true;
    }

    function hideNav() {
        nav.style.transform = "translateY(-100%)"; // Hide navbar
        isNavVisible = false;
    }

    // Intersection Observer to detect `.navigation_menu` exiting viewport
    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    showNav();
                }
            });
        },
        { root: null, threshold: 0 }
    );

    if (target) observer.observe(target);

    // Scroll event for showing/hiding navbar
    window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;
        let scrollThreshold = window.innerHeight * 0.5; // 50% of viewport height

        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            hideNav(); // Hide navbar on scroll down
        } else if (currentScrollY < lastScrollY || currentScrollY < scrollThreshold) {
            showNav(); // Show navbar on scroll up
        }

        lastScrollY = currentScrollY;
    });

    // Ensure the navbar is visible when the page is refreshed near the top
    if (window.scrollY < window.innerHeight * 0.5) {
        hideNav();
    }
});
</script>
