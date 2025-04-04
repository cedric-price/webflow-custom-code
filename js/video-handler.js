document.addEventListener("DOMContentLoaded", function () {
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
    // Set default style
    thumbnail.style.opacity = "1";
    thumbnail.style.transition = "opacity 0.4s ease";

    video.muted = true;

    function playVideoOnScroll(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();

          // Step 1: Fade out with opacity
          thumbnail.style.opacity = "0";

          // Step 2: After opacity transition ends, hide it
          thumbnail.addEventListener("transitionend", handleFadeOut, { once: true });

          function handleFadeOut() {
            thumbnail.style.display = "none";
          }
        } else {
          video.pause();

          // Step 1: Show thumbnail immediately
          thumbnail.style.display = "block";

          // Step 2: Wait for it to be shown, then fade in
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
