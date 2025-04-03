import Lenis from 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.41/dist/lenis.min.mjs';

// ✅ Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false, // Disable smooth scroll on touch devices
});

// ✅ Function to keep Lenis running
function raf(time) {
    lenis.raf(time * 1000);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

export default lenis;
