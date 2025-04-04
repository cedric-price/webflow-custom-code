function removeGSAPAttributesOnMobile() {
  const isMobile = window.matchMedia("(max-width: 991px)").matches;
  const elements = document.querySelectorAll("[gsap]");

  if (isMobile) {
    elements.forEach(el => {
      // Skip removing gsap attribute from #nav-scroll and its children
      if (!el.closest("#nav-scroll")) {
        el.removeAttribute("gsap");
      }
    });
  }
}

// Run once on page load and again on resize
document.addEventListener("DOMContentLoaded", removeGSAPAttributesOnMobile);
window.addEventListener("resize", removeGSAPAttributesOnMobile);
