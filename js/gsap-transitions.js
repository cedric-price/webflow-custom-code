document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function resetAnimations() {
        gsap.killTweensOf("[gsap]");
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

    function applyAnimations() {
        resetAnimations(); // Clear existing animations

        const isMobile = window.matchMedia("(max-width: 991px)").matches;
        const elements = document.querySelectorAll("[gsap]");

        elements.forEach(el => {
            const isDesktop = !isMobile;
            const hasMobileAnim = el.getAttribute("mobile-animation") === "true";
            const isStandard = el.getAttribute("animation") === "standard";

            // Skip animation unless it's:
            // - Desktop
            // - OR Mobile + mobile-animation="true"
            if (!(isDesktop || hasMobileAnim)) return;

            // Use standard animation logic either way
            const useStandard = isStandard || hasMobileAnim;

            // Animation values
            let offset = useStandard ? 100 : parseFloat(el.getAttribute("data-offset")) || 100;
            let delay = useStandard ? 0 : parseFloat(el.getAttribute("data-delay")) || 0;
            let time = useStandard ? 0.5 : parseFloat(el.getAttribute("data-time")) || 1;
            let direction = useStandard ? "bottom" : el.getAttribute("data-direction") || "left";

            // From vars based on direction
            let fromVars = { opacity: 0 };
            if (direction === "left") fromVars.x = -offset;
            if (direction === "right") fromVars.x = offset;
            if (direction === "up") fromVars.y = -offset;
            if (direction === "down" || direction === "bottom") fromVars.y = offset;

            // Set initial position
            gsap.set(el, fromVars);

            // Animate in
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

        ScrollTrigger.refresh();
    }

    function handleHoverScaling() {
        const isMobile = window.matchMedia("(max-width: 991px)").matches;
        const scaleElements = document.querySelectorAll('[scale="true"]');

        if (isMobile) {
            scaleElements.forEach(el => {
                gsap.set(el, { scale: 1 });
                el.onmouseenter = null;
                el.onmouseleave = null;
            });
        } else {
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

    // Initial run
    applyAnimations();
    handleHoverScaling();

    // Debounced resize handling
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            applyAnimations();
            handleHoverScaling();
        }, 200);
    });
});
