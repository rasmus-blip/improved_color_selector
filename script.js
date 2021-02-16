"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector("input").addEventListener("input", delegator);
}

function delegator() {
  const input = document.querySelector("input");
  const hex = getInput(input.value);
  displayHex(hex);

  const rgb = hexToRGB(hex);
  displayRGB(rgb);

  const hsl = convertRGBToHSL(rgb);
  displayHSL(hsl);
}

function getInput() {
  const input = document.querySelector("input").value;
  return input;
}

function hexToRGB(hex) {
  let r = parseInt(hex.substring(1, 3), 16); // converts string to number and decides which index from hex to use
  let g = parseInt(hex.substring(3, 5), 16); // converts string to number and decides which index from hex to use
  let b = parseInt(hex.substring(5, 7), 16); // converts string to number and decides which index from hex to use

  console.log(r, g, b);
  return { r, g, b };
}

function convertRGBToHSL(rgb) {
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

  h = h.toFixed(0);
  s = s.toFixed(2);
  l = l.toFixed(2);

  // amount of decimal is getting shortened to 2 and output is inserset to html

  return { h, s, l };
}

function displayHex(hex) {
  document.querySelector("#hexcode").textContent = "Hexcode: " + hex;
  document.querySelector("#color").style.backgroundColor = `${hex}`;
}

function displayRGB(rgb) {
  document.querySelector(
    "#rgb"
  ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function displayHSL(hsl) {
  document.querySelector(
    "#hsl"
  ).textContent = `HSL: ${hsl.h}, ${hsl.s}%, ${hsl.s}%`;
}
