import { forwardRef } from 'react'
import { FaTimes, FaWindowMaximize, FaWindowRestore } from 'react-icons/fa'
import classNames from 'classnames'
import type { CommonProps } from '../@types/common'
import type { MouseEvent } from 'react'

export interface WindowControlsProps extends CommonProps {
  absolute?: boolean
  defaultStyle?: boolean
  isMaximized?: boolean
  onClose?: (e: MouseEvent<HTMLSpanElement>) => void
  onMaximize?: (e: MouseEvent<HTMLSpanElement>) => void
  onRestore?: (e: MouseEvent<HTMLSpanElement>) => void
  showMaximize?: boolean
  showRestore?: boolean
  showClose?: boolean
}

const WindowControls = forwardRef<HTMLDivElement, WindowControlsProps>((props, ref) => {
  const {
    absolute,
    className,
    defaultStyle,
    isMaximized,
    onClose,
    onMaximize,
    onRestore,
    showMaximize = true,
    showRestore = true,
    showClose = true,
    ...rest
  } = props

  const windowControlsAbsoluteClass = 'absolute z-10'

  const windowControlsClass = classNames(
    'window-controls flex items-center gap-2',
    defaultStyle && 'window-controls-default',
    absolute && windowControlsAbsoluteClass,
    className
  )

  const buttonClass = 'close-btn cursor-pointer hover:opacity-70 transition-opacity'

  return (
    <div className={windowControlsClass} {...rest} ref={ref}>
      {showMaximize && !isMaximized && (
        <span className={buttonClass} role="button" onClick={onMaximize} title="Maximize">
          <FaWindowMaximize />
        </span>
      )}
      {showRestore && isMaximized && (
        <span className={buttonClass} role="button" onClick={onRestore} title="Restore">
          <FaWindowRestore />
        </span>
      )}
      {showClose && (
        <span className={buttonClass} role="button" onClick={onClose} title="Close">
          <FaTimes />
        </span>
      )}
    </div>
  )
})

WindowControls.displayName = 'WindowControls'

export default WindowControls
