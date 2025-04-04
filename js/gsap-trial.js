 const navBar = document.getElementById("nav-scroll");

  if (window.innerWidth >= 960 && navBar) {
    // Force show the nav-bar in case CSS hides it
    gsap.set(navBar, { display: "block", visibility: "visible", opacity: 1, y: 0 });

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down — hide navbar
        gsap.to(navBar, {
          y: "-100%", // move it out of view
          duration: 0.4,
          ease: "power2.out"
        });
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up — show navbar
        gsap.to(navBar, {
          y: "0%",
          duration: 0.4,
          ease: "power2.out"
        });
      }

      lastScrollY = currentScrollY;
    });
  }
