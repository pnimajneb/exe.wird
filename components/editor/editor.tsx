"use client";

import React from "react";
import { PixelModuleComponent } from "./modules/pixelModule";
import { TextModuleComponent } from "./modules/textModule";
import { MidjourneyModuleComponent } from "./modules/midjourneyModule";

type EditorProps = {};

enum EditorMode {
  PIXEL,
  TEXT,
  MIDJOURNEY,
}

export const EditorComponent: React.FC = (props: EditorProps) => {
  const [mode, setMode] = React.useState(EditorMode.TEXT);

  function renderEditor() {
    switch (mode) {
      case EditorMode.PIXEL:
        return <PixelModuleComponent />;
      case EditorMode.TEXT:
        return <TextModuleComponent />;
      case EditorMode.MIDJOURNEY:
        return <MidjourneyModuleComponent />;
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setMode(EditorMode.TEXT)}>Text</button>
        <button onClick={() => setMode(EditorMode.PIXEL)}>Pixel</button>
        <button onClick={() => setMode(EditorMode.MIDJOURNEY)}>
          Midjourney
        </button>
      </div>
      {renderEditor()}
    </div>
  );
};
