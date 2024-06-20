import React from "react";

interface MidjourneyModuleProps {
  sendPicture: (img: string) => void;
  bgColor: string;
}

export const MidjourneyModuleComponent: React.FC<MidjourneyModuleProps> = (
  props: MidjourneyModuleProps
) => {
  const { sendPicture, bgColor } = props;

  return (
    <>
      <div>
        Midjourney Module
        <br />
        <button onClick={() => sendPicture("img")}>send</button>
      </div>
    </>
  );
};
