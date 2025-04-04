let lastScrollY = window.scrollY;

gsap.set("#nav-scroll", { yPercent: 0 }); // Ensure it's initially visible

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const threshold = window.innerHeight * 0.5; // 50svh

  if (currentScrollY > lastScrollY && currentScrollY > threshold) {
    // Scroll down
    gsap.to("#nav-scroll", {
      yPercent: -100,
      duration: 0.4,
      ease: "power2.out",
    });
  } else if (currentScrollY < lastScrollY) {
    // Scroll up
    gsap.to("#nav-scroll", {
      yPercent: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }

  lastScrollY = currentScrollY;
});
