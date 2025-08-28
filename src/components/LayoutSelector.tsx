import React from "react"
import { layouts } from "@/data/layouts"
import { Select } from "./ui"

interface LayoutSelectorProps {
  selectedLayout: string
  onLayoutChange: (layout: string) => void
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  selectedLayout,
  onLayoutChange,
}) => {
  const selectedLayoutData = layouts.find((l) => l.value === selectedLayout)

  return (
    <Select
      value={selectedLayoutData || null}
      onChange={(option) => option && onLayoutChange((option as typeof layouts[0]).value)}
      options={layouts}
      getOptionValue={(option) => option.value}
      formatOptionLabel={(option, { context }) =>
        context === "menu" ? (
          <div className="flex items-center space-x-2">
            <option.icon className="h-4 w-4" />
            <div className="flex flex-col">
              <span>{option.label}</span>
              <span className="text-xs text-gray-500">{option.description}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <option.icon className="h-4 w-4" />
            <span>{option.label}</span>
          </div>
        )
      }
      className="w-40"
    />
  )
}
