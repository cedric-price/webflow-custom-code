import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.41/dist/lenis.min.mjs';

document.addEventListener("DOMContentLoaded", function () {
    // ✅ Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2, // Smooth scrolling duration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
        smoothWheel: true, // Enable smooth scroll for mouse wheel
        smoothTouch: false, // Keep touch interactions native for mobile
    });

    // ✅ Function to continuously update Lenis on each frame
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ✅ Scroll event listener (if needed for other logic)
    lenis.on("scroll", (e) => {
        console.log("Scrolling position:", e.scroll); // Debugging/logging (optional)
    });
});
