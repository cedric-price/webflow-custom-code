document.addEventListener("DOMContentLoaded", function () {
  const loadMoreBtn = document.getElementById("load-more");
  const loadMoreText = document.getElementById("load-more-text");
  const iconButton = document.getElementById("icon-button");
  const hiddenItems = document.querySelectorAll(".list-hide");

  loadMoreBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default button behavior

    let isExpanded = hiddenItems[0].style.display === "block"; // Check if content is expanded

    hiddenItems.forEach(item => {
      if (isExpanded) {
        item.style.opacity = "0";
        setTimeout(() => (item.style.display = "none"), 300); // Hide after fade-out
      } else {
        item.style.display = "block";
        setTimeout(() => (item.style.opacity = "1"), 10); // Show with fade-in
      }
      item.style.transition = "opacity 0.3s ease-in-out";
    });

    // Change button text and rotate icon accordingly
    loadMoreText.textContent = isExpanded ? "Load more reasons" : "Show less";
    iconButton.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
    iconButton.style.transition = "transform 0.4s ease-in-out";
  });
});
