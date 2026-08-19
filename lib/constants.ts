// Needs to be updated with the real links after we have a real release.
export const GITHUB_URL = "https://github.com/org/keypr";
export const EXTENSION_URL = "https://chrome.google.com/webstore/...";

// Examples, need to be replaced with real links after we have a real release.
export const DOWNLOAD_LINKS = {
  windows: `${GITHUB_URL}/releases/latest/download/Keypr-Setup.exe`,
  macos: `${GITHUB_URL}/releases/latest/download/Keypr.dmg`,
  linux: `${GITHUB_URL}/releases/latest/download/Keypr.AppImage`,
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Download", href: "#download" },
] as const;
