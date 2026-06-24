/** UiTM official brand colours (from corporate identity guide) */
export const brand = {
  /** C100 M80 Y0 K40 */
  navy: "#001E99",
  /** C50 M100 Y0 K0 — adjusted for readable UI contrast */
  magenta: "#A50064",
  /** C0 M30 Y100 K0 */
  gold: "#FFB300",
  /** C0 M0 Y0 K70 */
  grey: "#4D4D4D",
  white: "#FFFFFF",
  navyTint: "#E8EDF8",
  magentaTint: "#FAE8F2",
  goldTint: "#FFF8E6",
} as const;

export const brandAssets = {
  appLogo: "/brand/app-logo.png",
  /** @deprecated use appLogo */
  uitmLogo: "/brand/app-logo.png",
} as const;
