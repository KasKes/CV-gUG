// /src/scripts/VideoController.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("VideoController initialisiert bei DOMContentLoaded.");
  initVideoController();
});

document.addEventListener("swup:contentReplaced", () => {
  console.log("VideoController initialisiert bei swup:contentReplaced.");
  setTimeout(() => {
    initVideoController(); // Warten, bis Swup den DOM vollständig ersetzt hat
  }, 100);
});

function initVideoController() {
  console.log("Init VideoController gestartet.");

  // DOM-Elemente abrufen
  const activeCover = document.getElementById("main-dvd-cover");
  const activeTitle = document.getElementById("main-video-title");
  const activeDescription = document.getElementById("main-video-description");
  const activeBody = document.querySelector(".text-video-body");
  const activeDetails = document.querySelectorAll(".video-details span");
  const activeBanderole = document.getElementById("main-banderole");

  const trailerButton = document.getElementById("trailer-button");
  const filmButton = document.getElementById("film-button");
  const blogButton = document.getElementById("blog-button");

  const thumbnails = document.querySelectorAll(".carousel-thumbnail");
  const videoItems = document.querySelectorAll(".carousel-item");

  const popup = document.getElementById("popup");
  const popupVideoPlayer = document.getElementById("popup-video-player");

  let currentIndex = 0;

  // Überprüfen, ob alle wichtigen Elemente vorhanden sind
  if (!activeCover || thumbnails.length === 0 || videoItems.length === 0) {
    console.warn("Wichtige DOM-Elemente fehlen! VideoController nicht vollständig initialisiert.");
    return;
  }

  console.log("Alle DOM-Elemente erfolgreich gefunden und vorbereitet.");

  // Hauptfunktion: Zeigt ein bestimmtes Video an
  const showSlide = (index) => {
    if (!thumbnails[index]) {
      console.error(`Thumbnail für Index ${index} nicht gefunden.`);
      return;
    }

    // Lese Daten aus den data-Attributen des angeklickten Thumbnails
    const {
      cover = "",
      title = "Unbekannt",
      description = "Keine Beschreibung",
      body = "<p>Keine zusätzliche Beschreibung vorhanden.</p>",
      datum = "Unbekannt",
      duration = "Unbekannt",
      videoquality: videoQuality = "Unbekannt",
      resolutiontier: resolution = "Unbekannt",
      maxframerate: frameRate = "Unbekannt",
      aspectratio: aspectRatio = "Unbekannt",
      blog: blogLink,
      playbackid: playbackId,
      playvollid: playvollId,
      banderole,
    } = thumbnails[index].dataset;

    // Inhalte aktualisieren
    activeCover.src = cover;
    activeTitle.textContent = title;
    activeDescription.textContent = description;
    if (activeBody) {
      activeBody.innerHTML = body;
    }

    // Banderole aktualisieren
    if (activeBanderole) {
      if (banderole) {
        activeBanderole.textContent = banderole;
        activeBanderole.style.display = "block";
      } else {
        activeBanderole.style.display = "none";
      }
    }

    // Video-Details aktualisieren (es werden sechs Werte erwartet)
    if (activeDetails.length >= 6) {
      activeDetails[0].textContent = datum;
      activeDetails[1].textContent = duration;
      activeDetails[2].textContent = videoQuality;
      activeDetails[3].textContent = resolution;
      activeDetails[4].textContent = frameRate;
      activeDetails[5].textContent = aspectRatio;
    }

    // Videos aktualisieren: Nur das Video an der Position index sichtbar machen und abspielen
    videoItems.forEach((video, i) => {
      const videoPlayer = video.querySelector("mux-player");
      if (i === index) {
        video.classList.remove("hidden");
        video.style.opacity = 1;
        if (videoPlayer) videoPlayer.play();
      } else {
        video.classList.add("hidden");
        video.style.opacity = 0;
        if (videoPlayer) {
          videoPlayer.pause();
          videoPlayer.currentTime = 0;
        }
      }
    });

    // Buttons aktualisieren
    updateButton(trailerButton, playbackId, () => openPopup("trailer", playbackId));
    updateButton(filmButton, playvollId, () => openPopup("film", playvollId));
    updateButton(blogButton, blogLink, null, blogLink);

    // Thumbnails aktualisieren: Entferne das "active" Styling von allen und verstecke das aktuell gewählte Thumbnail
    thumbnails.forEach((thumb, i) => {
      thumb.classList.remove("active");
      thumb.classList.remove("hidden");
      if (i === index) {
        thumb.classList.add("hidden");
      }
    });

    currentIndex = index;
  };

  // Funktion zur Button-Aktualisierung
  const updateButton = (button, value, onClick, href = null) => {
    if (button) {
      if (value) {
        button.style.display = "inline-block";
        if (onClick) button.onclick = onClick;
        if (href) button.href = href;
      } else {
        button.style.display = "none";
      }
    }
  };

  // Popup öffnen
  window.openPopup = (type, playbackId) => {
    if (!playbackId) return;
    popup.classList.remove("hidden");
    popupVideoPlayer.setAttribute("playback-id", playbackId);
    popupVideoPlayer.play();
  };

  // Popup schließen
  window.closePopup = () => {
    popup.classList.add("hidden");
    popupVideoPlayer.pause();
    popupVideoPlayer.removeAttribute("playback-id");
  };

  // Event-Listener für alle Thumbnails: Beim Klick wird showSlide(index) aufgerufen
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      showSlide(index);
    });
  });

  // Zeige das erste Video (Startzustand)
  showSlide(currentIndex);
}
