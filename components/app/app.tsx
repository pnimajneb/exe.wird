import React from "react";
import { EditorComponent } from "../editor/editor";
import { DesignerComponent } from "../designer/designer";

type AppProps = {};

export const AppComponent: React.FC = (props: AppProps) => {
  // const isDesktop = window.innerWidth > BP_TABLET_DESKTOP;
  // const isTablet =
  //   window.innerWidth > BP_MOBILE_TABLET &&
  //   window.innerWidth <= BP_TABLET_DESKTOP;
  // const isMobile = window.innerWidth <= BP_MOBILE_TABLET;

  function changeColor() {}

  function sendPicture() {}

  return (
    <div className="flex m-12 gap-4">
      <EditorComponent />
      <DesignerComponent />
    </div>
  );
};
