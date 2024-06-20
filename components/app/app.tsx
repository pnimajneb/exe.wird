"use client";

import React, { useEffect, useRef, useState } from "react";
import { EditorComponent } from "../editor/editor";
import { fabric } from "fabric";

import { DesignerComponent } from "../designer/designer";
import { backCanvasInit, frontCanvasInit } from "../designer/designerConfig";

type AppProps = {};

export const AppComponent: React.FC<AppProps> = () => {
  const [bgColor, setBgColor] = useState("#ffffff");

  const [showFrontDesigner, setShowFrontDesigner] = useState(true);

  const frontCanvas = useRef<any>(null);
  const backCanvas = useRef<any>(null);

  useEffect(() => {
    frontCanvas.current = frontCanvasInit();
    backCanvas.current = backCanvasInit();

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
    if (showFrontDesigner) {
      // frontDesigner?.addImage(img);
      frontCanvas.current.add(
        new fabric.Circle({ radius: 30, fill: "red", top: 100, left: 100 })
      );
    } else {
      // backDesigner?.addImage(img);
      backCanvas.current.add(
        new fabric.Circle({ radius: 30, fill: "blue", top: 100, left: 100 })
      );
    }
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
