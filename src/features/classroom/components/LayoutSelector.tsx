/**
 * Layout Selector Component
 */
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  FaThLarge,
  FaBus,
  FaSquare,
  FaLayerGroup,
  FaFlask,
  FaBookOpen,
  FaCircle,
} from "react-icons/fa";

interface LayoutSelectorProps {
  selectedLayout: string;
  onLayoutChange: (layout: string) => void;
}

const layouts = [
  {
    value: "Theater",
    label: "Theater",
    icon: FaThLarge,
    description: "Tam grid düzen",
  },
  { value: "Bus", label: "Bus", icon: FaBus, description: "Ortada koridor" },
  {
    value: "UShape",
    label: "U-Shape",
    icon: FaSquare,
    description: "U şekli düzen",
  },
  {
    value: "Grid",
    label: "Grid",
    icon: FaLayerGroup,
    description: "Basit tablo",
  },
  { value: "Lab", label: "Lab", icon: FaFlask, description: "Masa grupları" },
  {
    value: "Exam",
    label: "Exam",
    icon: FaBookOpen,
    description: "Sınav düzeni",
  },
  {
    value: "Circle",
    label: "Circle",
    icon: FaCircle,
    description: "Yuvarlak düzen",
  },
];

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  selectedLayout,
  onLayoutChange,
}) => {
  const selectedLayoutData = layouts.find((l) => l.value === selectedLayout);

  return (
    <Select value={selectedLayout} onValueChange={onLayoutChange}>
      <SelectTrigger className="w-40">
        <SelectValue>
          <div className="flex items-center space-x-2">
            {selectedLayoutData && (
              <>
                <selectedLayoutData.icon className="h-4 w-4" />
                <span>{selectedLayoutData.label}</span>
              </>
            )}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {layouts.map((layout) => (
          <SelectItem key={layout.value} value={layout.value}>
            <div className="flex items-center space-x-2">
              <layout.icon className="h-4 w-4" />
              <div className="flex flex-col">
                <span>{layout.label}</span>
                <span className="text-xs text-gray-500">
                  {layout.description}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
