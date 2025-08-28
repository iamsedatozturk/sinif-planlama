import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  FaPhone,
  FaEnvelope,
  FaRegCommentDots,
  FaUsers,
  FaUserTimes,
} from "react-icons/fa";

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

interface QuickActionsProps {
  selectedSeats: string[];
  seats: Seat[];
  students: Student[];
  onRemoveSelectedStudents: () => void;
  onToggleSeatBlock: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  selectedSeats,
  seats,
  students,
  onRemoveSelectedStudents,
}) => {
  const selectedStudents = selectedSeats
    .map((seatId) => {
      const seat = seats.find((s) => s.id === seatId);
      return seat?.studentId
        ? students.find((s) => s.id === seat.studentId)
        : null;
    })
    .filter(Boolean) as Student[];

  return (
    <div className="p-4 space-y-4">
      {/* Statistics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">İstatistikler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Toplam koltuk:</span>
            <span className="font-medium">{seats.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Dolu koltuk:</span>
            <span className="font-medium text-green-600">
              {seats.filter((s) => s.studentId).length}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Boş koltuk:</span>
            <span className="font-medium text-blue-600">
              {seats.filter((s) => !s.studentId && !s.isBlocked).length}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Bloke koltuk:</span>
            <span className="font-medium text-red-600">
              {seats.filter((s) => s.isBlocked).length}
            </span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex justify-between text-sm font-medium">
              <span>Doluluk oranı:</span>
              <span className="text-primary">
                {Math.round(
                  (seats.filter((s) => s.studentId).length / seats.length) * 100
                )}
                %
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selection Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Seçim Bilgisi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Seçili koltuk:</span>
            <span className="font-medium">{selectedSeats.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Dolu koltuk:</span>
            <span className="font-medium">{selectedStudents.length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Selected Students */}
      {selectedStudents.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center">
              <FaUsers className="h-4 w-4 mr-2" />
              Seçili Öğrenciler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedStudents.map((student) => (
              <div key={student.id} className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={student.photoUrl || undefined} />
                  <AvatarFallback className="text-xs">
                    {student.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {student.fullName}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {selectedStudents.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <FaPhone className="h-4 w-4 mr-2" />
                Toplu Arama
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <FaEnvelope className="h-4 w-4 mr-2" />
                E-posta Gönder
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <FaRegCommentDots className="h-4 w-4 mr-2" />
                SMS Gönder
              </Button>
            </>
          )}

          {selectedSeats.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={onRemoveSelectedStudents}
              >
                <FaUserTimes className="h-4 w-4 mr-2" />
                Atamaları Kaldır
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
