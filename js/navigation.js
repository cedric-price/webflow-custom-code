document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("nav-scroll");
  const target = document.getElementById("hero-nav-menu");
  let lastScrollY = window.scrollY;
  const isDesktop = window.matchMedia("(min-width: 992px)").matches;

  if (!isDesktop) return; // Exit early on mobile/tablet

  // ✅ Function 1: Show nav when hero section goes out of view
  function initNavReveal() {
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && window.scrollY > 0) {
            nav.style.transform = "translateY(0%)"; // Show navbar
          }
        });
      },
      { root: null, threshold: 0 }
    );

    observer.observe(target);
  }

  // ✅ Function 2: Hide on scroll down, show on scroll up, hide at very top
  function handleNavScroll() {
    window.addEventListener("scroll", function () {
      const currentScrollY = window.scrollY;
      const scrollThreshold = window.innerHeight * 0.5;

      if (currentScrollY === 0) {
        // At top of page
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

  // ✅ Init
  initNavReveal();
  handleNavScroll();
});
