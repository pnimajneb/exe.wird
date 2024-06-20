"use client";

import React from "react";
import { Textarea } from "../../ui/textarea";
import CustomSelect from "../../CustomSelect";
import { Button } from "../../ui/button";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  WrapText,
} from "lucide-react";
import { Font, FontOption } from "../../../types/fonts";
import { googleFontsSmaller } from "../../../public/fonts/googleFontsSmaller";

interface TextModuleProps {
  sendPicture: (img: string) => void;
  bgColor: string;
}

export function getFonts(): FontOption[] {
  // const GOOGLE_FONTS_API_KEY = "AIzaSyCggySCv6HONkQCWB0bSgMHWcVY7A8JOss";
  let fontOptions: FontOption[] = [];

  try {
    // const response = await fetch(
    //   `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`
    // );

    // if (!response.ok) {
    //   throw new Error("Failed to fetch data");
    // }
    // const data = await response.json();
    const data = googleFontsSmaller;
    fontOptions = data.items.map((font: Font) => ({
      value: font.family,
      label: font.family,
    }));
  } catch (error) {
    console.error("Error fetching fonts:", error);
  }

  return fontOptions;
}

export const TextModuleComponent: React.FC<TextModuleProps> = (
  props: TextModuleProps
) => {
  const { sendPicture, bgColor } = props;
  const fontOptions = getFonts();

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
    <div className="min-w- border-neutral-600 border-2 rounded-[2px] flex flex-col gap-4 p-6">
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
  );
};
