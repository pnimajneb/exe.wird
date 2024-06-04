import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Circle } from "lucide-react";

type Option = {
  value: string;
  label: string;
  icon?: {
    textcolor: string;
    fillcolor?: string;
  };
};

type CustomSelectProps = {
  placeholder: string;
  options: Option[];
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder,
  options,
}) => {
  return (
    <Select>
      <SelectTrigger className="w-1/2">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {option.icon && (
                <Circle
                  className={`text-${option.icon.textcolor} fill-${option.icon.fillcolor}`}
                />
              )}
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
