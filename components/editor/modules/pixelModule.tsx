"use client";

import React, { useEffect } from "react";
import { fabric } from "fabric";
import { init } from "next/dist/compiled/webpack/webpack";
import { PixelMandala } from "../../../editors/mandala/PixelMandala";

interface PixelModuleProps {
  sendPicture: (img: string) => void;
  bgColor: string;
}

export interface ColorIndex {
  color: string;
  index: number;
}

const eCanvasWidth = 400;
const eCanvasHeight = 400;
const scale = 4;

export const PixelModuleComponent: React.FC<PixelModuleProps> = (
  props: PixelModuleProps
) => {
  const { sendPicture, bgColor } = props;

  const eCanvas = React.useRef<HTMLCanvasElement>(null);
  const pixelMandala = React.useRef<PixelMandala | null>(null);
  const [index, setIndex] = React.useState(0);
  const [seed, setSeed] = React.useState<number>();
  const [overlayOpacity, setOverlayOpacity] = React.useState<number>(0);
  const [usedColors, setUsedColors] = React.useState<ColorIndex[]>([]);

  useEffect(() => {
    if (eCanvas.current && !pixelMandala.current) {
      pixelMandala.current = new PixelMandala(eCanvas.current);
      setIndex(pixelMandala.current?.getIndex() || 0);
      setSeed(pixelMandala.current?.getSeed() || 0);
      setUsedColors(pixelMandala.current?.getUsedColors() || []);
      console.log("PixelMandala initialized");
    } else {
      console.warn(
        "Canvas not initialized or PixelMandala already initialized"
      );
    }
  }, [eCanvas.current]);

  function initiate() {
    pixelMandala.current?.initiate();
    setIndex(pixelMandala.current?.getIndex() || 0);
    setSeed(pixelMandala.current?.getSeed() || 0);
    setUsedColors(pixelMandala.current?.getUsedColors() || []);
  }

  function startWithNewRules() {
    pixelMandala.current?.startWithNewRules();
    setIndex(pixelMandala.current?.getIndex() || 0);
    setSeed(pixelMandala.current?.getSeed() || 0);
    setUsedColors(pixelMandala.current?.getUsedColors() || []);
  }

  function back() {
    pixelMandala.current?.back();
    setIndex(pixelMandala.current?.getIndex() || 0);
    setUsedColors(pixelMandala.current?.getUsedColors() || []);
  }

  function doStep() {
    pixelMandala.current?.step();
    setIndex(pixelMandala.current?.getIndex() || 0);
    setUsedColors(pixelMandala.current?.getUsedColors() || []);
  }

  function randomColorAndRender() {
    pixelMandala.current?.randomColorAndRender();
    setUsedColors(pixelMandala.current?.getUsedColors() || []);
  }

  function createImage() {
    sendPicture(pixelMandala.current?.createImage() || "");
    setOverlayOpacity(0);
  }

  return (
    <div className="min-w- border-neutral-600 border-2 rounded-[2px] flex flex-col gap-4 p-6">
      Pixel Module
      <button id="button1" onClick={startWithNewRules}>
        start
      </button>
      {/* textfield seed */}
      <input
        type="text"
        id="seed"
        placeholder="seed"
        value={seed}
        onChange={(event) => {
          const value = parseInt(event.target.value);
          if (!isNaN(value)) {
            setSeed(value);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            pixelMandala.current?.changeSeed(seed ?? 0);
            doStep();
          }
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: `${eCanvasWidth}`,
          height: `${eCanvasHeight}`,
        }}
      >
        <canvas
          ref={eCanvas}
          id="editor-canvas"
          onClick={createImage}
          style={{
            backgroundColor: bgColor,
            height: (eCanvasHeight * 1) / scale + "px",
            width: (eCanvasWidth * 1) / scale + "px",
            display: "block",
            border: "1px solid black",
          }}
          width={eCanvasWidth}
          height={eCanvasHeight}
        ></canvas>
        <div
          id="overlay"
          onClick={createImage}
          onMouseEnter={() => setOverlayOpacity(1)}
          onMouseLeave={() => setOverlayOpacity(0)}
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            fontSize: "24px",
            color: "#fff",
            cursor: "pointer",
            opacity: `${overlayOpacity}`,
            backgroundColor:
              "rgba(0, 0, 0, 0.5)" /* Adjust the background color and opacity as needed */,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.5s",
          }}
        ></div>
        click to add
      </div>
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
      {/* TODO:add colors */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {usedColors.map((color) => (
          <input
            type="color"
            key={color.color}
            value={color.color}
            onChange={(event) => {
              pixelMandala.current?.setColor(color.index, event.target.value);
              setUsedColors(pixelMandala.current?.getUsedColors() || []);
            }}
            style={{
              width: "20px",
              height: "20px",
              margin: "5px", // Optional: add some space between the items
            }}
          ></input>
        ))}
      </div>
    </div>
  );
};
