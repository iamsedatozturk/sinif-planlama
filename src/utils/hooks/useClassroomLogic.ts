import { ClassroomDto, Role, RoleState } from '@/proxy/classroom/models'
import { useStoreActions, useStoreState } from '@/store/store'
import { useState } from 'react'

export function useClassroomLogic() {
  const { user } = useStoreState((state) => state.auth)
  const { setUser } = useStoreActions((actions) => actions.auth.user)

  const [roleState, setRoleState] = useState<RoleState>('role-selection')
  const [currentClass, setCurrentClass] = useState<ClassroomDto | null>(null)
  const [allClasses, setAllClasses] = useState<ClassroomDto[]>([])

  const handleRoleSelect = (role: Role) => {
    setUser({
      ...user,
      role,
    })
    setRoleState('dashboard')
  }

  const handleCreateClass = (classData: Partial<ClassroomDto>) => {
    const newClass = {
      ...classData,
      id: `class-${Date.now()}`,
      teacherId: '',
      teacherName: '',
      isActive: false,
      isScheduled: true,
      participantCount: 0,
    } as ClassroomDto
    setAllClasses((prev) => [...prev, newClass])
  }

  const handleEditClass = (classId: string, classData: Partial<ClassroomDto>) => {
    setAllClasses((prev) => prev.map((c) => (c.id === classId ? { ...c, ...classData } : c)))
  }

  const handleDeleteClass = (classId: string) => {
    setAllClasses((prev) => prev.filter((c) => c.id !== classId))
  }

  return {
    roleState,
    setRoleState,
    currentClass,
    setCurrentClass,
    allClasses,
    setAllClasses,
    handleRoleSelect,
    handleCreateClass,
    handleEditClass,
    handleDeleteClass,
  }
}
