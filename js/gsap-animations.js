document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    function resetAnimations() {
        gsap.killTweensOf("[gsap]");
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

    function applyAnimations() {
        resetAnimations();

        const isMobile = window.matchMedia("(max-width: 991px)").matches;
        if (isMobile) return; // Stop animations on mobile & tablet

        const elements = document.querySelectorAll("[gsap]");
        elements.forEach(el => {
            let offset = parseFloat(el.getAttribute("data-offset")) || 100;
            let delay = parseFloat(el.getAttribute("data-delay")) || 0;
            let time = parseFloat(el.getAttribute("data-time")) || 1;
            let direction = el.getAttribute("data-direction") || "left";

            let fromVars = { opacity: 0 };
            if (direction === "left") fromVars.x = -offset;
            if (direction === "right") fromVars.x = offset;
            if (direction === "up") fromVars.y = -offset;
            if (direction === "down" || direction === "bottom") fromVars.y = offset;

            gsap.set(el, fromVars);

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

    applyAnimations();
    handleHoverScaling();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            applyAnimations();
            handleHoverScaling();
        }, 200);
    });
});
