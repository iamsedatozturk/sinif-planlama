import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Classroom } from "@/proxy/models";
import { classrooms } from "@/data/classroom";

interface ClassroomSelectorProps {
  selectedClassroom: Classroom | null;
  onClassroomChange: (classroom: Classroom | null) => void;
}

export const ClassroomSelector: React.FC<ClassroomSelectorProps> = ({
  selectedClassroom,
  onClassroomChange,
}) => {
  const handleClassroomChange = (classroomId: string) => {
    const classroom = classrooms.find((c) => c.id === classroomId);
    if (classroom) {
      onClassroomChange(classroom);
    }
  };

  return (
    <div className="w-full">
      <Select
        value={selectedClassroom?.id || ""}
        onValueChange={handleClassroomChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sınıf seçin...">
            {selectedClassroom && (
              <div className="flex items-center justify-between w-full">
                <span>{selectedClassroom.name}</span>
                <span className="ml-3 text-xs text-gray-500">
                  {selectedClassroom.capacity} koltuk
                </span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {classrooms.map((classroom) => (
            <SelectItem key={classroom.id} value={classroom.id}>
              <div className="flex flex-col">
                <span>{classroom.name}</span>
                <span className="text-xs text-gray-500">
                  {classroom.layoutType} • {classroom.capacity} koltuk
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
