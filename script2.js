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

  generateAna(hsl);
  generateMono(hsl);
  generateTri(hsl);
  generateCompl(hsl);
  generateCompo(hsl);
  generateShade(hsl);

  const arr = [];
  arr.push(anaObject, moObject, triObject, complObject, compoObject, shaObject);

  const anaObject = generateAna(hsl);
  const moObject = generateMono(hsl);
  const triObject = generateTri(hsl);
  const complObject = generateCompl(hsl);
  const compoObject = generateCompo(hsl);
  const shaObject = generateShade(hsl);

  listenForSchemeInput(
    anaObject,
    moObject,
    triObject,
    complObject,
    compoObject,
    shaObject
  );
}
function getInput() {
  const input = document.querySelector("input").value;
  return input;
}
function hexToRGB(hex) {
  let r = parseInt(hex.substring(1, 3), 16); // converts string to number and decides which index from hex to use
  let g = parseInt(hex.substring(3, 5), 16); // converts string to number and decides which index from hex to use
  let b = parseInt(hex.substring(5, 7), 16); // converts string to number and decides which index from hex to use
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

  h = parseFloat(h.toFixed(0));
  s = parseFloat(s.toFixed(2));
  l = parseFloat(l.toFixed(2));

  // amount of decimal is getting shortened to 2 and output is inserset to html

  return { h, s, l };
}
function generateAna(hsl) {
  //color 1
  let newH1 = hsl.h;
  let newS1 = hsl.s;
  let newL1 = hsl.l;
  //color 2
  let newH2 = newH1 + 10;
  let newS2 = hsl.s;
  let newL2 = hsl.l;
  //color 3
  let newH3 = newH2 + 10;
  let newS3 = hsl.s;
  let newL3 = hsl.l;
  //color 4
  let newH4 = newH3 + 10;
  let newS4 = hsl.s;
  let newL4 = hsl.l;
  //color 5
  let newH5 = newH4 + 10;
  let newS5 = hsl.s;
  let newL5 = hsl.l;
  return {
    newH1,
    newS1,
    newL1,
    newH2,
    newS2,
    newL2,
    newH3,
    newS3,
    newL3,
    newH4,
    newS4,
    newL4,
    newH5,
    newS5,
    newL5,
  };
}
function generateMono(hsl) {
  //color 1
  let newH1 = hsl.h;
  let newS1 = hsl.s + 10;
  let newL1 = hsl.l;
  //color 2
  let newH2 = newH1;
  let newS2 = newS1 + 10;
  let newL2 = newL1;
  //color 3
  let newH3 = newH2;
  let newS3 = newS2 + 10;
  let newL3 = newL2;
  //color 4
  let newH4 = newH3;
  let newS4 = newS3 + 10;
  let newL4 = newL3;
  //color 5
  let newH5 = newH4;
  let newS5 = newS4 + 10;
  let newL5 = newL4;
  return {
    newH1,
    newS1,
    newL1,
    newH2,
    newS2,
    newL2,
    newH3,
    newS3,
    newL3,
    newH4,
    newS4,
    newL4,
    newH5,
    newS5,
    newL5,
  };
}
function generateTri(hsl) {
  //color 1
  let newH1 = hsl.h;
  let newS1 = hsl.s + 10;
  let newL1 = hsl.l - 10;
  //color 2
  let newH2 = newH1;
  let newS2 = newS1 + 10;
  let newL2 = newL1 - 10;
  //color 3
  let newH3 = newH2;
  let newS3 = newS2 + 10;
  let newL3 = newL2 - 10;
  //color 4
  let newH4 = newH3;
  let newS4 = newS3 + 10;
  let newL4 = newL3 - 10;
  //color 5
  let newH5 = newH4;
  let newS5 = newS4 + 10;
  let newL5 = newL4 - 10;
  return {
    newH1,
    newS1,
    newL1,
    newH2,
    newS2,
    newL2,
    newH3,
    newS3,
    newL3,
    newH4,
    newS4,
    newL4,
    newH5,
    newS5,
    newL5,
  };
}
function generateCompl(hsl) {
  //color 1
  let newH1 = hsl.h;
  let newS1 = hsl.s;
  let newL1 = hsl.l;
  //color 2
  let newH2 = newH1 + 180;
  let newS2 = newS1;
  let newL2 = newL1;
  //color 3
  let newH3 = newH1 + 190;
  let newS3 = newS1;
  let newL3 = newL1;
  //color 4
  let newH4 = newH1 + 200;
  let newS4 = newS1;
  let newL4 = newL1;
  //color 5
  let newH5 = newH1 + 210;
  let newS5 = newS1;
  let newL5 = newL1;
  return {
    newH1,
    newS1,
    newL1,
    newH2,
    newS2,
    newL2,
    newH3,
    newS3,
    newL3,
    newH4,
    newS4,
    newL4,
    newH5,
    newS5,
    newL5,
  };
}
function generateCompo(hsl) {
  //color 1
  let newH1 = hsl.h;
  let newS1 = hsl.s;
  let newL1 = hsl.l;
  //color 2
  let newH2 = newH1 + 20;
  let newS2 = hsl.s;
  let newL2 = hsl.l;
  //color 3
  let newH3 = newH2 + 20;
  let newS3 = hsl.s;
  let newL3 = hsl.l;
  //color 4
  let newH4 = newH1 + 200;
  let newS4 = newS1;
  let newL4 = newL1;
  //color 5
  let newH5 = newH1 + 210;
  let newS5 = newS1;
  let newL5 = newL1;
  return {
    newH1,
    newS1,
    newL1,
    newH2,
    newS2,
    newL2,
    newH3,
    newS3,
    newL3,
    newH4,
    newS4,
    newL4,
    newH5,
    newS5,
    newL5,
  };
}
function generateShade(hsl) {
  //color 1
  let newH1 = hsl.h;
  let newS1 = hsl.s;
  let newL1 = hsl.l;
  //color 2
  let newH2 = newH1;
  let newS2 = hsl.s;
  let newL2 = newL1 - 5;
  //color 3
  let newH3 = hsl.h;
  let newS3 = hsl.s;
  let newL3 = newL1 - 10;
  //color 4
  let newH4 = hsl.h;
  let newS4 = hsl.s;
  let newL4 = newL1 - 15;
  //color 5
  let newH5 = hsl.h;
  let newS5 = hsl.s;
  let newL5 = newL1 - 20;
  return {
    newH1,
    newS1,
    newL1,
    newH2,
    newS2,
    newL2,
    newH3,
    newS3,
    newL3,
    newH4,
    newS4,
    newL4,
    newH5,
    newS5,
    newL5,
  };
}
function listenForSchemeInput(
  anaObject,
  moObject,
  triObject,
  complObject,
  compoObject,
  shaObject
) {
  const selector = document.querySelector("#selector");
  let theScheme;

  if (selector.value === "analogous") {
    theScheme = anaObject;
  } else if (selector.value === "monochromatic") {
    theScheme = moObject;
  } else if (selector.value === "triad") {
    theScheme = triObject;
  } else if (selector.value === "complementary") {
    theScheme = complObject;
  } else if (selector.value === "compound") {
    theScheme = compoObject;
  } else if (selector.value === "shades") {
    theScheme = shaObject;
  }
  displayScheme(theScheme);
}
function displayScheme(theScheme) {
  //color 1
  document.querySelector(
    "#color1"
  ).style.backgroundColor = `hsl(${theScheme.newH1}, ${theScheme.newL1}%, ${theScheme.newS1}%)`;

  const hsl1 = `hsl(${theScheme.newH1}, ${theScheme.newL1}%, ${theScheme.newS1}%)`;

  //color2
  document.querySelector(
    "#color2"
  ).style.backgroundColor = `hsl(${theScheme.newH2}, ${theScheme.newL2}%, ${theScheme.newS2}%)`;

  //color3
  document.querySelector(
    "#color3"
  ).style.backgroundColor = `hsl(${theScheme.newH3}, ${theScheme.newL3}%, ${theScheme.newS3}%)`;

  //color 4
  document.querySelector(
    "#color4"
  ).style.backgroundColor = `hsl(${theScheme.newH4}, ${theScheme.newL4}%, ${theScheme.newS4}%)`;

  //color 5
  document.querySelector(
    "#color5"
  ).style.backgroundColor = `hsl(${theScheme.newH5}, ${theScheme.newL5}%, ${theScheme.newS5}%)`;

  displayHSL(theScheme);
}

function displayHex(hex) {
  // document.querySelector("#hexcode1").textContent = "Hexcode: " + hex;
  // document.querySelector("#color").style.backgroundColor = `${hex}`;
}

function displayRGB(rgb) {
  // document.querySelector(
  //   "#rgb"
  // ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function displayHSL(theScheme) {
  document.querySelector(
    "#hsl1"
  ).textContent = `hsl(${theScheme.newH1}, ${theScheme.newL1}%, ${theScheme.newS1}%)`;

  document.querySelector(
    "#hsl2"
  ).textContent = `hsl(${theScheme.newH2}, ${theScheme.newL2}%, ${theScheme.newS2}%)`;
  document.querySelector(
    "#hsl3"
  ).textContent = `hsl(${theScheme.newH3}, ${theScheme.newL3}%, ${theScheme.newS3}%)`;
  document.querySelector(
    "#hsl4"
  ).textContent = `hsl(${theScheme.newH4}, ${theScheme.newL4}%, ${theScheme.newS4}%)`;
  document.querySelector(
    "#hsl5"
  ).textContent = `hsl(${theScheme.newH5}, ${theScheme.newL5}%, ${theScheme.newS5}%)`;
}
