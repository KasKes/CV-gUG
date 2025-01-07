// 🎬 VideoController.js

function initializeVideoController() {
  const activeCover = document.getElementById("main-dvd-cover");
  const activeTitle = document.getElementById("main-video-title");
  const activeDescription = document.getElementById("main-video-description");
  const activeBody = document.querySelector(".text-video-body");
  const activeDetails = document.querySelectorAll(".video-details span");

  const trailerButton = document.getElementById("trailer-button");
  const filmButton = document.getElementById("film-button");
  const blogButton = document.getElementById("blog-button");

  const thumbnails = document.querySelectorAll(".carousel-thumbnail");
  const videoItems = document.querySelectorAll(".carousel-item");

  const popup = document.getElementById("popup");
  const popupVideoPlayer = document.getElementById("popup-video-player");

  let currentIndex = 0;

  const showSlide = (index) => {
    const selectedThumbnail = thumbnails[index];
    const cover = selectedThumbnail.dataset.cover;
    const title = selectedThumbnail.dataset.title;
    const description = selectedThumbnail.dataset.description;
    const body = selectedThumbnail.dataset.body || "<p>Keine zusätzliche Beschreibung vorhanden.</p>";
    const datum = selectedThumbnail.dataset.datum;
    const duration = selectedThumbnail.dataset.duration;
    const videoQuality = selectedThumbnail.dataset.videoquality;
    const resolution = selectedThumbnail.dataset.resolutiontier;
    const frameRate = selectedThumbnail.dataset.maxframerate;
    const aspectRatio = selectedThumbnail.dataset.aspectratio;
    const blogLink = selectedThumbnail.dataset.blog;
    const playbackId = selectedThumbnail.dataset.playbackid;
    const playvollId = selectedThumbnail.dataset.playvollid;

    // 🖼️ Cover, Titel, Beschreibung aktualisieren
    activeCover.src = cover;
    activeTitle.textContent = title;
    activeDescription.textContent = description;
    activeBody.innerHTML = body;

    // 📝 Details aktualisieren
    activeDetails[0].textContent = datum || "Unbekannt";
    activeDetails[1].textContent = duration || "Unbekannt";
    activeDetails[2].textContent = videoQuality || "Unbekannt";
    activeDetails[3].textContent = resolution || "Unbekannt";
    activeDetails[4].textContent = frameRate || "Unbekannt";
    activeDetails[5].textContent = aspectRatio || "Unbekannt";

    // 🎥 Video aktualisieren
    videoItems.forEach((video, i) => {
      const videoPlayer = video.querySelector("mux-player");
      if (i === index) {
        video.classList.remove("hidden");
        video.style.opacity = 1;
        if (videoPlayer && videoPlayer.paused) {
          videoPlayer.play();
        }
      } else {
        video.classList.add("hidden");
        video.style.opacity = 0;
        if (videoPlayer && !videoPlayer.paused) {
          videoPlayer.pause();
          videoPlayer.currentTime = 0;
        }
      }
    });

    // 🔗 Buttons aktualisieren
    trailerButton.style.display = playbackId ? "inline-block" : "none";
    trailerButton.onclick = () => openPopup('trailer', playbackId);

    filmButton.style.display = playvollId ? "inline-block" : "none";
    filmButton.onclick = () => openPopup('film', playvollId);

    blogButton.style.display = blogLink ? "inline-block" : "none";
    blogButton.href = blogLink || "#";

    // 🎯 Aktive/Passive Thumbnails
    thumbnails.forEach((thumb, i) => {
      thumb.classList.remove("hidden");
      thumb.classList.toggle("active", i === index);
    });
    selectedThumbnail.classList.add("hidden");

    currentIndex = index;
  };

  // 🎬 Popup öffnen
  window.openPopup = (type, playbackId) => {
    if (!playbackId) return;
    popup.classList.remove("hidden");
    popupVideoPlayer.setAttribute("playback-id", playbackId);
    popupVideoPlayer.play();
  };

  // ❌ Popup schließen
  window.closePopup = () => {
    popup.classList.add("hidden");
    popupVideoPlayer.pause();
    popupVideoPlayer.removeAttribute("playback-id");
  };

  // 🎯 Thumbnail-Events
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      showSlide(index);
    });
  });

  showSlide(currentIndex);
}


// 🟢 Initialer Aufruf beim Seitenladen
document.addEventListener("DOMContentLoaded", initializeVideoController);

// 🔄 Swup-Seitenwechsel behandeln
document.addEventListener("swup:contentReplaced", () => {
  console.log("🔄 Seiteninhalt ersetzt. VideoController wird neu initialisiert!");
  initializeVideoController();
});

// 🔄 Swup-Preload behandeln
document.addEventListener("swup:pageView", () => {
  console.log("📥 Swup preloaded die Seite. VideoController wird neu geladen!");
  initializeVideoController();
});