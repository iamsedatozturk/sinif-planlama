import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { FaTimes } from "react-icons/fa";
import { cn } from "@/utils/utils";
import { Seat, SeatGridProps, Student } from "@/proxy/models";

const DroppableSeat: React.FC<{
  seat: Seat;
  student?: Student;
  isSelected: boolean;
  onSelect: () => void;
  onRemoveStudent: () => void;
}> = ({ seat, student, isSelected, onSelect, onRemoveStudent }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: seat.id,
  });

  const isEmpty = !student;
  const isBlocked = seat.isBlocked;
  const canDrop = !isBlocked; // Bloke olmayan tüm koltuklar drop edilebilir
  const canSelect = !isEmpty; // Sadece dolu koltuklar seçilebilir

  return (
    <div className="relative group">
      <div
        ref={setNodeRef}
        onClick={canSelect ? onSelect : undefined}
        className={cn(
          "relative w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center transform",
          canSelect ? "cursor-pointer" : "cursor-default",
          {
            // Empty seat
            "bg-gray-100 border-gray-300 hover:border-primary hover:bg-gray-50":
              canDrop && !isOver,

            // Blocked seat
            "bg-red-100 border-red-300 text-red-700 cursor-not-allowed opacity-75":
              isBlocked,
            // Selected
            "ring-2 ring-orange-400 ring-offset-2 bg-orange-50 border-orange-400":
              isSelected && canSelect,
            // Drag over - büyük visual feedback
            "scale-125 ring-4 ring-green-400 ring-offset-4 bg-green-50 border-green-400 shadow-lg z-10":
              isOver && canDrop && isEmpty,
            // Drag over occupied seat - farklı renk
            "scale-125 ring-4 ring-yellow-400 ring-offset-4 bg-yellow-50 border-yellow-400 shadow-lg z-10":
              isOver && canDrop && !isEmpty,
            // Invalid drop target
            "ring-4 ring-red-400 ring-offset-2 bg-red-50 border-red-400 shake":
              isOver && !canDrop,
          }
        )}
        style={{
          zIndex: isOver ? 10 : 1,
        }}
      >
        {student ? (
          <Avatar
            className={cn(
              "w-full h-full rounded-full object-cover transition-all duration-200",
              "group-hover:ring-2 group-hover:ring-blue-500 group-hover:ring-offset-1"
            )}
            src={student.photoUrl || undefined}
          >
            {student.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
        ) : (
          <span
            className={cn(
              "text-xs font-medium transition-all duration-300",
              isOver && canDrop ? "text-green-700 font-bold" : "text-gray-600"
            )}
          >
            {seat.label}
          </span>
        )}

        {/* Drop indicator */}
        {isOver && canDrop && isEmpty && (
          <div className="absolute inset-0 rounded-lg bg-green-400/20 border-2 border-green-400 border-dashed animate-pulse" />
        )}

        {/* Drop indicator for occupied seats */}
        {isOver && canDrop && !isEmpty && (
          <div className="absolute inset-0 rounded-lg bg-yellow-400/20 border-2 border-yellow-400 border-dashed animate-pulse" />
        )}

        {/* Invalid drop indicator */}
        {isOver && !canDrop && (
          <div className="absolute inset-0 rounded-lg bg-red-400/20 border-2 border-red-400 border-dashed" />
        )}
      </div>

      {/* Remove button - sadece dolu koltuklar için */}
      {student && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveStudent();
          }}
          className="absolute -top-2 -right-2 flex items-center justify-center 
               w-6 h-6 rounded-full bg-red-600 text-white 
               hover:bg-red-700 shadow-md
               opacity-0 group-hover:opacity-100 
               transition-opacity duration-200 z-20"
        >
          <FaTimes className="h-3 w-3" />
        </button>
      )}

      {/* Tooltip on hover */}
      {student && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          {student.fullName}
        </div>
      )}
    </div>
  );
};

export const SeatGrid: React.FC<SeatGridProps> = ({
  classroom,
  seats,
  students,
  selectedSeats,
  onSeatSelect,
  onRemoveStudent,
}) => {
  const handleSeatSelect = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      onSeatSelect(selectedSeats.filter((id) => id !== seatId));
    } else {
      onSeatSelect([...selectedSeats, seatId]);
    }
  };

  // Create grid layout
  const grid = Array.from({ length: classroom.rows }, (_, row) =>
    Array.from({ length: classroom.columns }, (_, col) => {
      const seat = seats.find((s) => s.row === row && s.col === col);
      const student = seat?.studentId
        ? students.find((s) => s.id === seat.studentId)
        : undefined;
      return { seat, student };
    })
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-64 mt-4 h-5 items-center bg-gray-800 rounded-sm">
        <div className="text-xs text-white justify-center text-center">
          TAHTA
        </div>
      </div>

      {/* Seat Grid */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${classroom.columns}, 1fr)` }}
      >
        {grid.flat().map(({ seat, student }, index) => {
          if (!seat) return <div key={index} className="w-12 h-12" />;

          return (
            <DroppableSeat
              key={seat.id}
              seat={seat}
              student={student}
              isSelected={selectedSeats.includes(seat.id)}
              onSelect={() => handleSeatSelect(seat.id)}
              onRemoveStudent={() => onRemoveStudent(seat.id)}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
          <span>Boş</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary border-2 border-primary rounded"></div>
          <span>Dolu</span>
        </div>
      </div>
    </div>
  );
};
