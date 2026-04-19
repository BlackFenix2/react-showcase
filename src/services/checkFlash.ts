export default function checkFlash(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  const hasFlash = navigator.mimeTypes?.namedItem("application/x-shockwave-flash") !== null;
  return hasFlash;
}
