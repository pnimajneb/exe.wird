import React from "react";

type DesignerProps = {};

export const DesignerComponent: React.FC = (props: DesignerProps) => {
  return (
    <>
      <div className="border-neutral-600 border-2 rounded-[2px] p-4">
        <p>Designer</p>
      </div>
    </>
  );
};
