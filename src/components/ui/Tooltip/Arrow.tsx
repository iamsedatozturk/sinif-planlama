import classNames from 'classnames'
import {
    FaCaretDown,
    FaCaretLeft,
    FaCaretUp,
    FaCaretRight,
} from 'react-icons/fa';

export type ArrowPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end'

interface ArrowProps {
    placement: ArrowPlacement
    colorDark: string
    color: string
}

const Arrow = ({ placement, color, colorDark }: ArrowProps) => {
    const arrowDefaultClass = `absolute text-${color} dark:text-${colorDark}`

    const getArrow = () => {
        switch (placement) {
            case 'top':
                return (
                    <FaCaretDown
                        className={classNames(
                            arrowDefaultClass,
                            '-bottom-2 w-full left-0'
                        )}
                    />
                )
            case 'top-start':
                return (
                    <FaCaretDown
                        className={classNames(
                            arrowDefaultClass,
                            '-bottom-2 left-0 ml-3'
                        )}
                    />
                )
            case 'top-end':
                return (
                    <FaCaretDown
                        className={classNames(
                            arrowDefaultClass,
                            '-bottom-2 right-0 mr-3'
                        )}
                    />
                )
            case 'right':
                return (
                    <FaCaretLeft
                        className={classNames(
                            arrowDefaultClass,
                            '-left-2 top-1/2 transform -translate-y-1/2'
                        )}
                    />
                )
            case 'right-start':
                return (
                    <FaCaretLeft
                        className={classNames(
                            arrowDefaultClass,
                            '-left-2 top-2'
                        )}
                    />
                )
            case 'right-end':
                return (
                    <FaCaretLeft
                        className={classNames(
                            arrowDefaultClass,
                            '-left-2 bottom-2'
                        )}
                    />
                )
            case 'bottom':
                return (
                    <FaCaretUp
                        className={classNames(
                            arrowDefaultClass,
                            '-top-2 w-full left-0'
                        )}
                    />
                )
            case 'bottom-start':
                return (
                    <FaCaretUp
                        className={classNames(
                            arrowDefaultClass,
                            '-top-2 left-0 ml-3'
                        )}
                    />
                )
            case 'bottom-end':
                return (
                    <FaCaretUp
                        className={classNames(
                            arrowDefaultClass,
                            '-top-2 right-0 mr-3'
                        )}
                    />
                )
            case 'left':
                return (
                    <FaCaretRight
                        className={classNames(
                            arrowDefaultClass,
                            '-right-2 top-1/2 transform -translate-y-1/2'
                        )}
                    />
                )
            case 'left-start':
                return (
                    <FaCaretRight
                        className={classNames(
                            arrowDefaultClass,
                            '-right-2 top-2'
                        )}
                    />
                )
            case 'left-end':
                return (
                    <FaCaretRight
                        className={classNames(
                            arrowDefaultClass,
                            '-right-2 bottom-2'
                        )}
                    />
                )
            default:
                break
        }
    }

    return <div>{getArrow()}</div>
}

export default Arrow
