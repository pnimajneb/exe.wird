import { fabric } from "fabric";

export function frontCanvasInit(width: number, height: number) {
  return new fabric.Canvas("frontCanvas", {
    height: 800,
    width: 800,
    backgroundColor: "pink",
    selection: false,
    renderOnAddRemove: true,
  });
}

export function setViewedResolution(
  canvas: fabric.Canvas,
  width: number,
  height: number
) {
  canvas.setDimensions(
    {
      width: width + "px",
      height: height + "px",
    },
    {
      cssOnly: true,
    }
  );
}

export function backCanvasInit(width: number, height: number) {
  return new fabric.Canvas("backCanvas", {
    height: 800,
    width: 800,
    backgroundColor: "red",
    selection: false,
    renderOnAddRemove: true,
  });
}
