import { fabric } from "fabric";

//params for generator
const isOneOne = true;
const is7And8Zero = false;
const useComplexRules = true;
const numberOfRules = 69;

let rectSize = 30;

const WIDTH = 65; //ungerade!
const HEIGHT = 65;

const eCanvasWidth = WIDTH * rectSize;
const eCanvasHeight = HEIGHT * rectSize;

const scale = 4;

export class PixelMandala {
  private eCanvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private data: number[][] = new Array(WIDTH)
    .fill(0)
    .map(() => new Array(HEIGHT).fill(0));
  private rules: number[] = new Array(numberOfRules);
  private rulesC: number[] = new Array(numberOfRules);
  private colors: string[] = new Array(numberOfRules);
  private usedColors: string[] = [];

  private index: number = 0;
  private offsetX: number = (eCanvasWidth - WIDTH * rectSize) / 2;
  private offsetY: number = (eCanvasHeight - HEIGHT * rectSize) / 2;
  private background = "rgba(240,240,240)";
  private seed: number = 3124234;

  constructor(canvas: HTMLCanvasElement) {
    this.eCanvas = canvas;
    this.data = new Array(WIDTH).fill(0).map(() => new Array(HEIGHT).fill(0));

    this.setStartValues();

    this.ctx = canvas.getContext("2d")!;
    this.eCanvas.width = eCanvasWidth;
    this.eCanvas.height = eCanvasHeight;
    this.eCanvas.style.width = (eCanvasWidth * 1) / scale + "px";
    this.eCanvas.style.height = (eCanvasHeight * 1) / scale + "px";
    // eCanvas.style.width = eCanvasWidth * 1/scale + 'px';
    // eCanvas.style.height = eCanvasHeight * 1/scale + 'px';

    const ruleSeed = this.setSeed();
    this.setRuleSymmetric(ruleSeed);
    this.setRandomColor();
    // ctx.clearRect(0, 0, eCanvas.width, eCanvas.height);
    this.render();

    this.randomSteps();

    this.setBackgroundColor(this.background);
  }

  //--------------------------------------------------------------------------------

  getSeed() {
    return this.seed;
  }

  getIndex() {
    return this.index;
  }

  setSeed() {
    this.seed = Math.floor(Math.random() * 16777216);
    return this.seed;
  }

  changeSeedAndReset(seed: number) {
    this.seed = seed;
    this.setRuleSymmetric(seed);
    this.setRandomColor();
    this.initiate();
    this.render();
  }

  changeSeed(seed: number) {
    this.seed = seed;
    this.setRuleSymmetric(this.seed);
    this.setRandomColor();
  }

  public startWithNewRules() {
    const ruleSeed = this.setSeed();
    this.setRuleSymmetric(ruleSeed);

    this.setRandomColor();
    this.initiate();
    this.render();

    this.randomSteps();
  }

  randomSteps() {
    const minSteps = 2;
    const maxSteps = 10;
    const numberOfSteps =
      Math.floor(Math.random() * (maxSteps - minSteps + 1)) + minSteps;

    for (let i = 0; i < numberOfSteps; i++) {
      this.step(); // Call the step()  here for each step
    }
  }

  public initiate() {
    for (var i = 0; i < WIDTH; i++) {
      this.data[i] = new Array(HEIGHT);
      for (var j = 0; j < HEIGHT; j++) {
        this.data[i][j] = 0;
      }
    }
    this.setStartValues();
    //setRuleSymmetric(ruleSeed);
    //setRandomColor();
    this.ctx.clearRect(0, 0, this.eCanvas.width, this.eCanvas.height);
    this.render();
    this.index = 0;
  }

  setStartValues() {
    // data[Math.round(WIDTH / 2 - 0.5) - 1][Math.round(HEIGHT / 2 - 0.5)] = 1;
    // data[Math.round(WIDTH / 2 - 0.5)][Math.round(HEIGHT / 2 - 0.5) - 1] = 1;
    this.data[Math.round(WIDTH / 2 - 0.5)][Math.round(HEIGHT / 2 - 0.5)] = 1;
    // data[Math.round(WIDTH / 2 - 0.5) + 1][Math.round(HEIGHT / 2 - 0.5)] = 1;
    // data[Math.round(WIDTH / 2 - 0.5)][Math.round(HEIGHT / 2 - 0.5) + 1] = 1;
  }

  public back() {
    var indexTemp = this.index;
    this.initiate();
    for (var i = 0; i < indexTemp - 1; i++) {
      this.step();
    }
  }

  public step() {
    this.nextStep(this.data);
    this.ctx.clearRect(0, 0, this.eCanvas.width, this.eCanvas.height);
    this.render();
    this.index++;
  }

  public randomColorAndRender() {
    this.setRandomColor();
    this.ctx.clearRect(0, 0, this.eCanvas.width, this.eCanvas.height);
    this.render();
  }

  setRuleSymmetric(seed: number) {
    for (var i = 0; i < this.rules.length; i++) {
      this.rules[i] = 0;
    }
    switch (seed % 3) {
      case 0:
        this.rules[0] = isOneOne ? 1 : 0;
        this.rules[1] = 1;
        break;
      case 1:
        this.rules[0] = 1;
        this.rules[1] = isOneOne ? 1 : 0;
        break;
      case 2:
        this.rules[0] = 1;
        this.rules[1] = 1;
        break;
    }

    var bin = (seed >>> 0).toString(2);
    for (var i = 2; i < bin.length && i < this.rules.length - 1; i += 2) {
      this.rules[i] = Number(bin.charAt(i));
      this.rules[i + 1] = Number(bin.charAt(i));
    }
    this.rules[6] = is7And8Zero ? 0 : 1;
    this.rules[7] = is7And8Zero ? 0 : 1;
    // document.getElementById("rules").innerHTML = rules.toString();
    // document.getElementById("rulesC").innerHTML = rulesC.toString();
  }

  //symmetric
  setRandomColor() {
    for (var i = 0; i < this.colors.length; i++) {
      this.colors[i] = this.decimalToHex(Math.floor(Math.random() * 16777216));
    }
    //colors[0] = '#000000';
    for (var i = 2; i < this.rulesC.length; i += 2) {
      this.rulesC[i] = this.rules[i] * (i + 1);
      this.rulesC[i + 1] = this.rulesC[i];
    }
    this.rulesC[0] = this.rules[0];
    this.rulesC[1] = this.rules[0];
  }

  decimalToHex(decimal: number) {
    const hex = decimal.toString(16).toUpperCase(); // Convert to hexadecimal and make it uppercase
    const paddedHex = hex.padStart(6, "0"); // Pad with zeros to ensure it's 6 characters long
    return "#" + paddedHex;
  }

  nextStep(cells: number[][]) {
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
          cellsUpdate[x][y] = this.rule2(around);
        } else {
          cellsUpdate[x][y] = this.rule(around);
        }
      }
    }
    for (var x = 1; x < WIDTH - 1; x++) {
      for (var y = 1; y < HEIGHT - 1; y++) {
        cells[x][y] = cellsUpdate[x][y];
        if (cells[x][y] != 0) {
          //console.log(x+ " " + y + " - " + cellsUpdate[x][y]);
        }
      }
    }
  }

  check(a: number[], b: number[]) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }

  check4(a: number[], b: number[]) {
    const mb = b.map(
      (element, index, array) => array[array.length - 1 - index]
    );
    return this.checkCircle(a, b) || this.checkCircle(a, mb);
  }

  checkCircle(a: number[], b: number[]) {
    return (
      this.check(a, [b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]]) ||
      this.check(a, [b[2], b[3], b[4], b[5], b[6], b[7], b[0], b[1]]) ||
      this.check(a, [b[4], b[5], b[6], b[7], b[0], b[1], b[2], b[3]]) ||
      this.check(a, [b[6], b[7], b[0], b[1], b[2], b[3], b[4], b[5]])
    );
  }

  rule(a: number[]) {
    var sum = a[0] + a[1] + a[2] + a[3] + a[4] + a[5] + a[6] + a[7];
    if (sum == 0) return 0;
    if (sum == 1) return this.rulesC[0];
    if (sum == 2) return this.rulesC[1];
    if (sum == 3) return this.rulesC[2];
    if (sum == 4) return this.rulesC[3];
    if (sum == 5) return this.rulesC[4];
    if (sum == 6) return this.rulesC[5];
    if (sum == 7) return this.rulesC[6];
    return this.rulesC[7];
  }

  //Sum
  rule2(a: number[]) {
    var sum = a[0] + a[1] + a[2] + a[3] + a[4] + a[5] + a[6] + a[7];
    //NULL
    if (this.check(a, [0, 0, 0, 0, 0, 0, 0, 0])) return 0; //MUST

    //EINS
    if (this.check4(a, [1, 0, 0, 0, 0, 0, 0, 0])) return this.rulesC[0]; //MUST oder
    if (this.check4(a, [0, 1, 0, 0, 0, 0, 0, 0])) return this.rulesC[1]; //MUST

    //ZWEI
    if (this.check4(a, [1, 1, 0, 0, 0, 0, 0, 0])) return this.rulesC[2];
    if (this.check4(a, [0, 1, 1, 0, 0, 0, 0, 0])) return this.rulesC[3];

    if (this.check4(a, [1, 0, 1, 0, 0, 0, 0, 0])) return this.rulesC[4];
    if (this.check4(a, [0, 1, 0, 1, 0, 0, 0, 0])) return this.rulesC[5];

    if (this.check4(a, [1, 0, 0, 1, 0, 0, 0, 0])) return this.rulesC[6];
    if (this.check4(a, [0, 1, 0, 0, 1, 0, 0, 0])) return this.rulesC[7];

    if (this.check4(a, [1, 0, 0, 0, 1, 0, 0, 0])) return this.rulesC[8];
    if (this.check4(a, [0, 1, 0, 0, 0, 1, 0, 0])) return this.rulesC[9];

    //DREI
    if (this.check4(a, [1, 1, 1, 0, 0, 0, 0, 0])) return this.rulesC[10];
    if (this.check4(a, [0, 1, 1, 1, 0, 0, 0, 0])) return this.rulesC[11];

    if (this.check4(a, [1, 1, 0, 1, 0, 0, 0, 0])) return this.rulesC[12];
    if (this.check4(a, [0, 1, 1, 0, 1, 0, 0, 0])) return this.rulesC[13];

    if (this.check4(a, [1, 1, 0, 0, 1, 0, 0, 0])) return this.rulesC[14];
    if (this.check4(a, [0, 1, 1, 0, 0, 1, 0, 0])) return this.rulesC[15];

    if (this.check4(a, [1, 1, 0, 0, 0, 1, 0, 0])) return this.rulesC[16];
    if (this.check4(a, [0, 1, 1, 0, 0, 0, 1, 0])) return this.rulesC[17];

    if (this.check4(a, [1, 1, 0, 0, 0, 0, 1, 0])) return this.rulesC[18];
    if (this.check4(a, [0, 1, 1, 0, 0, 0, 0, 1])) return this.rulesC[19];

    if (this.check4(a, [1, 0, 1, 0, 1, 0, 0, 0])) return this.rulesC[20];
    if (this.check4(a, [0, 1, 0, 1, 0, 1, 0, 0])) return this.rulesC[21];

    if (this.check4(a, [1, 0, 1, 0, 0, 1, 0, 0])) return this.rulesC[22];
    if (this.check4(a, [0, 1, 0, 1, 0, 0, 1, 0])) return this.rulesC[23];

    //VIER

    if (this.check4(a, [1, 1, 1, 1, 0, 0, 0, 0])) return this.rulesC[24];
    if (this.check4(a, [0, 1, 1, 1, 1, 0, 0, 0])) return this.rulesC[25];

    if (this.check4(a, [1, 1, 1, 0, 1, 0, 0, 0])) return this.rulesC[26];
    if (this.check4(a, [0, 1, 1, 1, 0, 1, 0, 0])) return this.rulesC[27];

    if (this.check4(a, [1, 1, 1, 0, 0, 1, 0, 0])) return this.rulesC[28];
    if (this.check4(a, [0, 1, 1, 1, 0, 0, 1, 0])) return this.rulesC[29];

    if (this.check4(a, [1, 1, 1, 0, 0, 0, 1, 0])) return this.rulesC[30];
    if (this.check4(a, [0, 1, 1, 1, 0, 0, 0, 1])) return this.rulesC[31];

    if (this.check4(a, [1, 1, 0, 1, 1, 0, 0, 0])) return this.rulesC[32];
    if (this.check4(a, [0, 1, 1, 0, 1, 1, 0, 0])) return this.rulesC[33];

    if (this.check4(a, [1, 1, 0, 1, 0, 1, 0, 0])) return this.rulesC[34];
    if (this.check4(a, [0, 1, 1, 0, 1, 0, 1, 0])) return this.rulesC[35];

    if (this.check4(a, [1, 1, 0, 1, 0, 0, 1, 0])) return this.rulesC[36];
    if (this.check4(a, [0, 1, 1, 0, 1, 0, 0, 1])) return this.rulesC[37];

    if (this.check4(a, [1, 1, 0, 0, 1, 0, 1, 0])) return this.rulesC[38];
    if (this.check4(a, [0, 1, 1, 0, 0, 1, 0, 1])) return this.rulesC[39];

    if (this.check4(a, [1, 1, 0, 0, 1, 1, 0, 0])) return this.rulesC[40]; //2
    if (this.check4(a, [0, 1, 1, 0, 0, 1, 1, 0])) return this.rulesC[41]; //2

    if (this.check4(a, [1, 0, 1, 0, 1, 0, 1, 0])) return this.rulesC[42]; //1
    if (this.check4(a, [0, 1, 0, 1, 0, 1, 0, 1])) return this.rulesC[43]; //1

    //FÜNF

    if (this.check4(a, [0, 0, 0, 1, 1, 1, 1, 1])) return this.rulesC[44];
    if (this.check4(a, [1, 0, 0, 0, 1, 1, 1, 1])) return this.rulesC[45];

    if (this.check4(a, [0, 0, 1, 0, 1, 1, 1, 1])) return this.rulesC[46];
    if (this.check4(a, [1, 0, 0, 1, 0, 1, 1, 1])) return this.rulesC[47];

    if (this.check4(a, [0, 0, 1, 1, 0, 1, 1, 1])) return this.rulesC[48];
    if (this.check4(a, [1, 0, 0, 1, 1, 0, 1, 1])) return this.rulesC[49];

    if (this.check4(a, [0, 0, 1, 1, 1, 0, 1, 1])) return this.rulesC[50];
    if (this.check4(a, [1, 0, 0, 1, 1, 1, 0, 1])) return this.rulesC[51];

    if (this.check4(a, [0, 0, 1, 1, 1, 1, 0, 1])) return this.rulesC[52];
    if (this.check4(a, [1, 0, 0, 1, 1, 1, 1, 0])) return this.rulesC[53];

    if (this.check4(a, [0, 1, 0, 1, 0, 1, 1, 1])) return this.rulesC[54];
    if (this.check4(a, [1, 0, 1, 0, 1, 0, 1, 1])) return this.rulesC[55];

    if (this.check4(a, [0, 1, 0, 1, 1, 0, 1, 1])) return this.rulesC[56];
    if (this.check4(a, [1, 0, 1, 0, 1, 1, 0, 1])) return this.rulesC[57];

    //SECHS
    if (this.check4(a, [0, 0, 1, 1, 1, 1, 1, 1])) return this.rulesC[58];
    if (this.check4(a, [0, 1, 1, 0, 0, 0, 0, 0])) return this.rulesC[59];

    if (this.check4(a, [0, 1, 0, 1, 1, 1, 1, 1])) return this.rulesC[60];
    if (this.check4(a, [0, 1, 0, 1, 0, 0, 0, 0])) return this.rulesC[61];

    if (this.check4(a, [0, 1, 1, 0, 1, 1, 1, 1])) return this.rulesC[62];
    if (this.check4(a, [0, 1, 0, 0, 1, 0, 0, 0])) return this.rulesC[63];

    if (this.check4(a, [0, 1, 1, 1, 0, 1, 1, 1])) return this.rulesC[64];
    if (this.check4(a, [0, 1, 0, 0, 0, 1, 0, 0])) return this.rulesC[65];

    //SIEBEN
    if (this.check4(a, [0, 1, 1, 1, 1, 1, 1, 1])) return this.rulesC[66];
    if (this.check4(a, [1, 0, 1, 1, 1, 1, 1, 1])) return this.rulesC[67];

    //ACHT
    if (this.check(a, [1, 1, 1, 1, 1, 1, 1, 1])) return this.rulesC[68];
    return 0;
  }

  showUsedColors() {
    // const colorList = document.getElementById("color-list");
    // colorList.innerHTML = "";
    // // Create color icons and add click event listeners
    // this.colors.forEach((color, index) => {
    //     if (usedColors.includes(color)) {
    //         const colorPicker = document.createElement("input");
    //         colorPicker.type = "color";
    //         colorPicker.value = this.colors[index];
    //         colorPicker.addEventListener("input", (event) => {
    //             const newColor = event.target.value;
    //             this.colors[index] = newColor;
    //             render();
    //         });
    //         // Apply custom styling to the color picker
    //         colorPicker.style.border = "2px solid #ccc";
    //         colorPicker.style.borderRadius = "5px";
    //         colorPicker.style.margin = "3px";
    //         colorPicker.style.padding = "5px";
    //         colorPicker.style.transition = "border 0.3s";
    //         // Add hover effect
    //         colorPicker.addEventListener("mouseover", () => {
    //             colorPicker.style.border = "2px solid #999";
    //         });
    //         colorPicker.addEventListener("mouseout", () => {
    //             colorPicker.style.border = "2px solid #ccc";
    //         });
    //         colorList.appendChild(colorPicker);
    //     }
    // });
  }

  setBackgroundColor(color: string) {
    this.background = color;
    this.eCanvas.style.backgroundColor = color;
  }

  render() {
    const usedColors: string[] = [];
    // Loop through the 2D array and set the pixel colors
    for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data[y].length; x++) {
        const colorIndex = this.data[y][x];
        const color =
          colorIndex == 0 ? "rgba(0,0,0,0)" : this.colors[colorIndex];

        if (!usedColors.includes(color)) {
          // console.log(color);
          usedColors.push(color);
        }
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
          this.offsetX + x * rectSize,
          this.offsetY + y * rectSize,
          rectSize,
          rectSize
        );
        this.ctx.fillStyle = "transparent"; // Clear the fillStyle
      }
    }
    this.showUsedColors();
  }

  // --------------------------------------------------------------------------------
  // interface to exe editor

  public createImage() {
    const picSize = Math.min(this.index, WIDTH / 2);
    const picW = (2 * picSize + 2) * rectSize + 1;
    const picH = (2 * picSize + 2) * rectSize + 1;
    const imageData = this.ctx.getImageData(
      eCanvasWidth / 2 - (picSize + 1) * rectSize,
      eCanvasHeight / 2 - (picSize + 1) * rectSize,
      picW,
      picH
    );
    var tempCanvas = document.createElement("canvas");
    var tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = picW;
    tempCanvas.height = picH;
    tempCtx?.putImageData(imageData, 0, 0);
    return tempCanvas.toDataURL();
  }
}
