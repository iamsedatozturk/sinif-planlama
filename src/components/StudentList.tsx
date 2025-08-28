import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student, StudentListProps } from "@/proxy/models";

const DraggableStudent: React.FC<{ student: Student }> = ({ student }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: student.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-300 cursor-grab active:cursor-grabbing transform hover:scale-105 ${
        isDragging ? "opacity-30 scale-110 rotate-3 shadow-2xl z-50" : ""
      }`}
    >
      <div className="flex flex-col items-center space-y-2 group">
        <Avatar className="h-10 w-10">
          <AvatarImage src={student.photoUrl || undefined} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {student.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="text-center">
          <div className="font-medium text-xs text-gray-900 truncate w-full leading-tight">
            {student.fullName}
          </div>
        </div>
      </div>
    </div>
  );
};

export const StudentList: React.FC<StudentListProps> = ({
  students,
  searchQuery,
  selectedTags,
}) => {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid grid-cols-3 gap-3">
        {students.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-gray-500">
            <div className="text-sm">Öğrenci bulunamadı</div>
            <div className="text-xs mt-1">Arama kriterlerinizi değiştirin</div>
          </div>
        ) : (
          students.map((student) => (
            <DraggableStudent key={student.id} student={student} />
          ))
        )}
      </div>
    </div>
  );
};
