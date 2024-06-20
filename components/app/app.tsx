"use client";

import React, { useEffect, useRef, useState } from "react";
import { EditorComponent } from "../editor/editor";
import { fabric } from "fabric";

import { DesignerComponent } from "../designer/designer";
import {
  backCanvasInit,
  frontCanvasInit,
  setViewedResolution,
} from "../designer/designerConfig";

type AppProps = {};

export const AppComponent: React.FC<AppProps> = () => {
  const [bgColor, setBgColor] = useState("#ff2222");

  const [showFrontDesigner, setShowFrontDesigner] = useState(true);

  const frontCanvas = useRef<any>(null);
  const backCanvas = useRef<any>(null);

  useEffect(() => {
    frontCanvas.current = frontCanvasInit(3800, 3800);
    backCanvas.current = backCanvasInit(3800, 3800);

    setViewedResolution(frontCanvas.current, 400, 400);
    setViewedResolution(backCanvas.current, 400, 400);

    if (!frontCanvas.current || !backCanvas.current) {
      console.error("min 1 canvas not initialized");
      return;
    }

    return () => {
      if (frontCanvas.current) {
        frontCanvas.current.dispose();
        frontCanvas.current = null;
      }
      if (backCanvas.current) {
        backCanvas.current.dispose();
        backCanvas.current = null;
      }
    };
  }, []);

  function changeColor(color: string) {
    setBgColor(color);
  }

  function sendPicture(img: string) {
    const image = new Image();
    image.onload = function () {
      const fabricImage = new fabric.Image(image, {
        left: 100,
        top: 100,
        angle: 0,
        scaleX: 0.5,
        scaleY: 0.5,
      });

      if (showFrontDesigner) {
        frontCanvas.current.add(fabricImage);
      } else {
        backCanvas.current.add(fabricImage);
      }
    };
    image.src = img;
  }

  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-12 p-12">
      <EditorComponent sendPicture={sendPicture} bgColor={bgColor} />
      <DesignerComponent
        showFrontDesigner={showFrontDesigner}
        setShowFrontDesigner={setShowFrontDesigner}
        changeColor={changeColor}
        frontCanvas={frontCanvas}
        backCanvas={backCanvas}
      />
    </div>
  );
};
