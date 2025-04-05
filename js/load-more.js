document.addEventListener("DOMContentLoaded", function () {
  const loadMoreBtn = document.getElementById("load-more");
  const loadMoreText = document.getElementById("load-more-text");
  const iconButton = document.getElementById("icon-button");
  const hiddenItem = document.getElementById("list-hide");

  loadMoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    
    // Store current scroll position
    const scrollYBefore = window.scrollY;
    const btnPosition = loadMoreBtn.getBoundingClientRect().top;
    
    let isExpanded = hiddenItem.style.display === "block";

    if (isExpanded) {
      // Collapse with smooth transition
      hiddenItem.style.opacity = "0";
      hiddenItem.style.visibility = "hidden";
      hiddenItem.style.height = "0";
      hiddenItem.style.overflow = "hidden";
    } else {
      // Expand with smooth transition
      hiddenItem.style.display = "block";
      hiddenItem.style.visibility = "visible";
      hiddenItem.style.height = "auto";
      hiddenItem.style.opacity = "1";
    }

    // CSS transitions
    hiddenItem.style.transition = "opacity 0.3s ease, height 0.3s ease";
    
    // Update button state
    loadMoreText.textContent = isExpanded ? "Load more reasons" : "Show less";
    iconButton.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
    iconButton.style.transition = "transform 0.4s ease-in-out";

    // Maintain scroll position after collapse
    if (isExpanded) {
      setTimeout(() => {
        const btnPositionAfter = loadMoreBtn.getBoundingClientRect().top;
        window.scrollTo(0, scrollYBefore + (btnPositionAfter - btnPosition));
      }, 300); // Match transition duration
    }
  });
});
