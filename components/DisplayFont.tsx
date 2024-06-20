"use client";
import React, { useEffect, useState } from "react";
import { FontOption, getFonts } from "../app/page";

const DisplayFont: React.FC = () => {
  const [fontOptions, setFontOptions] = useState<FontOption[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    async function fetchFonts() {
      const fonts = await getFonts();
      setFontOptions(fonts);
    }
    fetchFonts();
  }, []);
};

export default DisplayFont;
