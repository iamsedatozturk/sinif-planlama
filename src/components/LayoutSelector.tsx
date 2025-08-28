import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { layouts } from "@/data/layouts";

interface LayoutSelectorProps {
  selectedLayout: string;
  onLayoutChange: (layout: string) => void;
}

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
