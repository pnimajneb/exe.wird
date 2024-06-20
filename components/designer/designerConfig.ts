import { fabric } from "fabric";

export function frontCanvasInit() {
  return new fabric.Canvas("frontCanvas", {
    height: 800,
    width: 800,
    backgroundColor: "pink",
    selection: false,
    renderOnAddRemove: true,
  });
}

export function backCanvasInit() {
  return new fabric.Canvas("backCanvas", {
    height: 800,
    width: 800,
    backgroundColor: "red",
    selection: false,
    renderOnAddRemove: true,
  });
}
