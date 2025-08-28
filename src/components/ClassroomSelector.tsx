import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface Classroom {
  id: string;
  name: string;
  layoutType: string;
  rows: number;
  columns: number;
  capacity: number;
}

interface ClassroomSelectorProps {
  selectedClassroom: Classroom | null;
  onClassroomChange: (classroom: Classroom | null) => void;
}

export const ClassroomSelector: React.FC<ClassroomSelectorProps> = ({
  selectedClassroom,
  onClassroomChange,
}) => {
  // Mock classrooms - API'den gelecek (Circle layout kaldırıldı)
  const classrooms: Classroom[] = [
    {
      id: "1",
      name: "Theater Sınıfı",
      layoutType: "Theater",
      rows: 6,
      columns: 8,
      capacity: 48,
    },
    {
      id: "2",
      name: "U-Shape Sınıfı",
      layoutType: "UShape",
      rows: 5,
      columns: 8,
      capacity: 40,
    },
    {
      id: "3",
      name: "Bus Sınıfı",
      layoutType: "Bus",
      rows: 10,
      columns: 5,
      capacity: 50,
    },
    {
      id: "4",
      name: "Lab Sınıfı",
      layoutType: "Lab",
      rows: 8,
      columns: 6,
      capacity: 48,
    },
    {
      id: "5",
      name: "Exam Sınıfı",
      layoutType: "Exam",
      rows: 10,
      columns: 10,
      capacity: 100,
    },
    {
      id: "6",
      name: "Grid Sınıfı",
      layoutType: "Grid",
      rows: 8,
      columns: 8,
      capacity: 64,
    },
  ];

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
