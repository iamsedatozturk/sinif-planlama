import { MenuContextConsumer } from './context/menuContext'
import { GroupContextConsumer } from './context/groupContext'
import { CollapseContextConsumer } from './context/collapseContext'
import BaseMenuItem from '../MenuItem'
import type { MenuItemProps as BaseMenuItemProps } from '../MenuItem'

export type MenuItemProps = BaseMenuItemProps

const MenuItem = (props: MenuItemProps) => {
  const { eventKey, icon, ...rest } = props

  return (
    <MenuContextConsumer>
      {(context) => (
        <GroupContextConsumer>
          {() => (
            <CollapseContextConsumer>
              {() => (
                <BaseMenuItem
                  menuItemHeight={context.menuItemHeight}
                  variant={context.variant}
                  isActive={(context.defaultActiveKeys as string[]).includes(eventKey as string)}
                  eventKey={eventKey}
                  icon={icon}
                  onSelect={context.onSelect}
                  {...rest}
                />
              )}
            </CollapseContextConsumer>
          )}
        </GroupContextConsumer>
      )}
    </MenuContextConsumer>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
