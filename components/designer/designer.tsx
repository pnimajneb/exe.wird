import React from "react";

type DesignerProps = {};

export const DesignerComponent: React.FC = (props: DesignerProps) => {
  return (
    <>
      <div className="border-neutral-600 border-2 rounded-[2px] flex flex-col gap-4 p-12 w-1/3">
        <p>Typed Text:</p>
        <p>{}</p>
      </div>
    </>
  );
};
