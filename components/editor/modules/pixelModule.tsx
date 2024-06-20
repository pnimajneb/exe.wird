"use client";

import React, { useEffect } from "react";
import { fabric } from "fabric";
import { init } from "next/dist/compiled/webpack/webpack";

interface PixelModuleProps {
  sendPicture: (img: string) => void;
  bgColor: string;
}

//params for generator
const isOneOne = true;
const is7And8Zero = false;
const useComplexRules = true;
const numberOfRules = 69;

const scale = 8;

const WIDTH = 65; //ungerade!
const HEIGHT = 65;
//canvas resolution
const rectSize = 30;
const eCanvasWidth = WIDTH * rectSize;
const eCanvasHeight = HEIGHT * rectSize;

const offsetX = (eCanvasWidth - WIDTH * rectSize) / 2;
const offsetY = (eCanvasHeight - HEIGHT * rectSize) / 2;

export const PixelModuleComponent: React.FC<PixelModuleProps> = (
  props: PixelModuleProps
) => {
  const { sendPicture, bgColor } = props;
  const eCanvas = React.useRef<HTMLCanvasElement>(null);

  const [seed, setSeed] = React.useState<number>(12389);
  const [index, setIndex] = React.useState<number>(1);
  const [overlayOpacity, setOverlayOpacity] = React.useState<number>(0);

  // const [rules, setRules] = React.useState<number[]>([]);
  // const [rulesC, setRulesC] = React.useState<number[]>([]);
  // const [colors, setColors] = React.useState<string[]>([]);
  // const [data, setData] = React.useState<number[][]>([]);

  let data: number[][] = new Array(WIDTH)
    .fill(0)
    .map(() => new Array(HEIGHT).fill(0));
  let rules: number[] = [];
  let rulesC: number[] = [];
  let colors: string[] = [];
  let initialized = false;
  // if (!eCanvas.current) {
  //   console.warn("Canvas not initialized");
  //   return null;
  // }

  useEffect(() => {
    if (initialized) {
      return;
    }
    initialized = true;
    // Define your 2D array with values
    if (!eCanvas.current) {
      console.warn("useeffect: Canvas not initialized");
      return;
    }
    console.log("useEffect");

    const initData: number[][] = new Array(WIDTH)
      .fill(0)
      .map(() => new Array(HEIGHT).fill(0));
    data = initData;
    // setData(initData);
    setStartValues(initData);

    //const ctx = eCanvas.current.getContext("2d");
    // eCanvas.current.width = eCanvasWidth;
    // eCanvas.current.height = eCanvasHeight;
    // eCanvas.current.style.width = (eCanvasWidth * 1) / scale + "px";
    // eCanvas.current.style.height = (eCanvasHeight * 1) / scale + "px";
    // eCanvas.style.width = eCanvasWidth * 1/scale + 'px';
    // eCanvas.style.height = eCanvasHeight * 1/scale + 'px';

    var ruleSeed = newSeed();
    setRuleSymmetric(ruleSeed);
    setRandomColor();
    // ctx.clearRect(0, 0, eCanvas.width, eCanvas.height);
    render();
    // console.log("useEffect end");
    // console.log(data);
    randomSteps();
  }, [eCanvas.current]);
  //--------------------------------------------------------------------------------

  function newSeed() {
    const seed = Math.floor(Math.random() * 16777216);
    setSeed(seed);
    return seed;
  }

  function changeSeedAndReset() {
    setRuleSymmetric(seed);
    setRandomColor();
    initiate();
    render();
    setIndex(index);
  }

  function changeSeed() {
    setRuleSymmetric(seed);
    setRandomColor();
  }

  function startWithNewRules() {
    setRuleSymmetric(newSeed());

    setRandomColor();
    initiate();
    render();

    randomSteps();
    setIndex(index);
  }

  function randomSteps() {
    const minSteps = 2;
    const maxSteps = 10;
    const numberOfSteps =
      Math.floor(Math.random() * (maxSteps - minSteps + 1)) + minSteps;

    for (let i = 0; i < numberOfSteps; i++) {
      doStep(); // Call the step() function here for each step
    }
  }

  function initiate() {
    const initData: number[][] = new Array(WIDTH)
      .fill(0)
      .map(() => new Array(HEIGHT).fill(0));
    data = initData;
    // setData(initData);
    setStartValues(initData);
    //setRuleSymmetric(ruleSeed);
    //setRandomColor();
    if (!eCanvas.current) {
      console.warn("1 Canvas not initialized");
      return;
    }
    eCanvas.current
      .getContext("2d")
      ?.clearRect(0, 0, eCanvas.current.width, eCanvas.current.height);
    render();
    setIndex(0);
  }

  function setStartValues(data: number[][]) {
    const x = Math.round(WIDTH / 2 - 0.5);
    const y = Math.round(HEIGHT / 2 - 0.5);

    //set state date at x,y to 1
    data[x][y] = 1;
    // setData((prevData) => {
    //   const newData = [...prevData];
    //   newData[x][y] = 1;
    //   return newData;
    // });
  }

  function back() {
    var indexTemp = index;
    initiate();
    for (var i = 0; i < indexTemp - 1; i++) {
      doStep();
    }
    setIndex(index);
  }

  function doStep() {
    if (!eCanvas.current) {
      console.warn("step: Canvas not initialized");
      return;
    }
    console.log("doStep " + index);
    console.log(data[30][30]);
    console.log(data);
    nextStep(data);
    eCanvas.current
      .getContext("2d")
      ?.clearRect(0, 0, eCanvas.current.width, eCanvas.current.height);
    render();
    setIndex(index + 1);
  }

  function randomColorAndRender() {
    if (!eCanvas.current) {
      console.warn("randomColorAndRender: Canvas not initialized");
      return;
    }
    setRandomColor();
    eCanvas.current
      .getContext("2d")
      ?.clearRect(0, 0, eCanvas.current.width, eCanvas.current.height);
    render();
  }

  function setRuleSymmetric(seed: number) {
    const r = rules;
    for (var i = 0; i < r.length; i++) {
      r[i] = 0;
    }
    switch (seed % 3) {
      case 0:
        r[0] = isOneOne ? 1 : 0;
        r[1] = 1;
        break;
      case 1:
        r[0] = 1;
        r[1] = isOneOne ? 1 : 0;
        break;
      case 2:
        r[0] = 1;
        r[1] = 1;
        break;
    }

    var bin = (seed >>> 0).toString(2);
    for (var i = 2; i < bin.length && i < rules.length - 1; i += 2) {
      r[i] = Number(bin.charAt(i));
      r[i + 1] = Number(bin.charAt(i));
    }
    r[6] = is7And8Zero ? 0 : 1;
    r[7] = is7And8Zero ? 0 : 1;
    rules = r;
    // setRules(r);
    // document.getElementById("rules").innerHTML = rules.toString();
    // document.getElementById("rulesC").innerHTML = rulesC.toString();
  }

  //symmetric
  function setRandomColor() {
    const c = colors;
    const rC = rulesC;
    for (var i = 0; i < c.length; i++) {
      c[i] = decimalToHex(Math.floor(Math.random() * 16777216));
    }
    //colors[0] = '#000000';
    for (var i = 2; i < rC.length; i += 2) {
      rC[i] = rules[i] * (i + 1);
      rC[i + 1] = rC[i];
    }
    rC[0] = rules[0];
    rC[1] = rules[0];
    colors = c;
    rulesC = rC;
    // setColors(c);
    // setRulesC(rC);
  }

  function decimalToHex(decimal: number) {
    const hex = decimal.toString(16).toUpperCase(); // Convert to hexadecimal and make it uppercase
    const paddedHex = hex.padStart(6, "0"); // Pad with zeros to ensure it's 6 characters long
    return "#" + paddedHex;
  }

  function nextStep(cells: number[][]) {
    var around = new Array(8);
    var cellsUpdate = new Array(WIDTH);
    for (var i = 0; i < WIDTH; i++) {
      cellsUpdate[i] = new Array(HEIGHT);
    }
    for (var x = 1; x < WIDTH - 1; x++) {
      for (var y = 1; y < HEIGHT - 1; y++) {
        around[0] = cells[x - 1][y - 1];
        around[1] = cells[x][y - 1];
        around[2] = cells[x + 1][y - 1];
        around[3] = cells[x + 1][y];
        around[4] = cells[x + 1][y + 1];
        around[5] = cells[x][y + 1];
        around[6] = cells[x - 1][y + 1];
        around[7] = cells[x - 1][y];
        for (var i = 0; i < 8; i++) {
          if (around[i] != 0) {
            around[i] = 1;
          }
        }
        if (useComplexRules) {
          cellsUpdate[x][y] = rule2(around);
        } else {
          cellsUpdate[x][y] = rule(around);
        }
      }
    }
    // setData(cellsUpdate);

    for (var x = 1; x < WIDTH - 1; x++) {
      for (var y = 1; y < HEIGHT - 1; y++) {
        cells[x][y] = cellsUpdate[x][y];
        if (cells[x][y] != 0) {
          //console.log(x+ " " + y + " - " + cellsUpdate[x][y]);
        }
      }
    }
  }

  function check(a: number[], b: number[]) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }

  function check4(a: number[], b: number[]) {
    const mb = b.map(
      (element, index, array) => array[array.length - 1 - index]
    );
    return checkCircle(a, b) || checkCircle(a, mb);
  }

  function checkCircle(a: number[], b: number[]) {
    return (
      check(a, [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]]) ||
      check(a, [b[2], b[3], b[4], b[5], b[6], b[7], b[0], b[1]]) ||
      check(a, [b[4], b[5], b[6], b[7], b[0], b[1], b[2], b[3]]) ||
      check(a, [b[6], b[7], b[0], b[1], b[2], b[3], b[4], b[5]])
    );
  }

  function rule(a: number[]) {
    var sum = a[0] + a[1] + a[2] + a[3] + a[4] + a[5] + a[6] + a[7];
    if (sum == 0) return 0;
    if (sum == 1) return rulesC[0];
    if (sum == 2) return rulesC[1];
    if (sum == 3) return rulesC[2];
    if (sum == 4) return rulesC[3];
    if (sum == 5) return rulesC[4];
    if (sum == 6) return rulesC[5];
    if (sum == 7) return rulesC[6];
    return rulesC[7];
  }

  //Sum
  function rule2(a: number[]) {
    var sum = a[0] + a[1] + a[2] + a[3] + a[4] + a[5] + a[6] + a[7];
    //NULL
    if (check(a, [0, 0, 0, 0, 0, 0, 0, 0])) return 0; //MUST

    //EINS
    if (check4(a, [1, 0, 0, 0, 0, 0, 0, 0])) return rulesC[0]; //MUST oder
    if (check4(a, [0, 1, 0, 0, 0, 0, 0, 0])) return rulesC[1]; //MUST

    //ZWEI
    if (check4(a, [1, 1, 0, 0, 0, 0, 0, 0])) return rulesC[2];
    if (check4(a, [0, 1, 1, 0, 0, 0, 0, 0])) return rulesC[3];

    if (check4(a, [1, 0, 1, 0, 0, 0, 0, 0])) return rulesC[4];
    if (check4(a, [0, 1, 0, 1, 0, 0, 0, 0])) return rulesC[5];

    if (check4(a, [1, 0, 0, 1, 0, 0, 0, 0])) return rulesC[6];
    if (check4(a, [0, 1, 0, 0, 1, 0, 0, 0])) return rulesC[7];

    if (check4(a, [1, 0, 0, 0, 1, 0, 0, 0])) return rulesC[8];
    if (check4(a, [0, 1, 0, 0, 0, 1, 0, 0])) return rulesC[9];

    //DREI
    if (check4(a, [1, 1, 1, 0, 0, 0, 0, 0])) return rulesC[10];
    if (check4(a, [0, 1, 1, 1, 0, 0, 0, 0])) return rulesC[11];

    if (check4(a, [1, 1, 0, 1, 0, 0, 0, 0])) return rulesC[12];
    if (check4(a, [0, 1, 1, 0, 1, 0, 0, 0])) return rulesC[13];

    if (check4(a, [1, 1, 0, 0, 1, 0, 0, 0])) return rulesC[14];
    if (check4(a, [0, 1, 1, 0, 0, 1, 0, 0])) return rulesC[15];

    if (check4(a, [1, 1, 0, 0, 0, 1, 0, 0])) return rulesC[16];
    if (check4(a, [0, 1, 1, 0, 0, 0, 1, 0])) return rulesC[17];

    if (check4(a, [1, 1, 0, 0, 0, 0, 1, 0])) return rulesC[18];
    if (check4(a, [0, 1, 1, 0, 0, 0, 0, 1])) return rulesC[19];

    if (check4(a, [1, 0, 1, 0, 1, 0, 0, 0])) return rulesC[20];
    if (check4(a, [0, 1, 0, 1, 0, 1, 0, 0])) return rulesC[21];

    if (check4(a, [1, 0, 1, 0, 0, 1, 0, 0])) return rulesC[22];
    if (check4(a, [0, 1, 0, 1, 0, 0, 1, 0])) return rulesC[23];

    //VIER

    if (check4(a, [1, 1, 1, 1, 0, 0, 0, 0])) return rulesC[24];
    if (check4(a, [0, 1, 1, 1, 1, 0, 0, 0])) return rulesC[25];

    if (check4(a, [1, 1, 1, 0, 1, 0, 0, 0])) return rulesC[26];
    if (check4(a, [0, 1, 1, 1, 0, 1, 0, 0])) return rulesC[27];

    if (check4(a, [1, 1, 1, 0, 0, 1, 0, 0])) return rulesC[28];
    if (check4(a, [0, 1, 1, 1, 0, 0, 1, 0])) return rulesC[29];

    if (check4(a, [1, 1, 1, 0, 0, 0, 1, 0])) return rulesC[30];
    if (check4(a, [0, 1, 1, 1, 0, 0, 0, 1])) return rulesC[31];

    if (check4(a, [1, 1, 0, 1, 1, 0, 0, 0])) return rulesC[32];
    if (check4(a, [0, 1, 1, 0, 1, 1, 0, 0])) return rulesC[33];

    if (check4(a, [1, 1, 0, 1, 0, 1, 0, 0])) return rulesC[34];
    if (check4(a, [0, 1, 1, 0, 1, 0, 1, 0])) return rulesC[35];

    if (check4(a, [1, 1, 0, 1, 0, 0, 1, 0])) return rulesC[36];
    if (check4(a, [0, 1, 1, 0, 1, 0, 0, 1])) return rulesC[37];

    if (check4(a, [1, 1, 0, 0, 1, 0, 1, 0])) return rulesC[38];
    if (check4(a, [0, 1, 1, 0, 0, 1, 0, 1])) return rulesC[39];

    if (check4(a, [1, 1, 0, 0, 1, 1, 0, 0])) return rulesC[40]; //2
    if (check4(a, [0, 1, 1, 0, 0, 1, 1, 0])) return rulesC[41]; //2

    if (check4(a, [1, 0, 1, 0, 1, 0, 1, 0])) return rulesC[42]; //1
    if (check4(a, [0, 1, 0, 1, 0, 1, 0, 1])) return rulesC[43]; //1

    //FÜNF

    if (check4(a, [0, 0, 0, 1, 1, 1, 1, 1])) return rulesC[44];
    if (check4(a, [1, 0, 0, 0, 1, 1, 1, 1])) return rulesC[45];

    if (check4(a, [0, 0, 1, 0, 1, 1, 1, 1])) return rulesC[46];
    if (check4(a, [1, 0, 0, 1, 0, 1, 1, 1])) return rulesC[47];

    if (check4(a, [0, 0, 1, 1, 0, 1, 1, 1])) return rulesC[48];
    if (check4(a, [1, 0, 0, 1, 1, 0, 1, 1])) return rulesC[49];

    if (check4(a, [0, 0, 1, 1, 1, 0, 1, 1])) return rulesC[50];
    if (check4(a, [1, 0, 0, 1, 1, 1, 0, 1])) return rulesC[51];

    if (check4(a, [0, 0, 1, 1, 1, 1, 0, 1])) return rulesC[52];
    if (check4(a, [1, 0, 0, 1, 1, 1, 1, 0])) return rulesC[53];

    if (check4(a, [0, 1, 0, 1, 0, 1, 1, 1])) return rulesC[54];
    if (check4(a, [1, 0, 1, 0, 1, 0, 1, 1])) return rulesC[55];

    if (check4(a, [0, 1, 0, 1, 1, 0, 1, 1])) return rulesC[56];
    if (check4(a, [1, 0, 1, 0, 1, 1, 0, 1])) return rulesC[57];

    //SECHS
    if (check4(a, [0, 0, 1, 1, 1, 1, 1, 1])) return rulesC[58];
    if (check4(a, [0, 1, 1, 0, 0, 0, 0, 0])) return rulesC[59];

    if (check4(a, [0, 1, 0, 1, 1, 1, 1, 1])) return rulesC[60];
    if (check4(a, [0, 1, 0, 1, 0, 0, 0, 0])) return rulesC[61];

    if (check4(a, [0, 1, 1, 0, 1, 1, 1, 1])) return rulesC[62];
    if (check4(a, [0, 1, 0, 0, 1, 0, 0, 0])) return rulesC[63];

    if (check4(a, [0, 1, 1, 1, 0, 1, 1, 1])) return rulesC[64];
    if (check4(a, [0, 1, 0, 0, 0, 1, 0, 0])) return rulesC[65];

    //SIEBEN
    if (check4(a, [0, 1, 1, 1, 1, 1, 1, 1])) return rulesC[66];
    if (check4(a, [1, 0, 1, 1, 1, 1, 1, 1])) return rulesC[67];

    //ACHT
    if (check(a, [1, 1, 1, 1, 1, 1, 1, 1])) return rulesC[68];
    return 0;
  }

  // function showUsedColors() {
  //   const colorList = document.getElementById("color-list");

  //   colorList.innerHTML = "";

  //   // Create color icons and add click event listeners
  //   colors.forEach((color, index) => {
  //     if (usedColors.includes(color)) {
  //       const colorPicker = document.createElement("input");
  //       colorPicker.type = "color";
  //       colorPicker.value = colors[index];
  //       colorPicker.addEventListener("input", (event) => {
  //         const newColor = event.target.value;
  //         colors[index] = newColor;
  //         render();
  //       });

  //       // Apply custom styling to the color picker
  //       colorPicker.style.border = "2px solid #ccc";
  //       colorPicker.style.borderRadius = "5px";
  //       colorPicker.style.margin = "3px";
  //       colorPicker.style.padding = "5px";
  //       colorPicker.style.transition = "border 0.3s";

  //       // Add hover effect
  //       colorPicker.addEventListener("mouseover", () => {
  //         colorPicker.style.border = "2px solid #999";
  //       });

  //       colorPicker.addEventListener("mouseout", () => {
  //         colorPicker.style.border = "2px solid #ccc";
  //       });

  //       colorList.appendChild(colorPicker);
  //     }
  //   });
  // }

  function render() {
    const usedColors: string[] = [];

    if (!eCanvas.current) {
      console.warn("render: Canvas not initialized");
      return;
    }
    const ctx = eCanvas.current.getContext("2d");

    if (!ctx) {
      console.warn("render: Canvas not initialized");
      return;
    }
    // Loop through the 2D array and set the pixel colors
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const colorIndex = data[y][x];
        const color = colorIndex == 0 ? "rgba(0,0,0,0)" : colors[colorIndex];

        if (!usedColors.includes(color)) {
          // console.log(color);
          usedColors.push(color);
        }
        ctx.fillStyle = color;
        ctx.fillRect(
          offsetX + x * rectSize,
          offsetY + y * rectSize,
          rectSize,
          rectSize
        );
        ctx.fillStyle = "transparent"; // Clear the fillStyle
      }
    }
    //TODO: add showUsedColors();
  }

  // overlay animation

  // const overlay = document.getElementById("overlay");

  // overlay.addEventListener("mouseenter", showOverlay);
  // overlay.addEventListener("mouseleave", hideOverlay);
  // function showOverlay() {
  //   setOverlayOpacity(1);

  //   overlay.style.width = eCanvas.style.width;
  // }

  function hideOverlay() {
    setOverlayOpacity(0);
  }

  // --------------------------------------------------------------------------------
  // interface to exe editor

  function sendToExeDesign() {
    if (!eCanvas.current) {
      console.warn("3: Canvas not initialized");
      return;
    }

    // setOverlayOpacity(0);

    // const picSize = Math.min(index, WIDTH / 2);
    // const picW = (2 * picSize + 2) * rectSize + 1;
    // const picH = (2 * picSize + 2) * rectSize + 1;
    // const imageData = ctx.getImageData(
    //   eCanvasWidth / 2 - (picSize + 1) * rectSize,
    //   eCanvasHeight / 2 - (picSize + 1) * rectSize,
    //   picW,
    //   picH
    // );
    // var tempCanvas = document.createElement("canvas");
    // var tempCtx = tempCanvas.getContext("2d");
    // tempCanvas.width = picW;
    // tempCanvas.height = picH;
    // tempCtx.putImageData(imageData, 0, 0);
    // const dataURL = tempCanvas.toDataURL();
    // fabric.Image.fromURL(dataURL, function (img) {
    //   img.set({
    //     left: getDesignerWidth() / 2,
    //     top: getDesignerHeight() / 2,
    //     originX: "center",
    //     originY: "center",
    //   });
    //   setImageOnCanvas(img);
    // });
  }

  // if (!eCanvas.current) {
  //   console.warn("4: Canvas not initialized");
  // }

  return (
    <div className="min-w- border-neutral-600 border-2 rounded-[2px] flex flex-col gap-4 p-6">
      Pixel Module
      <button id="button1" onClick={startWithNewRules}>
        start
      </button>
      {/* textfield seed */}
      <input type="text" id="seed" placeholder="seed" />
      <canvas
        ref={eCanvas}
        id="editor-canvas"
        onClick={sendToExeDesign}
        style={{
          backgroundColor: bgColor,
          height: (eCanvasHeight * 1) / scale + "px",
          width: (eCanvasWidth * 1) / scale + "px",
        }}
        width={eCanvasWidth}
        height={eCanvasHeight}
      ></canvas>
      <button id="button3" onClick={initiate}>
        initiate
      </button>
      <button id="button2" onClick={back}>
        back
      </button>
      <button id="button2" onClick={doStep}>
        step
      </button>
      {index}
      <button id="button4" onClick={randomColorAndRender}>
        random color
      </button>
    </div>
  );
};
