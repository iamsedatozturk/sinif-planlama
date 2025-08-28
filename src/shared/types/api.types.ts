/**
 * API type definitions
 */

// Common types
export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  success: false;
  timestamp: string;
  path?: string;
}

// Student types
export interface Student {
  id: string;
  fullName: string;
  photoUrl: string | null;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStudentDto {
  fullName: string;
  photoUrl?: string;
  tags?: string[];
  isActive?: boolean;
}

export interface UpdateStudentDto {
  id: string;
  fullName?: string;
  photoUrl?: string;
  tags?: string[];
  isActive?: boolean;
}

export interface StudentQuery {
  q?: string;
  tags?: string[];
  page?: number;
  size?: number;
  isActive?: boolean;
}

// Classroom types
export type LayoutType = 'Theater' | 'Bus' | 'UShape' | 'Grid' | 'Lab' | 'Exam' | 'Circle';
export type SeatType = 'Standard' | 'Table' | 'Wheelchair';
export type AssignmentStrategy = 'FillByOrder' | 'MatchByIndex';

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  layoutType: LayoutType;
  rows: number;
  columns: number;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Seat {
  id: string;
  classroomId: string;
  row: number;
  col: number;
  label: string;
  isBlocked: boolean;
  seatType: SeatType;
  concurrencyStamp: string;
  createdAt: string;
  updatedAt: string;
}

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