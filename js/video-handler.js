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
    video.muted = true;

    // Ensure the thumbnail is styled for fading
    thumbnail.style.transition = "opacity 0.4s ease";
    thumbnail.style.opacity = "1";

    function playVideoOnScroll(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
          thumbnail.style.opacity = "0";
          thumbnail.style.pointerEvents = "none";
        } else {
          video.pause();
          thumbnail.style.opacity = "1";
          thumbnail.style.pointerEvents = "auto";
        }
      });
    }

    const observer = new IntersectionObserver(playVideoOnScroll, { threshold: 0.5 });
    observer.observe(video);
  }
});
