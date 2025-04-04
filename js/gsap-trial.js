  document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav-scroll");
    let lastScrollY = window.scrollY;

    // Set initial position
    gsap.set(nav, { y: 0 });

    window.addEventListener("scroll", function () {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down → hide navbar
        gsap.to(nav, { y: "-100%", duration: 0.4, ease: "power2.out" });
      } else {
        // Scrolling up → show navbar
        gsap.to(nav, { y: "0%", duration: 0.4, ease: "power2.out" });
      }

      lastScrollY = currentScrollY;
    });
  });
