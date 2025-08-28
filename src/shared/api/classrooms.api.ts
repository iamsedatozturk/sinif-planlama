/**
 * Classroom API endpoints
 */
import { apiClient } from './client';
import { Classroom, SeatMap, LayoutType } from '@/shared/types/api.types';

export interface CreateClassroomDto {
  name: string;
  layoutType: LayoutType;
  rows: number;
  columns: number;
  metadata?: Record<string, any>;
}

export interface UpdateClassroomDto {
  name?: string;
  layoutType?: LayoutType;
  rows?: number;
  columns?: number;
  metadata?: Record<string, any>;
}

export interface GenerateLayoutDto {
  layoutType: LayoutType;
  rows: number;
  columns: number;
  metadata?: Record<string, any>;
}

export const classroomsApi = {
  /**
   * Sınıf listesi getir
   */
  async getClassrooms(): Promise<Classroom[]> {
    return apiClient.get<Classroom[]>('/classrooms');
  },

  /**
   * Sınıf detayı getir
   */
  async getClassroom(id: string): Promise<Classroom> {
    return apiClient.get<Classroom>(`/classrooms/${id}`);
  },

  /**
   * Yeni sınıf oluştur
   */
  async createClassroom(data: CreateClassroomDto): Promise<Classroom> {
    return apiClient.post<Classroom>('/classrooms', data);
  },

  /**
   * Sınıf güncelle
   */
  async updateClassroom(id: string, data: UpdateClassroomDto): Promise<Classroom> {
    return apiClient.put<Classroom>(`/classrooms/${id}`, data);
  },

  /**
   * Sınıf sil
   */
  async deleteClassroom(id: string): Promise<void> {
    return apiClient.delete<void>(`/classrooms/${id}`);
  },

  /**
   * Koltuk dizilimi üret
   */
  async generateLayout(id: string, data: GenerateLayoutDto): Promise<any> {
    return apiClient.post<any>(`/classrooms/${id}/generate-layout`, data);
  },

  /**
   * Koltuk haritası getir
   */
  async getSeatMap(id: string): Promise<SeatMap> {
    return apiClient.get<SeatMap>(`/classrooms/${id}/seat-map`);
  },
};