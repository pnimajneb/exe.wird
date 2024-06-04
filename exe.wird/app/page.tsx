import React from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Type,
  Upload,
  WrapText,
  Grid2x2Check,
} from "lucide-react";
import ActionButton from "../components/ActionButton";
import CustomSelect from "../components/CustomSelect";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

export default function Home() {
  const buttonsConfig = [
    { icon: Upload, label: "Upload" },
    { icon: Type, label: "Text" },
    { icon: Grid2x2Check, label: "Pixel Tool" },
  ];

  const fontOptions = [
    { value: "test1", label: "Test1" },
    { value: "test2", label: "Test2" },
    { value: "test3", label: "Test3" },
  ];

  const colorOptions = [
    { value: "white", label: "Weiß", icon: { textcolor: "neutral-200" } },
    {
      value: "yellow",
      label: "Gelb",
      icon: { textcolor: "yellow-300", fillcolor: "yellow-400" },
    },
    {
      value: "purple",
      label: "Violett",
      icon: { textcolor: "purple-300", fillcolor: "purple-400" },
    },
    { value: "black", label: "Schwarz", icon: { textcolor: "black" } },
  ];

  return (
    <main>
      <div className="flex m-12 gap-4">
        <div className="flex flex-col gap-12">
          {buttonsConfig.map((button, index) => (
            <ActionButton key={index} icon={button.icon} label={button.label} />
          ))}
        </div>
        <div className="border-neutral-600 border-2 rounded-[2px] flex flex-col gap-4 p-12">
          <Textarea className="p-4" />
          <CustomSelect placeholder="Schriftart" options={fontOptions} />
          <CustomSelect placeholder="Farbe" options={colorOptions} />
          <div>
            <p className="pb-2 pt-4">Textausrichtung</p>
            <Button variant={"outline"} className="mr-2">
              <AlignLeft />
            </Button>
            <Button variant={"outline"} className="mr-2">
              <AlignRight />
            </Button>
            <Button variant={"outline"} className="mr-2">
              <AlignCenter />
            </Button>
            <Button variant={"outline"} className="mr-2">
              <AlignJustify />
            </Button>
          </div>
          <div>
            <p className="pb-2 pt-4">Zeilen- & Zeichenabstand</p>
            <Button variant={"outline"}>
              <WrapText />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
