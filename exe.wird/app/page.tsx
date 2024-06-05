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

type Font = {
  family: string;
};

type FontOption = {
  value: string;
  label: string;
};

// export async function getFonts() {
//   const GOOGLE_FONTS_API_KEY = process.env.GOOGLE_FONTS_API_KEY;
//   let fontOptions: FontOption[] = [];

//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`
//     );
//     const data = await response.json();
//     fontOptions = data.items.map((font: Font) => ({
//       value: font.family,
//       label: font.family,
//     }));
//   } catch (error) {
//     console.error("Error fetching fonts:", error);
//   }

//   return {
//     props: {
//       fontOptions,
//     },
//   };
// }

async function getFonts(): Promise<FontOption[]> {
  const GOOGLE_FONTS_API_KEY = process.env.GOOGLE_FONTS_API_KEY;
  let fontOptions: FontOption[] = [];

  try {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    fontOptions = data.items.map((font: Font) => ({
      value: font.family,
      label: font.family,
    }));
  } catch (error) {
    console.error("Error fetching fonts:", error);
  }

  return fontOptions;
}

type HomeProps = {
  fontOptions: FontOption[];
};

export default async function Home() {
  const fontOptions = await getFonts();

  const buttonsConfig = [
    { icon: Upload, label: "Upload" },
    { icon: Type, label: "Text" },
    { icon: Grid2x2Check, label: "Pixel Tool" },
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
    {
      value: "black",
      label: "Schwarz",
      icon: { textcolor: "black", fillcolor: "black" },
    },
  ];

  return (
    <main>
      <div className="flex m-12 gap-4">
        <div className="flex flex-col gap-12">
          {buttonsConfig.map((button, index) => (
            <ActionButton key={index} icon={button.icon} label={button.label} />
          ))}
        </div>
        <div className="border-neutral-600 border-2 rounded-[2px] flex flex-col gap-4 p-12 w-1/3">
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
