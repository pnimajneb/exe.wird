import { fabric } from "fabric";

export function frontCanvasInit(width: number, height: number) {
  return new fabric.Canvas("frontCanvas", {
    height: height,
    width: width,
    backgroundColor: "pink",
    selection: false,
    renderOnAddRemove: true,
  });
}

export function backCanvasInit(width: number, height: number) {
  return new fabric.Canvas("backCanvas", {
    height: height,
    width: width,
    backgroundColor: "red",
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
