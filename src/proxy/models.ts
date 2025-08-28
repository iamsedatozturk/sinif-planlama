interface Student {
  id: string;
  fullName: string;
  photoUrl: string | null;
  tags: string[];
  isActive: boolean;
}

interface StudentListProps {
  students: Student[];
  searchQuery: string;
  selectedTags: string[];
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

interface Classroom {
  id: string;
  name: string;
  layoutType: string;
  rows: number;
  columns: number;
  capacity: number;
}
