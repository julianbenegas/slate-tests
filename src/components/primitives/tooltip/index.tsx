import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import type { ComponentProps, ReactElement, ReactNode } from 'react'

type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root> &
  ComponentProps<typeof TooltipPrimitive.Content> & {
    children: ReactElement
    content: ReactNode
  }

export default function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  side = 'top',
  align = 'center',
  delayDuration,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={
            'max-w-[220px] px-1 py-1 text-xs rounded-md bg-dark-gray12/80 text-dark-gray1 backdrop-blur-sm'
          }
          side={side}
          align={align}
          sideOffset={4}
          {...props}
        >
          {content}

          <TooltipPrimitive.Arrow
            offset={8}
            width={11}
            height={5}
            style={{ fill: 'currentcolor' }}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
