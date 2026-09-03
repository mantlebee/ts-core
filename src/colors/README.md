# `colors`

A **color value type** and the conversions around it. `Color` (implementing
`IColor`) holds an RGBA value and can be read back in any common format; it
manages the alpha channel and can pick a readable contrast color.

## What's in here

- **`interfaces.ts`** — `IColor`: the channel getters (`red`/`green`/`blue`
  0–255, `alpha` 0–1), the `hex()` / `hsl()` / `hsla()` / `rgb()` / `rgba()`
  string formatters, and `contrast()`.
- **`models.ts`** — `Color`, plus static constructors: `fromHex`, `fromHsl`,
  `fromRgb`, `fromText` (deterministic color from a string), `fromWebColorName`.
- **`utils.ts`** — the standalone conversion functions the model builds on
  (`hexToRgba`, `rgbaToHex`, `rgbaToHsla`, `hslStringToRgba`, `rgbStringToRgb`,
  `shortHexToFullHex`, `textToHsl`, `webColorNameToHex`) and `getColor()`, which
  parses any accepted string form.
- **`constants.ts`** — `WebColorNamesHexMap`, every CSS color name → HEX.
- **`types.ts`** — `RgbColor` / `RgbaColor` / `HslColor` / `HslaColor` shapes and
  the `WebColorName` union.
