import Swup from 'swup';
import SwupPreloadPlugin from '@swup/preload-plugin';

const swup = new Swup({
  plugins: [
    new SwupPreloadPlugin({
      preloadHoveredLinks: true, // Links beim Hover vorladen
      preloadVisibleLinks: {
        threshold: 0.2, // 20% des Links müssen sichtbar sein
        delay: 500, // Wartezeit von 500ms
        containers: ['body'], // Container, in denen Links gesucht werden
      }
    })
  ]
});

// Daten nach Swup-Neuladen erneut laden
document.addEventListener("swup:contentReplaced", () => {
    console.log("Swup-Inhalt ersetzt.");
    const controllerLoaded = typeof initVideoController === "function";
    console.log("VideoController geladen:", controllerLoaded);
    if (controllerLoaded) {
      initVideoController();
    } else {
      console.error("initVideoController nicht gefunden!");
    }
  });
  
// Beispiel für ein individuelles Skript
function initCustomScripts() {
  console.log("Custom Scripts werden neu initialisiert...");
  // Initialisiere hier z.B. deinen VideoController oder andere Funktionen
}
