document.addEventListener("DOMContentLoaded", () => {
  // Cache elements
  const elements = {
    btn: document.getElementById("load-more"),
    text: document.getElementById("load-more-text"), // The text span inside button
    icon: document.getElementById("icon-button"),
    container: document.getElementById("list-hide")
  };

  // Set initial state
  gsap.set(elements.container, {
    height: 0,
    opacity: 0,
    display: "none",
    overflow: "hidden"
  });

  // Store initial button width to prevent layout shift
  const initialBtnWidth = elements.btn.offsetWidth;
  elements.btn.style.minWidth = `${initialBtnWidth}px`;

  // Store original text
  const originalText = elements.text.textContent.trim();
  let isExpanded = false;

  elements.btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isExpanded) {
      // EXPAND ANIMATION
      gsap.timeline()
        .set(elements.container, { display: "block" })
        .to(elements.container, {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to(elements.icon, {
          rotation: 180,
          duration: 0.8,
          ease: "power2.inOut"
        }, 0)
        .call(() => {
          elements.text.textContent = "Show less";
        }, null, 0);

      isExpanded = true;
    } else {
      // COLLAPSE ANIMATION
      const currentScroll = window.scrollY;
      const hiddenItemHeight = elements.container.offsetHeight;

      gsap.timeline()
        .to(elements.container, {
          height: 0,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onUpdate: function() {
            const progress = gsap.getProperty(this.targets()[0], "height") / hiddenItemHeight;
            window.scrollTo(0, currentScroll - (hiddenItemHeight * (1 - progress)));
          }
        })
        .to(elements.icon, {
          rotation: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, 0)
        .call(() => {
          elements.text.textContent = originalText;
        }, null, 0)
        .set(elements.container, { display: "none" });

      isExpanded = false;
    }
  });
});
