import { NavigationTree } from '@/@types/navigation'
import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_TITLE,
} from '@/constants/navigation.constant'
import { MenuDto } from '@/proxy/menus/models'

export default function getChildren(menu: MenuDto[], parentCode: string | null): NavigationTree[] {
  const menus: NavigationTree[] = []
  for (const child of menu.filter((a) => a.parentCode === parentCode)) {
    const item: NavigationTree = {
      key: child.url?.length ? child.url : child.code ?? '',
      path: child.url ?? '',
      title: child.displayName ?? '',
      icon: child.icon ?? '',
      type: NAV_ITEM_TYPE_TITLE,
      translateKey: child.displayName ?? '',
      authority: [child.requiredPermissionName ?? ''],
      subMenu: [],
    }

    if (child.code) {
      const subMenu = getChildren(menu, child.code)
      if (subMenu.length) {
        item.subMenu = subMenu
        item.type = child.parentCode ? NAV_ITEM_TYPE_COLLAPSE : NAV_ITEM_TYPE_TITLE
      } else {
        item.type = NAV_ITEM_TYPE_ITEM
      }

      //Eğer submenu veya path varsa menude gösterilmeli.
      //Yani submenüde biri gösterilecekse ana menüsü gösterilmeli
      if (item.subMenu.length > 0 || item.path !== '') {
        menus.push(item)
      }
    }
  }

  return menus
}
