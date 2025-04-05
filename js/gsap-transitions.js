document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function resetAnimations() {
        gsap.killTweensOf("[gsap]");
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

    function applyAnimations() {
        const isMobile = window.matchMedia("(max-width: 991px)").matches;
        if (isMobile) return; // Exit if on mobile or tablet

        resetAnimations(); // Ensure no duplicate animations

        const elements = document.querySelectorAll("[gsap]");

        elements.forEach(el => {
            const isStandard = el.getAttribute("animation") === "standard";

            // Set animation values
            let offset = isStandard ? 100 : parseFloat(el.getAttribute("data-offset")) || 100;
            let delay = isStandard ? 0 : parseFloat(el.getAttribute("data-delay")) || 0;
            let time = isStandard ? 0.5 : parseFloat(el.getAttribute("data-time")) || 1;
            let direction = isStandard ? "bottom" : el.getAttribute("data-direction") || "left";

            // Define initial position based on direction
            let fromVars = { opacity: 0 };
            if (direction === "left") fromVars.x = -offset;
            if (direction === "right") fromVars.x = offset;
            if (direction === "up") fromVars.y = -offset;
            if (direction === "down" || direction === "bottom") fromVars.y = offset;

            // Ensure element starts in original position
            gsap.set(el, fromVars);

            // Animate with GSAP when element enters viewport
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
                        start: "top bottom",
                        toggleActions: "play none none none",
                    }
                }
            );
        });

        ScrollTrigger.refresh(); // Ensure new triggers are recognized
    }

    function handleHoverScaling() {
        const isMobile = window.matchMedia("(max-width: 991px)").matches;
        const scaleElements = document.querySelectorAll('[scale="true"]');

        if (isMobile) {
            // Disable scaling on mobile & tablet
            scaleElements.forEach(el => {
                gsap.set(el, { scale: 1 });
                el.onmouseenter = null;
                el.onmouseleave = null;
            });
        } else {
            // Enable scaling on desktop
            scaleElements.forEach(el => {
                gsap.set(el, { transformOrigin: "center center" });

                el.addEventListener("mouseenter", function () {
                    gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
                });

                el.addEventListener("mouseleave", function () {
                    gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
                });
            });
        }
    }

    // Run on page load and on resize
    applyAnimations();
    handleHoverScaling();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            applyAnimations(); // Only runs if screen is desktop
            handleHoverScaling();
        }, 200);
    });
});
