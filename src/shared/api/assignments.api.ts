/**
 * Assignment API endpoints
 */
import { apiClient } from './client';
import { AssignSingleDto, AssignBulkDto, AssignmentResult } from '@/shared/types/api.types';

export const assignmentsApi = {
  /**
   * Tekil koltuk atama
   */
  async assignSingle(classroomId: string, data: AssignSingleDto): Promise<AssignmentResult> {
    return apiClient.post<AssignmentResult>(`/classrooms/${classroomId}/assign-single`, data);
  },

  /**
   * Toplu koltuk atama
   */
  async assignBulk(classroomId: string, data: AssignBulkDto): Promise<AssignmentResult> {
    return apiClient.post<AssignmentResult>(`/classrooms/${classroomId}/assign-bulk`, data);
  },

  /**
   * Koltuk atamasını kaldır
   */
  async unassignSeat(classroomId: string, seatId: string): Promise<void> {
    return apiClient.post<void>(`/classrooms/${classroomId}/unassign`, { seatId });
  },

  /**
   * Tüm atamaları temizle
   */
  async clearAllAssignments(classroomId: string): Promise<void> {
    return apiClient.post<void>(`/classrooms/${classroomId}/clear-all`);
  },
};