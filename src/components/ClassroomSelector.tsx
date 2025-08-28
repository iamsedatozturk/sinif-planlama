import React from "react"
import { Classroom } from "@/proxy/models"
import { classrooms } from "@/data/classroom"
import { Select } from "./ui"

interface ClassroomSelectorProps {
  selectedClassroom: Classroom | null
  onClassroomChange: (classroom: Classroom | null) => void
}

export const ClassroomSelector: React.FC<ClassroomSelectorProps> = ({
  selectedClassroom,
  onClassroomChange,
}) => {
  return (
    <div className="w-full">
      <Select<Classroom, false>
        value={selectedClassroom}
        onChange={(option) => onClassroomChange(option as Classroom | null)}
        options={classrooms}
        getOptionValue={(option) => option.id}
        formatOptionLabel={(option, { context }) =>
          context === "menu" ? (
            <div className="flex flex-col">
              <span>{option.name}</span>
              <span className="text-xs text-gray-500">
                {option.layoutType} • {option.capacity} koltuk
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span>{option.name}</span>
              <span className="ml-3 text-xs text-gray-500">
                {option.capacity} koltuk
              </span>
            </div>
          )
        }
        placeholder="Sınıf seçin..."
        className="w-full"
      />
    </div>
  )
}
