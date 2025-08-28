import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import {
  FaPhone,
  FaEnvelope,
  FaRegCommentDots,
  FaUsers,
  FaUserTimes,
} from "react-icons/fa";
import { Seat, Student } from "@/proxy/models";

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
      <Card
        bodyClass="md:p-3"
        header={<h3 className="text-sm">İstatistikler</h3>}
        headerClass="p-2"
      >
        <body className="space-y-2">
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
        </body>
      </Card>

      {/* Selection Info */}
      <Card
        bodyClass="md:p-3"
        header={
          <h3 className="text-sm">
            Seçilen Koltuk ({selectedStudents.length})
          </h3>
        }
        headerClass="p-2"
      >
        <body className="space-y-2">
          {/* Quick Actions */}
          {selectedStudents.length > 0 && (
            <Card bodyClass="md:p-3">
              <body className="flex gap-2 justify-center">
                {selectedStudents.length > 0 && (
                  <>
                    <Button
                      title="Toplu Arama"
                      variant="default"
                      size="sm"
                      className="flex flex-row rounded-full justify-center items-center"
                    >
                      <FaPhone />
                    </Button>
                    <Button
                      title="E-posta Gönder"
                      variant="default"
                      size="sm"
                      className="flex flex-row rounded-full justify-center items-center"
                    >
                      <FaEnvelope />
                    </Button>
                    <Button
                      title="SMS Gönder"
                      variant="default"
                      size="sm"
                      className="flex flex-row rounded-full justify-center items-center"
                    >
                      <FaRegCommentDots />
                    </Button>
                  </>
                )}

                {selectedSeats.length > 0 && (
                  <>
                    <Button
                      title="Atamaları Kaldır"
                      variant="default"
                      size="sm"
                      className="flex flex-row rounded-full justify-center items-center"
                      onClick={onRemoveSelectedStudents}
                    >
                      <FaUserTimes />
                    </Button>
                  </>
                )}
              </body>
            </Card>
          )}
          
          {/* Selected Students */}
          {selectedStudents.length > 0 && (
            <Card bodyClass="md:p-3">
              <body className="space-y-3">
                {selectedStudents.map((student) => (
                  <div key={student.id} className="flex items-center space-x-3">
                    <Avatar
                      className="h-8 w-8"
                      shape="circle"
                      src={student.photoUrl || undefined}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {student.fullName}
                      </div>
                    </div>
                  </div>
                ))}
              </body>
            </Card>
          )}
        </body>
      </Card>
    </div>
  );
};
