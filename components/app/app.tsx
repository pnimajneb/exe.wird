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
    <div className=" grid lg:grid-cols-2 md:grid-cols-1 gap-12 p-12">
      <EditorComponent />
      <DesignerComponent />
    </div>
  );
};
