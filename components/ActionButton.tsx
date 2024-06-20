import React from "react";
import { Button } from "./ui/button";

type ActionButtonProps = {
  icon: React.ComponentType;
  label: string;
  onClick?: () => void;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <Button
      className="flex flex-col gap-2"
      variant={"secondary"}
      size={"icon"}
      onClick={onClick}
    >
      <Icon />
      <span className="text-[16px]">{label}</span>
    </Button>
  );
};

export default ActionButton;
