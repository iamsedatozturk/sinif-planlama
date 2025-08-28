import React from "react";
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
  return (
    <div className="w-full">
      <select
        value={selectedClassroom?.id || ""}
        onChange={(e) =>
          onClassroomChange(
            classrooms.find((c) => c.id === e.target.value) || null
          )
        }
        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
      >
        <option value="">Sınıf seçin...</option>
        {classrooms.map((classroom) => (
          <option key={classroom.id} value={classroom.id}>
            {classroom.name} • {classroom.capacity} koltuk
          </option>
        ))}
      </select>
    </div>
  );
};
