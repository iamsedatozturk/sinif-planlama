export interface Student {
  id: string;
  fullName: string;
  photoUrl: string | null;
  tags: string[];
  isActive: boolean;
  creationTime: string;
  lastModificationTime: string;
}

export interface SeatGridProps {
  classroom: Classroom;
  seats: Seat[];
  students: Student[];
  selectedSeats: string[];
  onSeatSelect: (seatIds: string[]) => void;
  onRemoveStudent: (seatId: string) => void;
}

export interface StudentListProps {
  students: Student[];
  searchQuery: string;
  selectedTags: string[];
}

export interface Seat {
  id: string;
  row: number;
  col: number;
  label: string;
  isBlocked: boolean;
  studentId?: string;
  seatType: SeatType;
  concurrencyStamp: string;
  creationTime: string;
  lastModificationTime: string;
}

export interface Classroom {
  id: string;
  name: string;
  layoutType: string;
  rows: number;
  columns: number;
  capacity: number;
  creationTime: string;
  lastModificationTime: string;
}

export interface StudentQuery {
  q?: string;
  tags?: string[];
  page?: number;
  size?: number;
  isActive?: boolean;
}

// Classroom types
export type LayoutType =
  | "Theater"
  | "Bus"
  | "UShape"
  | "Grid"
  | "Lab"
  | "Exam"
  | "Circle";
export type SeatType = "Standard" | "Table" | "Wheelchair";
export type AssignmentStrategy = "FillByOrder" | "MatchByIndex";

export interface SeatAssignment {
  id: string;
  classroomId: string;
  seatId: string;
  studentId: string;
  assignedAt: string;
  assignedBy: string;
}

export interface SeatMap {
  classroom: Classroom;
  seats: Seat[];
  assignments: SeatAssignment[];
}

// Assignment operations
export interface AssignSingleDto {
  seatId: string;
  studentId: string;
}

export interface AssignBulkDto {
  seatIds: string[];
  studentIds: string[];
  strategy: AssignmentStrategy;
}

export interface AssignmentResult {
  success: boolean;
  assignedCount: number;
  errors?: string[];
}

// Real-time events
export interface SseEvent {
  id: string;
  event: string;
  data: any;
  timestamp: string;
}

export interface SeatAssignedEvent {
  classroomId: string;
  seatId: string;
  studentId: string;
  ts: string;
  id: string;
}

export interface SeatUnassignedEvent {
  classroomId: string;
  seatId: string;
  ts: string;
  id: string;
}

export interface LayoutChangedEvent {
  classroomId: string;
  ts: string;
  id: string;
}
