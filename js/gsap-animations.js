function applyAnimations() {
    resetAnimations();

    if (isMobileDevice()) {
        document.querySelectorAll("[gsap]").forEach(el => {
            gsap.set(el, { opacity: 1, x: 0, y: 0 }); // Reset styles
        });
        return; // 🚀 Stop animations on mobile
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
