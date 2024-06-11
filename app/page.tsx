import React from "react";
import { Type, Upload, Grid2x2Check } from "lucide-react";
import ActionButton from "../components/ActionButton";
import { DesignerComponent } from "../components/designer/designer";
import {
  TextModuleComponent,
  getFonts,
} from "../components/editor/modules/textModule";
import { EditorComponent } from "../components/editor/editor";
import App from "next/app";
import { AppComponent } from "../components/app/app";

export default async function Home() {
  return (
    <main>
      <div>
        <AppComponent />
      </div>
    </main>
  );
}
