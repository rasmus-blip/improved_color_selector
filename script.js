"use strict";

"use strict";

window.addEventListener("DOMContentLoaded", init);

const HTML = [];

function init() {
  collectInputs();

  document.querySelector("#input").addEventListener("change", collectInputs);
  document
    .querySelector("#colorselect")
    .addEventListener("input", collectInputs);
}

function collectInputs() {
  declareHarmonyInput();
  const hex = getHexInput();
  convertValueToHSL(hex);
}

function getHexInput() {
  const hex = document.querySelector("#colorselect").value;

  return hex;
}

function declareHarmonyInput() {
  HTML.selectedHarmony = document.querySelector("select").value;
}

function collectInputs() {
  declareHarmonyInput();
  const hex = getHexInput();
  convertValueToHSL(hex);
}

function convertValueToHSL(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);

  generateHarmony(hsl);
}

function displayHex(hex) {
  document.querySelector("#hex").textContent = `HEX: ${hex}`;
}

function hexToRgb(hex) {
  const hexR = hex.substring(1, 3);
  const hexG = hex.substring(3, 5);
  const hexB = hex.substring(5, 7);

  const r = parseInt(hexR, 16);
  const g = parseInt(hexG, 16);
  const b = parseInt(hexB, 16);

  return { r, g, b };
}

function generateHarmony(hsl) {
  let hslHarmony = null;
  console.log(hsl);
  if (HTML.selectedHarmony === "analogous") {
    hslHarmony = calcAnalogous(hsl);
  } else if (HTML.selectedHarmony === "monochromatic")
    hslHarmony = calcMonochromatic(hsl);
  else if (HTML.selectedHarmony === "triad") {
    hslHarmony = calcTriad(hsl);
  } else if (HTML.selectedHarmony === "complementary") {
    hslHarmony = calcComplementary(hsl);
  } else if (HTML.selectedHarmony === "compound") {
    hslHarmony = calcCompound(hsl);
  } else if (HTML.selectedHarmony === "shades") {
    hslHarmony = calcShades(hsl);
  }
  console.log(hslHarmony);
  reconvertValue(hslHarmony);
}

function calcAnalogous(hsl) {
  let hslArray = new Array(5);
  let hValue = -40;
  for (let i = 0; i < 5; i++) {
    hslArray[i] = { h: hsl.h + hValue, s: hsl.s, l: hsl.l };
    hValue += 20;
  }
  return hslArray;
}

function calcMonochromatic(hsl) {
  let hslArray = new Array(5);

  hslArray[0] = { h: hsl.h, s: hsl.s, l: hsl.l + 10 };
  hslArray[1] = { h: hsl.h, s: hsl.s, l: hsl.l + 20 };
  hslArray[2] = { h: hsl.h, s: hsl.s, l: hsl.l + 30 };
  hslArray[3] = { h: hsl.h, s: hsl.s, l: hsl.l + 40 };
  hslArray[4] = { h: hsl.h, s: hsl.s, l: hsl.l + 50 };

  return hslArray;
}

function calcTriad(hsl) {
  let hslArray = new Array(5);

  hslArray[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArray[1] = { h: hsl.h + 60, s: hsl.s, l: hsl.l + 10 };
  hslArray[2] = { h: hsl.h + 120, s: hsl.s, l: hsl.l + 20 };
  hslArray[3] = { h: hsl.h + 40, s: hsl.s, l: hsl.l };
  hslArray[4] = { h: hsl.h + 140, s: hsl.s, l: hsl.l + 20 };

  return hslArray;
}

function calcComplementary(hsl) {
  let hslArray = new Array(5);

  hslArray[0] = { h: hsl.h + 270, s: hsl.s, l: hsl.l };
  hslArray[1] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
  hslArray[2] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArray[3] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
  hslArray[4] = { h: hsl.h + 270, s: hsl.s, l: hsl.l };

  return hslArray;
}

function calcCompound(hsl) {
  let hslArray = new Array(5);

  hslArray[0] = { h: hsl.h, s: hsl.s, l: hsl.l };
  hslArray[1] = { h: hsl.h + 180, s: hsl.s, l: hsl.l };
  hslArray[2] = { h: hsl.h - 20, s: hsl.s, l: hsl.l };
  hslArray[3] = { h: hsl.h + 20, s: hsl.s, l: hsl.l };
  hslArray[4] = { h: hsl.h + 40, s: hsl.s, l: hsl.l };

  return hslArray;
}

function calcShades(hsl) {
  let hslArray = new Array(5);

  hslArray[0] = { h: hsl.h, s: hsl.s, l: hsl.l - 10 };
  hslArray[1] = { h: hsl.h, s: hsl.s, l: hsl.l - 20 };
  hslArray[2] = { h: hsl.h, s: hsl.s, l: hsl.l - 30 };
  hslArray[3] = { h: hsl.h, s: hsl.s, l: hsl.l - 40 };
  hslArray[4] = { h: hsl.h, s: hsl.s, l: hsl.l - 50 };

  return hslArray;
}

function reconvertValue(hslHarmony) {
  console.log(hslHarmony);
  for (let i = 0; i < 5; i++) {
    const hsl = hslHarmony[i];
    const rgb = hslToRGB(hsl);
    const hex = rgbToHex(rgb);
    displayText(hsl, rgb, hex, i);
  }
}

function displayText(hsl, rgb, hex, i) {
  displayColor(hex, i);
  displayHex(hex, i);
  displayHsl(hsl, i);
  displayRgb(rgb, i);
}

function rgbToHsl(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  //Afrundet til 2 decimaler
  h = Number(h.toFixed(0));
  s = Number(s.toFixed(0));
  l = Number(l.toFixed(0));

  return { h, s, l };
}

function hslToRGB(hsl) {
  let h = hsl.h;
  let s = hsl.s / 100;
  let l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

function rgbToHex(rgb) {
  const hexR = rgb.r.toString(16).padStart(2, "0");
  const hexG = rgb.g.toString(16).padStart(2, "0");
  const hexB = rgb.b.toString(16).padStart(2, "0");

  const hex = "#" + hexR + hexG + hexB;

  return hex;
}

function displayHex(hex, i) {
  document.querySelector(`#colorbox${i} .hex`).textContent = hex;
  console.log("hey");
  console.log(i);
  console.log(hex);
}

function displayHsl(hsl, i) {
  document.querySelector(
    `#colorbox${i} #hsl`
  ).textContent = `HSL: ${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

function displayRgb(rgb, i) {
  document.querySelector(
    `#colorbox${i}  #rgb`
  ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function displayColor(hex, i) {
  document.querySelector(`#colorbox${i} .color`).style.backgroundColor = hex;
}
