"use client";

import React from "react";
import { PixelModuleComponent } from "./modules/pixelModule";
import { TextModuleComponent } from "./modules/textModule";
import { UploadModuleComponent } from "./modules/uploadModule";
import { Grid2x2Check, Type, Upload } from "lucide-react";
import ActionButton from "../ActionButton";

interface EditorProps {
  sendPicture: (img: string) => void;
  bgColor: string;
}

enum EditorMode {
  PIXEL = "Pixel Tool",
  TEXT = "Text",
  MIDJOURNEY = "Upload",
}

const buttonsConfig = [
  { icon: Upload, label: EditorMode.MIDJOURNEY },
  { icon: Type, label: EditorMode.TEXT },
  { icon: Grid2x2Check, label: EditorMode.PIXEL },
];

export const EditorComponent: React.FC<EditorProps> = (props: EditorProps) => {
  const { sendPicture, bgColor } = props;
  const [mode, setMode] = React.useState(EditorMode.MIDJOURNEY);

  function renderEditor() {
    switch (mode) {
      case EditorMode.PIXEL:
        return (
          <PixelModuleComponent sendPicture={sendPicture} bgColor={bgColor} />
        );
      case EditorMode.TEXT:
        return (
          <TextModuleComponent sendPicture={sendPicture} bgColor={bgColor} />
        );
      case EditorMode.MIDJOURNEY:
        return (
          <UploadModuleComponent sendPicture={sendPicture} bgColor={bgColor} />
        );
    }
  }

  return (
    <div className="grid grid-cols-[100px_minmax(100px,1fr)]">
      <div className="flex flex-col gap-12">
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
