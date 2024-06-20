import React from "react";

interface PixelModuleProps {
  sendPicture: (img: string) => void;
  bgColor: string;
}

export const PixelModuleComponent: React.FC<PixelModuleProps> = (
  props: PixelModuleProps
) => {
  const { sendPicture, bgColor } = props;
  return <>Pixel Module</>;
};
