import React from "react";
import { Button } from "./ui/button";

type ActionButtonProps = {
  icon: React.ComponentType;
  label: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label }) => {
  return (
    <Button className="flex flex-col gap-2" variant={"secondary"} size={"icon"}>
      <Icon />
      <span className="text-[16px]">{label}</span>
    </Button>
  );
};

export default ActionButton;
