import Modal from 'react-modal'
import classNames from 'classnames'
import CloseButton from '../CloseButton'
import WindowControls from '../WindowControls'
import { motion } from 'framer-motion'
import { SCREENS } from '@/utils/tailwind'
import useWindowSize from '../hooks/useWindowSize'
import { useState, useCallback } from 'react'
import type ReactModal from 'react-modal'
import type { MouseEvent } from 'react'
import { Container } from '@/components/shared'

export interface DialogProps extends ReactModal.Props {
  closable?: boolean
  contentClassName?: string
  height?: string | number
  onClose?: (e: MouseEvent<HTMLSpanElement>) => void
  width?: string | number
  showWindowControls?: boolean
  onMaximize?: () => void
  onRestore?: () => void
}

const Dialog = (props: DialogProps) => {
  const currentSize = useWindowSize()
  const [isMaximized, setIsMaximized] = useState(false)
  const [originalDimensions, setOriginalDimensions] = useState<{
    width?: string | number
    height?: string | number
  }>({})

  const {
    bodyOpenClassName,
    htmlOpenClassName,
    children,
    className,
    closable = true,
    closeTimeoutMS = 150,
    contentClassName,
    height,
    isOpen,
    onClose,
    overlayClassName,
    portalClassName,
    style,
    width = 520,
    showWindowControls = true,
    onMaximize,
    onRestore,
    ...rest
  } = props

  const onCloseClick = (e: MouseEvent<HTMLSpanElement>) => {
    onClose?.(e)
  }

  const handleMaximize = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      if (!isMaximized) {
        setOriginalDimensions({ width, height })
        setIsMaximized(true)
        onMaximize?.()
      }
    },
    [isMaximized, width, height, onMaximize],
  )

  const handleRestore = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      if (isMaximized) {
        setIsMaximized(false)
        onRestore?.()
      }
    },
    [isMaximized, onRestore],
  )

  const renderCloseButton = (
    <CloseButton absolute className="ltr:right-6 rtl:left-6" onClick={onCloseClick} />
  )

  const renderWindowControls = (
    <WindowControls
      absolute
      className="ltr:right-6 rtl:left-6"
      isMaximized={isMaximized}
      onClose={onCloseClick}
      onMaximize={handleMaximize}
      onRestore={handleRestore}
    />
  )

  const contentStyle: any = {
    content: {
      inset: 'unset',
    },
    overlay: {},
    ...style,
  }

  // Set dimensions based on maximized state
  const currentWidth = isMaximized ? '100vw' : width
  const currentHeight = isMaximized ? '100vh' : height

  if (isMaximized) {
    // Reset all positioning for fullscreen
    contentStyle.content = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      width: '100vw',
      height: '100vh',
      margin: '0px',
      padding: '0px',
      border: 'none',
      borderRadius: '0px',
      inset: '0px',
      transform: 'none',
      WebkitTransform: 'none',
    }
    contentStyle.overlay = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 1000,
    }
  } else {
    if (currentWidth !== undefined) {
      contentStyle.content.width = currentWidth

      if (typeof currentSize.width !== 'undefined' && currentSize.width <= SCREENS.sm) {
        contentStyle.content.width = 'auto'
      }
    }
    if (currentHeight !== undefined) {
      contentStyle.content.height = currentHeight
    }
  }

  const defaultDialogContentClass = 'dialog-content'

  const dialogClass = classNames(
    defaultDialogContentClass,
    isMaximized && 'maximized',
    contentClassName,
  )

  return (
    <Modal
      className={{
        base: classNames('dialog', className as string, isMaximized && 'maximized'),
        afterOpen: 'dialog-after-open',
        beforeClose: 'dialog-before-close',
      }}
      overlayClassName={{
        base: classNames('dialog-overlay', overlayClassName as string),
        afterOpen: 'dialog-overlay-after-open',
        beforeClose: 'dialog-overlay-before-close',
      }}
      portalClassName={classNames('dialog-portal', portalClassName)}
      bodyOpenClassName={classNames('dialog-open', bodyOpenClassName)}
      htmlOpenClassName={classNames('dialog-open', htmlOpenClassName)}
      ariaHideApp={false}
      isOpen={isOpen}
      style={{ ...contentStyle }}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      <motion.div
        className={dialogClass}
        initial={{ transform: isMaximized ? 'scale(1)' : 'scale(0.9)' }}
        animate={{
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
        }}
        style={{
          width: isMaximized ? '100vw' : 'auto',
          height: isMaximized ? '100vh' : 'auto',
        }}
      >
        {closable && !showWindowControls && renderCloseButton}
        {closable && showWindowControls && renderWindowControls}
        {children}
      </motion.div>
    </Modal>
  )
}

Dialog.displayName = 'Dialog'

export default Dialog
