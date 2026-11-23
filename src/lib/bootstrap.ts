import { THEME_KEY } from "./themeStore";

/**
 * Runs before first paint, inlined in the document head. Kept tiny and
 * self-contained — it cannot import anything at runtime.
 *
 * It applies the saved theme and preloads the hero scene for it, so the one
 * image that will actually be shown starts downloading before CSS is parsed,
 * and the other one never downloads at all.
 *
 * The language is not handled here: it lives in the URL, so the server already
 * rendered the right one.
 */
export const BOOTSTRAP = `(function(){try{var d=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)})==="day";if(d){document.documentElement.dataset.theme="day"}var l=document.createElement("link");l.rel="preload";l.as="image";l.href=d?"/assets/images/scene-day.webp":"/assets/images/scene-night.webp";document.head.appendChild(l)}catch(e){}})();`;
