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
import { text } from "stream/consumers";
import { AppComponent } from "../components/app/app";

type Font = {
  family: string;
};

export type FontOption = {
  value: string;
  label: string;
};

export type HomeProps = {
  fontOptions: FontOption[];
};

export default async function Home() {
  return (
    <main>
      <AppComponent />
    </main>
  );
}
