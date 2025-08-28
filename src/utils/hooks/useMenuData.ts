import { MenuItem } from '@/@types/menu'
import isDisabled from '@/components/ui/DatePicker/tables/components/props/isDisabled'
import { getMenus, MenuService } from '@/services/menu.service'
import { useStoreActions } from '@/store/store'
import { useState, useEffect } from 'react'

export const useMenuData = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getConfig } = useStoreActions((a) => a.abpConfig)

  const buildHierarchy = (items: MenuItem[]): MenuItem[] => {
    const itemMap = new Map<string, MenuItem>()
    const rootItems: MenuItem[] = []

    // Create a map for quick lookup and initialize children arrays
    items.forEach((item) => {
      itemMap.set(item.code!!, { ...item, children: [] })
    })

    // Build the hierarchy
    items.forEach((item) => {
      const menuItem = itemMap.get(item.code!!)!

      if (item.parentCode && itemMap.has(item.parentCode)) {
        const parent = itemMap.get(item.parentCode)!
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(menuItem)
      } else {
        rootItems.push(menuItem)
      }
    })

    // Sort items by order recursively
    const sortItems = (items: MenuItem[]): MenuItem[] => {
      return items
        .sort((a, b) => a.order - b.order)
        .map((item) => ({
          ...item,
          children: item.children && item.children.length > 0 ? sortItems(item.children) : [],
        }))
    }

    return sortItems(rootItems)
  }

  const fetchMenuData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await getMenus()

      if (response.data) {
        const hierarchicalMenu = buildHierarchy(response.data.items || [])
        setMenuItems(hierarchicalMenu)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load menu data')
    } finally {
      setLoading(false)
    }
  }

  const saveMenuData = async (updatedMenuItems: MenuItem[]) => {
    const menuService = new MenuService()

    try {
      // Flatten the hierarchy for API
      const flatten = (
        items: MenuItem[],
        parentCode: string | undefined = undefined,
      ): MenuItem[] => {
        const result: MenuItem[] = []
        items.forEach((item, index) => {
          const flatItem = {
            ...item,
            parentCode,
            order: index + 1,
            children: undefined,
          }
          result.push(flatItem)

          if (item.children && item.children.length > 0) {
            result.push(...flatten(item.children, item.code))
          }
        })
        return result
      }
      const items = flatten(updatedMenuItems)
      await menuService.updateAll(items)
      getConfig(false)

      return { success: true }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to save menu data')
    }
  }

  useEffect(() => {
    fetchMenuData()
  }, [])

  return {
    menuItems,
    setMenuItems,
    loading,
    error,
    refetch: fetchMenuData,
    saveMenuData,
  }
}
