function isTabletSize() {
  return window.matchMedia("(min-width: 768px) and (max-width: 1024px)")
    .matches;
}

function isMobileSize() {
  return window.matchMedia("(max-width: 767px)").matches;
}

const maxMobileWidth = "767px";
const maxTabletWidth = "1024px";

export { isTabletSize, isMobileSize, maxMobileWidth, maxTabletWidth };
