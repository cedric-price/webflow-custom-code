document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav-scroll");
  const target = document.getElementById("hero-nav-menu");

  function runDesktopNavLogic() {
    let lastScrollY = window.scrollY;

    // Function: Reveal on scroll past hero
    function initNavReveal() {
      if (!target) return;

      let observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              nav.style.transform = "translateY(0%)"; // Show navbar
            } else {
              nav.style.transform = "translateY(-100%)"; // Hide navbar if back at top
            }
          });
        },
        { root: null, threshold: 0 }
      );

      observer.observe(target);
    }

    // Function: Hide on scroll down, show on scroll up (desktop only)
    function handleNavScrollDesktop() {
      window.addEventListener("scroll", function () {
        let currentScrollY = window.scrollY;
        let scrollThreshold = window.innerHeight * 0.5;

        if (currentScrollY === 0) {
          nav.style.transform = "translateY(-100%)"; // Hide navbar at top
        } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
          nav.style.transform = "translateY(-100%)"; // Hide on scroll down
        } else if (currentScrollY < lastScrollY) {
          nav.style.transform = "translateY(0%)"; // Show on scroll up
        }

        lastScrollY = currentScrollY;
      });
    }

    // Run both desktop-specific functions
    initNavReveal();
    handleNavScrollDesktop();
  }

  function runMobileNavLogic() {
    // Placeholder for mobile behavior
    // Example: nav.style.transform = "translateY(0%)"; // Always show
  }

  // Media queries
  const isDesktop = window.matchMedia("(min-width: 992px)").matches;

  if (isDesktop) {
    runDesktopNavLogic();
  } else {
    runMobileNavLogic();
  }
});
