document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Reliable Mobile Detection (Works on iPhones, Androids, iPads, etc.)
    function isMobileDevice() {
        return (
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || 
            window.innerWidth <= 767
        );
    }

    function resetAnimations() {
        gsap.killTweensOf("[gsap]");
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

    function applyAnimations() {
        resetAnimations();

        // 🚀 Completely Stop GSAP from Running on Mobile 🚀
        if (isMobileDevice()) {
            document.querySelectorAll("[gsap]").forEach(el => {
                gsap.set(el, { opacity: 1, x: 0, y: 0 }); // Reset any GSAP-applied styles
            });
            return; // Stop execution
        }

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
        if (isMobileDevice()) return; // 🚀 Disable hover scaling on mobile 🚀

        const scaleElements = document.querySelectorAll('[scale="true"]');

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
