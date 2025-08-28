import { FaCheckCircle, FaInfoCircle, FaExclamation, FaTimesCircle } from 'react-icons/fa';
import type { TypeAttributes, CommonProps } from '../@types/common'
import type { ReactNode } from 'react'

export interface StatusIconProps extends CommonProps {
    type: TypeAttributes.Status
    custom?: ReactNode | JSX.Element
    iconColor?: string
}

const ICONS: Record<
    TypeAttributes.Status,
    {
        color: string
        icon: JSX.Element
    }
> = {
    success: {
        color: 'text-emerald-400',
        icon: <FaCheckCircle />,
    },
    info: {
        color: 'text-blue-400',
        icon: <FaInfoCircle />,
    },
    warning: {
        color: 'text-yellow-400',
        icon: <FaExclamation />,
    },
    danger: {
        color: 'text-red-400',
        icon: <FaTimesCircle />,
    },
}

const StatusIcon = (props: StatusIconProps) => {
    const { type = 'info', custom, iconColor } = props

    const icon = ICONS[type]

    return (
        <span className={`text-2xl ${iconColor || icon.color}`}>
            {custom || icon.icon}
        </span>
    )
}

export default StatusIcon
