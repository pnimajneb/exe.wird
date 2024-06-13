"use client";

import React from "react";
import { PixelModuleComponent } from "./modules/pixelModule";
import { TextModuleComponent } from "./modules/textModule";
import { MidjourneyModuleComponent } from "./modules/midjourneyModule";
import { Grid2x2Check, Type, Upload } from "lucide-react";
import ActionButton from "../ActionButton";

type EditorProps = {};

const buttonsConfig = [
  { icon: Upload, label: "Upload" },
  { icon: Type, label: "Text" },
  { icon: Grid2x2Check, label: "Pixel Tool" },
];

export const EditorComponent: React.FC = (props: EditorProps) => {
  const [mode, setMode] = React.useState("Text");

  function renderEditor() {
    switch (mode) {
      case "Pixel Tool":
        return <PixelModuleComponent />;
      case "Text":
        return <TextModuleComponent />;
      case "Upload":
        return <MidjourneyModuleComponent />;
    }
  }

  return (
    <div className="grid grid-row-2 md:grid-cols-[100px_minmax(100px,1fr)]">
      <div className="flex md:flex-col flex-row justify-between md:justify-evenly pb-4 md:pb-0">
        {buttonsConfig.map((button, index) => (
          <ActionButton
            key={index}
            icon={button.icon}
            label={button.label}
            onClick={() => setMode(button.label)}
          />
        ))}
      </div>
      {renderEditor()}
    </div>
  );
};
