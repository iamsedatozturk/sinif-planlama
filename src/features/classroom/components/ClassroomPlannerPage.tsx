/**
 * Classroom Planner Page - Ana Sınıf Planlama Ekranı
 */
import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { FaUsers, FaSearch, FaThLarge, FaUndo, FaSave } from "react-icons/fa";
import { StudentList } from "./StudentList";
import { SeatGrid } from "./SeatGrid";
import { ClassroomSelector } from "./ClassroomSelector";
import { LayoutSelector } from "./LayoutSelector";
import { QuickActions } from "./QuickActions";

interface Student {
  id: string;
  fullName: string;
  photoUrl: string | null;
  tags: string[];
  isActive: boolean;
}

interface Seat {
  id: string;
  row: number;
  col: number;
  label: string;
  isBlocked: boolean;
  studentId?: string;
}

interface Classroom {
  id: string;
  name: string;
  layoutType: string;
  rows: number;
  columns: number;
  capacity: number;
}

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
    const mockStudents: Student[] = [
      {
        id: "1",
        fullName: "Ahmet Yılmaz",
        photoUrl:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        tags: ["Matematik", "Fizik"],
        isActive: true,
      },
      {
        id: "2",
        fullName: "Ayşe Demir",
        photoUrl:
          "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
        tags: ["Edebiyat", "Tarih"],
        isActive: true,
      },
      {
        id: "3",
        fullName: "Mehmet Kaya",
        photoUrl:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        tags: ["Kimya", "Biyoloji"],
        isActive: true,
      },
      {
        id: "4",
        fullName: "Fatma Özkan",
        photoUrl:
          "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
        tags: ["Geometri", "Sanat"],
        isActive: true,
      },
      {
        id: "5",
        fullName: "Ali Çelik",
        photoUrl:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
        tags: ["İngilizce", "Müzik"],
        isActive: true,
      },
      {
        id: "6",
        fullName: "Zeynep Arslan",
        photoUrl:
          "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
        tags: ["Matematik", "İngilizce"],
        isActive: true,
      },
      {
        id: "7",
        fullName: "Murat Doğan",
        photoUrl:
          "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
        tags: ["Tarih", "Coğrafya"],
        isActive: true,
      },
      {
        id: "8",
        fullName: "Elif Yıldız",
        photoUrl:
          "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
        tags: ["Biyoloji", "Edebiyat"],
        isActive: true,
      },
      {
        id: "9",
        fullName: "Osman Güler",
        photoUrl:
          "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
        tags: ["Fizik", "Kimya"],
        isActive: true,
      },
      {
        id: "10",
        fullName: "Hatice Aydın",
        photoUrl:
          "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg",
        tags: ["Sanat", "Müzik"],
        isActive: true,
      },
      {
        id: "11",
        fullName: "Emre Şahin",
        photoUrl:
          "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg",
        tags: ["Matematik", "Geometri"],
        isActive: true,
      },
      {
        id: "12",
        fullName: "Büşra Öztürk",
        photoUrl:
          "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
        tags: ["İngilizce", "Edebiyat"],
        isActive: true,
      },
      {
        id: "13",
        fullName: "Kemal Polat",
        photoUrl:
          "https://images.pexels.com/photos/2218208/pexels-photo-2218208.jpeg",
        tags: ["Coğrafya", "Tarih"],
        isActive: true,
      },
      {
        id: "14",
        fullName: "Selin Karaca",
        photoUrl:
          "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg",
        tags: ["Biyoloji", "Kimya"],
        isActive: true,
      },
      {
        id: "15",
        fullName: "Can Yavaş",
        photoUrl:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
        tags: ["Fizik", "Matematik"],
        isActive: true,
      },
      {
        id: "16",
        fullName: "Deniz Mutlu",
        photoUrl:
          "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
        tags: ["Müzik", "Sanat"],
        isActive: true,
      },
      {
        id: "17",
        fullName: "Berk Koç",
        photoUrl:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
        tags: ["Geometri", "Fizik"],
        isActive: true,
      },
      {
        id: "18",
        fullName: "Naz Aktaş",
        photoUrl:
          "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg",
        tags: ["Edebiyat", "İngilizce"],
        isActive: true,
      },
      {
        id: "19",
        fullName: "Arda Bulut",
        photoUrl:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
        tags: ["Tarih", "Matematik"],
        isActive: true,
      },
      {
        id: "20",
        fullName: "İrem Tosun",
        photoUrl:
          "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
        tags: ["Biyoloji", "Sanat"],
        isActive: true,
      },
      {
        id: "21",
        fullName: "Kaan Erdoğan",
        photoUrl:
          "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
        tags: ["Kimya", "Coğrafya"],
        isActive: true,
      },
      {
        id: "22",
        fullName: "Lale Gündüz",
        photoUrl:
          "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg",
        tags: ["Müzik", "Edebiyat"],
        isActive: true,
      },
      {
        id: "23",
        fullName: "Rıza Özer",
        photoUrl:
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        tags: ["Fizik", "Geometri"],
        isActive: true,
      },
      {
        id: "24",
        fullName: "Mine Akın",
        photoUrl:
          "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
        tags: ["İngilizce", "Tarih"],
        isActive: true,
      },
      {
        id: "25",
        fullName: "Tolga Şen",
        photoUrl:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        tags: ["Matematik", "Biyoloji"],
        isActive: true,
      },
      {
        id: "26",
        fullName: "Pınar Yıldırım",
        photoUrl:
          "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
        tags: ["Sanat", "Kimya"],
        isActive: true,
      },
      {
        id: "27",
        fullName: "Serkan Bozkurt",
        photoUrl:
          "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
        tags: ["Coğrafya", "Müzik"],
        isActive: true,
      },
      {
        id: "28",
        fullName: "Cansu Güven",
        photoUrl:
          "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg",
        tags: ["Edebiyat", "Fizik"],
        isActive: true,
      },
      {
        id: "29",
        fullName: "Barış Tekin",
        photoUrl:
          "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg",
        tags: ["Matematik", "Tarih"],
        isActive: true,
      },
      {
        id: "30",
        fullName: "Gizem Aslan",
        photoUrl:
          "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
        tags: ["Biyoloji", "İngilizce"],
        isActive: true,
      },
      {
        id: "31",
        fullName: "Cem Yılmaz",
        photoUrl:
          "https://images.pexels.com/photos/2218208/pexels-photo-2218208.jpeg",
        tags: ["Fizik", "Matematik"],
        isActive: true,
      },
      {
        id: "32",
        fullName: "Seda Kaya",
        photoUrl:
          "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
        tags: ["Kimya", "Biyoloji"],
        isActive: true,
      },
      {
        id: "33",
        fullName: "Burak Özkan",
        photoUrl:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
        tags: ["Tarih", "Coğrafya"],
        isActive: true,
      },
      {
        id: "34",
        fullName: "Esra Demir",
        photoUrl:
          "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg",
        tags: ["Edebiyat", "Sanat"],
        isActive: true,
      },
      {
        id: "35",
        fullName: "Onur Çelik",
        photoUrl:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
        tags: ["İngilizce", "Müzik"],
        isActive: true,
      },
      {
        id: "36",
        fullName: "Merve Arslan",
        photoUrl:
          "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
        tags: ["Matematik", "Geometri"],
        isActive: true,
      },
      {
        id: "37",
        fullName: "Hakan Doğan",
        photoUrl:
          "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
        tags: ["Fizik", "Kimya"],
        isActive: true,
      },
      {
        id: "38",
        fullName: "Aylin Yıldız",
        photoUrl:
          "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
        tags: ["Biyoloji", "Tarih"],
        isActive: true,
      },
      {
        id: "39",
        fullName: "Volkan Güler",
        photoUrl:
          "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
        tags: ["Coğrafya", "Edebiyat"],
        isActive: true,
      },
      {
        id: "40",
        fullName: "Sibel Aydın",
        photoUrl:
          "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg",
        tags: ["Sanat", "İngilizce"],
        isActive: true,
      },
      {
        id: "41",
        fullName: "Taner Şahin",
        photoUrl:
          "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg",
        tags: ["Matematik", "Müzik"],
        isActive: true,
      },
      {
        id: "42",
        fullName: "Gamze Öztürk",
        photoUrl:
          "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg",
        tags: ["Fizik", "Sanat"],
        isActive: true,
      },
      {
        id: "43",
        fullName: "Erhan Polat",
        photoUrl:
          "https://images.pexels.com/photos/2218208/pexels-photo-2218208.jpeg",
        tags: ["Kimya", "Geometri"],
        isActive: true,
      },
      {
        id: "44",
        fullName: "Dilek Karaca",
        photoUrl:
          "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg",
        tags: ["Biyoloji", "Edebiyat"],
        isActive: true,
      },
      {
        id: "45",
        fullName: "Mert Yavaş",
        photoUrl:
          "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
        tags: ["Tarih", "İngilizce"],
        isActive: true,
      },
      {
        id: "46",
        fullName: "Özge Mutlu",
        photoUrl:
          "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
        tags: ["Coğrafya", "Müzik"],
        isActive: true,
      },
      {
        id: "47",
        fullName: "Koray Koç",
        photoUrl:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
        tags: ["Matematik", "Fizik"],
        isActive: true,
      },
      {
        id: "48",
        fullName: "Yeliz Aktaş",
        photoUrl:
          "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg",
        tags: ["Sanat", "Biyoloji"],
        isActive: true,
      },
      {
        id: "49",
        fullName: "Serdar Bulut",
        photoUrl:
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
        tags: ["Kimya", "Tarih"],
        isActive: true,
      },
      {
        id: "50",
        fullName: "Nilüfer Tosun",
        photoUrl:
          "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
        tags: ["Edebiyat", "Geometri"],
        isActive: true,
      },
    ];

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
                <div className="flex items-center space-x-4">
                  <LayoutSelector
                    selectedLayout={selectedClassroom?.layoutType || "Theater"}
                    onLayoutChange={(layout) => {
                      // Handle layout change
                    }}
                  />
                  <div className="text-sm text-gray-600">
                    {seats.filter((s) => s.studentId).length} / {seats.length}{" "}
                    koltuk dolu
                  </div>
                </div>

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
