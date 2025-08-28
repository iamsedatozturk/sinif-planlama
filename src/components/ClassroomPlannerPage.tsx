import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUsers, FaSearch, FaThLarge, FaUndo, FaSave } from "react-icons/fa";
import { StudentList } from "./StudentList";
import { SeatGrid } from "./SeatGrid";
import { ClassroomSelector } from "./ClassroomSelector";
import { QuickActions } from "./QuickActions";
import { mockStudents } from "@/data/students";
import { Classroom, Seat, Student } from "@/proxy/models";

export const ClassroomPlannerPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [draggedStudent, setDraggedStudent] = useState<Student | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Mock data - gerçek API'den gelecek
  useEffect(() => {
    setStudents(mockStudents);
  }, []);

  // Sınıf değiştiğinde koltukları yeniden oluştur
  useEffect(() => {
    if (selectedClassroom) {
      const newSeats: Seat[] = [];
      for (let row = 0; row < selectedClassroom.rows; row++) {
        for (let col = 0; col < selectedClassroom.columns; col++) {
          const label = String.fromCharCode(65 + row) + (col + 1);
          newSeats.push({
            id: `seat-${row}-${col}`,
            row,
            col,
            label,
            isBlocked: false,
            seatType: "Standard",
            concurrencyStamp: "",
            creationTime: new Date().toISOString(),
            lastModificationTime: new Date().toISOString(),
          });
        }
      }
      setSeats(newSeats);
      setSelectedSeats([]); // Seçili koltukları temizle
    }
  }, [selectedClassroom]);

  const handleDragStart = (event: DragStartEvent) => {
    const student = students.find((s) => s.id === event.active.id);
    setDraggedStudent(student || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id.toString().startsWith("seat-")) {
      const seatId = over.id.toString();
      const studentId = active.id.toString();

      // Check if seat is blocked
      const targetSeat = seats.find((s) => s.id === seatId);
      if (!targetSeat || targetSeat.isBlocked) {
        setDraggedStudent(null);
        return;
      }

      // Update seat assignment - eski öğrenciyi kaldır, yeni öğrenciyi yerleştir
      setSeats((prev) =>
        prev.map((seat) =>
          seat.id === seatId
            ? { ...seat, studentId }
            : seat.studentId === studentId
            ? { ...seat, studentId: undefined }
            : seat
        )
      );
    }

    setDraggedStudent(null);
  };

  const handleRemoveStudent = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === seatId ? { ...seat, studentId: undefined } : seat
      )
    );
  };

  const handleRemoveSelectedStudents = () => {
    setSeats((prev) =>
      prev.map((seat) =>
        selectedSeats.includes(seat.id)
          ? { ...seat, studentId: undefined }
          : seat
      )
    );
    setSelectedSeats([]); // Seçimi temizle
  };

  const handleToggleSeatBlock = () => {
    setSeats((prev) =>
      prev.map((seat) => {
        if (selectedSeats.includes(seat.id)) {
          return {
            ...seat,
            isBlocked: !seat.isBlocked,
            studentId: seat.isBlocked ? seat.studentId : undefined,
          };
        }
        return seat;
      })
    );
    setSelectedSeats([]); // Seçimi temizle
  };

  const handleSeatSelect = (seatIds: string[]) => {
    // Sadece dolu koltukları seçilebilir yap
    const validSeatIds = seatIds.filter((seatId) => {
      const seat = seats.find((s) => s.id === seatId);
      return seat && seat.studentId; // Sadece öğrencisi olan koltuklar
    });
    setSelectedSeats(validSeatIds);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => student.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const assignedStudentIds = seats
    .filter((seat) => seat.studentId)
    .map((seat) => seat.studentId!);

  const unassignedStudents = filteredStudents.filter(
    (student) => !assignedStudentIds.includes(student.id)
  );

  const handleClearAll = () => {
    setSeats((prev) => prev.map((seat) => ({ ...seat, studentId: undefined })));
  };

  const handleAutoAssign = () => {
    const availableSeats = seats.filter(
      (seat) => !seat.isBlocked && !seat.studentId
    );
    const studentsToAssign = unassignedStudents.slice(0, availableSeats.length);

    const newSeats = [...seats];
    studentsToAssign.forEach((student, index) => {
      const seatIndex = seats.findIndex(
        (seat) => seat.id === availableSeats[index].id
      );
      if (seatIndex !== -1) {
        newSeats[seatIndex] = { ...newSeats[seatIndex], studentId: student.id };
      }
    });

    setSeats(newSeats);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaThLarge className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900">
                Sınıf Planlama
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button size="sm">
              <FaSave className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </div>
        </div>
      </header>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Student List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaUsers className="h-5 w-5 mr-2" />
                  Öğrenciler ({unassignedStudents.length})
                </h2>
              </div>

              {/* Sınıf Seçimi */}
              <div className="mb-4">
                <ClassroomSelector
                  selectedClassroom={selectedClassroom}
                  onClassroomChange={setSelectedClassroom}
                />
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Öğrenci ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <StudentList
              students={unassignedStudents}
              searchQuery={searchQuery}
              selectedTags={selectedTags}
            />
          </div>

          {/* Main Content - Seat Grid */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4"></div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleClearAll}>
                    <FaUndo className="h-4 w-4 mr-2" />
                    Temizle
                  </Button>
                  <Button size="sm" onClick={handleAutoAssign}>
                    Otomatik Ata
                  </Button>
                </div>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="flex-1 p-6 overflow-auto">
              {selectedClassroom && (
                <SeatGrid
                  classroom={selectedClassroom}
                  seats={seats}
                  students={students}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelect}
                  onRemoveStudent={handleRemoveStudent}
                />
              )}
            </div>
          </div>

          {/* Right Sidebar - Quick Actions */}
          <div className="w-80 bg-white border-l border-gray-200">
            <QuickActions
              selectedSeats={selectedSeats}
              seats={seats}
              students={students}
              onRemoveSelectedStudents={handleRemoveSelectedStudents}
              onToggleSeatBlock={handleToggleSeatBlock}
            />
          </div>
        </div>

        <DragOverlay>
          {draggedStudent && (
            <div className="transform rotate-3 scale-110">
              <Avatar className="h-12 w-12 border-4 border-primary shadow-2xl">
                <AvatarImage src={draggedStudent.photoUrl || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                  {draggedStudent.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
