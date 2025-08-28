import { useStoreState } from '@/store'

const usePermission = () => {
  const grantedPolicies = useStoreState((state) => state.abpConfig?.config?.auth.grantedPolicies)

  const checkPermissions = (permissionsToCheck: string[] = []) => {
    return permissionsToCheck?.length
      ? grantedPolicies
        ? permissionsToCheck.every((p) => p === '' || grantedPolicies[p] === true)
        : false
      : true
  }

  const checkPermission = (permissionToCheck?: string) => {
    if (!permissionToCheck) {
      return true
    }

    if (!grantedPolicies) {
      return false
    }

    return grantedPolicies[permissionToCheck] === true
  }

  return {
    checkPermission,
    checkPermissions,
  }
}

export { usePermission }
