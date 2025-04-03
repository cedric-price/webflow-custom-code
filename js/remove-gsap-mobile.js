function removeGSAPAttributesOnMobile() {
    const isMobile = window.matchMedia("(max-width: 991px)").matches;
    const elements = document.querySelectorAll("[gsap]");

    if (isMobile) {
        elements.forEach(el => el.removeAttribute("gsap"));
    }
}

// Run once on page load and again on resize
document.addEventListener("DOMContentLoaded", removeGSAPAttributesOnMobile);
window.addEventListener("resize", removeGSAPAttributesOnMobile);
