document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("#nav-scroll");
    let lastScroll = window.scrollY;
    let isDesktop = window.innerWidth >= 992;
    let hasEntered30svh = false;

    // Hide nav initially on desktop
    if (isDesktop) {
      nav.style.display = "none";
    }

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const svh = window.innerHeight / 100;
      const past30svh = scrollY > 30 * svh;
      const past50svh = scrollY > 50 * svh;
      const isScrollingDown = scrollY > lastScroll;

      // Desktop-only: Toggle nav visibility at 30svh
      if (isDesktop) {
        if (past30svh && !hasEntered30svh) {
          hasEntered30svh = true;
          nav.style.display = "block";
          gsap.fromTo(nav, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
        } else if (!past30svh && hasEntered30svh) {
          hasEntered30svh = false;
          gsap.to(nav, {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              nav.style.display = "none";
            }
          });
          return; // stop further logic when hiding early
        }
      }

      // General scroll direction logic after 50svh (all screens)
      if (past50svh && getComputedStyle(nav).display === "block") {
        if (isScrollingDown) {
          gsap.to(nav, { y: -100, opacity: 0, duration: 0.3, ease: "power2.out" });
        } else {
          gsap.to(nav, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
        }
      }

      lastScroll = scrollY;
    });
  });
