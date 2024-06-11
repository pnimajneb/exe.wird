import React from "react";
import { EditorComponent } from "../editor/editor";
import { DesignerComponent } from "../designer/designer";

type AppProps = {};

export const AppComponent: React.FC = (props: AppProps) => {
  function changeColor() {}

  function sendPicture() {}

  return (
    <div>
      <EditorComponent />
      <DesignerComponent />
    </div>
  );
};
