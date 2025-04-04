document.addEventListener("DOMContentLoaded", function () {
  // Handle custom video elements inside Webflow
  document.querySelectorAll("custom-element").forEach(el => {
    let videoId = el.getAttribute("data-video-id");
    let videoUrl = `https://drive.google.com/uc?export=download&id=${videoId}`;

    let video = document.createElement("video");
    video.setAttribute("controls", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.style.width = "100%";

    let source = document.createElement("source");
    source.setAttribute("src", videoUrl);
    source.setAttribute("type", "video/mp4");

    video.appendChild(source);
    el.appendChild(video);
  });

  const video = document.getElementById("autoplay-video");
  const thumbnail = document.getElementById("thumbnail");

  if (video && thumbnail) {
    // Add CSS transition
    thumbnail.style.transition = "opacity 0.4s ease";

    video.muted = true;

    function playVideoOnScroll(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
          // Fade out thumbnail
          thumbnail.style.opacity = "0";
          // Wait for opacity to transition, then hide
          setTimeout(() => {
            thumbnail.style.display = "none";
          }, 400); // Match the transition duration
        } else {
          video.pause();
          // Show and fade in thumbnail
          thumbnail.style.display = "block";
          requestAnimationFrame(() => {
            thumbnail.style.opacity = "1";
          });
        }
      });
    }

    const observer = new IntersectionObserver(playVideoOnScroll, { threshold: 0.5 });
    observer.observe(video);
  }
});
