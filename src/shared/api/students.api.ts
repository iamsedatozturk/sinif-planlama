/**
 * Student API endpoints
 */
import { apiClient } from './client';
import { Student, CreateStudentDto, UpdateStudentDto, StudentQuery, PaginatedResult } from '@/shared/types/api.types';

export const studentsApi = {
  /**
   * Filtreli öğrenci listesi getir
   */
  async getStudents(query: StudentQuery = {}): Promise<PaginatedResult<Student>> {
    const params = new URLSearchParams();
    
    if (query.q) params.append('q', query.q);
    if (query.tags?.length) params.append('tags', query.tags.join(','));
    if (query.page) params.append('page', query.page.toString());
    if (query.size) params.append('size', query.size.toString());
    if (query.isActive !== undefined) params.append('isActive', query.isActive.toString());

    const queryString = params.toString();
    const endpoint = queryString ? `/students?${queryString}` : '/students';
    
    return apiClient.get<PaginatedResult<Student>>(endpoint);
  },

  /**
   * Öğrenci detayı getir
   */
  async getStudent(id: string): Promise<Student> {
    return apiClient.get<Student>(`/students/${id}`);
  },

  /**
   * Yeni öğrenci oluştur
   */
  async createStudent(data: CreateStudentDto): Promise<Student> {
    return apiClient.post<Student>('/students', data);
  },

  /**
   * Öğrenci güncelle
   */
  async updateStudent(id: string, data: Partial<UpdateStudentDto>): Promise<Student> {
    return apiClient.put<Student>(`/students/${id}`, data);
  },

  /**
   * Öğrenci sil
   */
  async deleteStudent(id: string): Promise<void> {
    return apiClient.delete<void>(`/students/${id}`);
  },

  /**
   * CSV import
   */
  async importFromCsv(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.postFormData<any>('/students/import', formData);
  },

  /**
   * CSV export
   */
  async exportToCsv(): Promise<string> {
    const response = await fetch('/api/students/export');
    return response.text();
  },

  /**
   * Örnek CSV dosyası URL'i
   */
  getSampleCsvUrl(): string {
    return `data:text/csv;charset=utf-8,${encodeURIComponent(
      'Id,FullName,PhotoUrl,Tags\n' +
      ',"Ahmet Yılmaz","https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg","Matematik,Fizik"\n' +
      ',"Ayşe Demir","https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg","Edebiyat,Tarih"\n'
    )}`;
  }
};