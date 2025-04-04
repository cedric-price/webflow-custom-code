document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav-scroll");
  const target = document.getElementById("hero-nav-menu");
  let lastScrollY = window.scrollY;
  const isMobile = window.matchMedia("(max-width: 991px)").matches;

  // ✅ Desktop Scroll Behavior
  function initDesktopNavBehavior() {
    if (!nav || !target || isMobile) return;

    let isHeroInView = true;

    // Observer: Track if hero section is in the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroInView = entry.isIntersecting;
          if (isHeroInView) {
            nav.style.transform = "translateY(-100%)"; // Always hide when hero is visible
          }
        });
      },
      { root: null, threshold: 0 }
    );

    observer.observe(target);

    // Scroll event: Show/hide navbar only if hero is NOT in view
    window.addEventListener("scroll", function () {
      const currentScrollY = window.scrollY;

      if (!isHeroInView) {
        if (currentScrollY > lastScrollY) {
          nav.style.transform = "translateY(-100%)"; // Scroll down → hide
        } else if (currentScrollY < lastScrollY) {
          nav.style.transform = "translateY(0%)"; // Scroll up → show
        }
      } else {
        nav.style.transform = "translateY(-100%)"; // Hide if hero is still visible
      }

      lastScrollY = currentScrollY;
    });
  }

  // ✅ Mobile/Tablet Behavior (optional)
  function initMobileNavBehavior() {
    if (!isMobile) return;

    // Add mobile-specific behavior if needed
  }

  // ✅ Init
  initDesktopNavBehavior();
  initMobileNavBehavior();
});
