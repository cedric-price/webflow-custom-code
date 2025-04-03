document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Function to reset all animations and ScrollTrigger instances
  function resetAnimations() {
    gsap.killTweensOf("[gsap]"); // Removes existing animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clears previous ScrollTriggers
  }

  function applyAnimations() {
    resetAnimations(); // Ensure no duplicate animations
    
    const isMobile = window.matchMedia("(max-width: 991px)").matches;
    const elements = document.querySelectorAll("[gsap]");

    elements.forEach(el => {
      // Determine if standard animation applies (for mobile or default animation)
      const isStandard = isMobile || el.getAttribute("animation") === "standard";

      // Get animation attributes or use defaults
      let offset = isStandard ? 100 : parseFloat(el.getAttribute("data-offset")) || 100;
      let delay = isStandard ? 0 : parseFloat(el.getAttribute("data-delay")) || 0;
      let time = isStandard ? 0.5 : parseFloat(el.getAttribute("data-time")) || 1;
      let direction = isStandard ? "bottom" : el.getAttribute("data-direction") || "left";

      // Define initial animation properties
      let fromVars = { opacity: 0 };
      if (direction === "left") fromVars.x = -offset;
      if (direction === "right") fromVars.x = offset;
      if (direction === "up") fromVars.y = -offset;
      if (direction === "down") fromVars.y = offset;

      gsap.set(el, fromVars); // Ensure element starts in original position

      // Animate the element when it enters the viewport
      gsap.fromTo(
        el,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: time,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom", // Starts animation when element enters viewport
            toggleActions: "play none none none",
          }
        }
      );
    });

    ScrollTrigger.refresh(); // Refresh to recognize new animations
  }

  // Function to handle hover scaling on desktop
  function handleHoverScaling() {
    const isMobile = window.matchMedia("(max-width: 991px)").matches;
    const scaleElements = document.querySelectorAll('[scale="true"]');

    if (isMobile) {
      // Disable scaling on mobile
      scaleElements.forEach(el => gsap.set(el, { scale: 1 }));
    } else {
      // Enable scaling on desktop
      scaleElements.forEach(el => {
        gsap.set(el, { transformOrigin: "center center" });
        el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" }));
        el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" }));
      });
    }
  }

  // Run animation and hover scaling on page load
  applyAnimations();
  handleHoverScaling();

  // Handle animations on window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      applyAnimations();
      handleHoverScaling();
    }, 200); // Debounce to prevent excessive calls
  });
});
