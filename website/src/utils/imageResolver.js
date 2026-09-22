import hero from "../assets/hero.png";
import soboLogo from "../assets/sobo_logo.webp";
import soboWhite from "../assets/sobo_white.png";

const assetMap = {
  "/src/assets/hero.png": hero,
  "/src/assets/sobo_logo.webp": soboLogo,
  "/src/assets/sobo_white.png": soboWhite,
  "/sobo_logo.webp": soboLogo,
  "/sobo_white.png": soboWhite,
  "/sobos.png": soboWhite,
  "sobo_logo.webp": soboLogo,
  "sobo_white.png": soboWhite,
};

export const resolveImagePath = (path) => {
  if (!path) return "";
  if (typeof path === "string") {
    return assetMap[path] || assetMap[path.trim()] || path;
  }
  return path;
};

export { hero, soboLogo, soboWhite };
