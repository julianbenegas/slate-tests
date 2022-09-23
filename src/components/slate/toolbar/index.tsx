import {
  FontBoldIcon,
  FontItalicIcon,
  StrikethroughIcon,
  UnderlineIcon
} from '@radix-ui/react-icons'
import * as ToolbarPrimitive from '@radix-ui/react-toolbar'
import clsx from 'clsx'
import * as React from 'react'
import { Editor, Range } from 'slate'
import { useSlate } from 'slate-react'

import { Portal } from '~/components/primitives/portal'
import Tooltip from '~/components/primitives/tooltip'

import type { Format } from '../types'
import { toggleMark } from '../utils'

const formattingOptions: {
  title: string
  value: Format
  children: React.ReactNode
}[] = [
  {
    title: 'Toggle Bold',
    value: 'bold',
    children: <FontBoldIcon />
  },
  {
    title: 'Toggle Italic',
    value: 'italic',
    children: <FontItalicIcon />
  },
  {
    title: 'Toggle Underline',
    value: 'underline',
    children: <UnderlineIcon />
  },
  {
    title: 'Toggle Strikethrough',
    value: 'strikeThrough',
    children: <StrikethroughIcon />
  }
]

export function Toolbar() {
  const ref = React.useRef<HTMLDivElement>(null)
  const editor = useSlate()

  React.useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    if (domSelection == null || domSelection.rangeCount === 0) {
      return
    }

    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()

    el.style.position = 'absolute'
    el.style.opacity = '1'
    el.style.top = `${rect.top + window.scrollY}px`
    el.style.left = `${rect.left + window.scrollX}px`
  })

  const marks = Editor.marks(editor)

  return (
    <Portal id="toolbar-portal">
      <ToolbarPrimitive.Root
        ref={ref}
        className="opacity-0 absolute space-x-1 -translate-y-12 bg-dark-gray12/70 backdrop-blur-sm p-1 rounded-md shadow-lg"
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault()
        }}
      >
        {formattingOptions.map((option) => {
          const isActive = marks?.[option.value] === true
          return (
            <Tooltip content={option.title} key={option.value}>
              <ToolbarPrimitive.Button
                value={option.value}
                aria-label={option.title}
                onPointerDown={(e) => e.preventDefault()}
                className={clsx(
                  isActive && 'bg-dark-gray9',
                  'p-2 cursor-default rounded-md text-dark-gray1'
                )}
                onClick={(e) => {
                  toggleMark(editor, option.value)
                  e.stopPropagation()
                }}
              >
                {option.children}
              </ToolbarPrimitive.Button>
            </Tooltip>
          )
        })}
      </ToolbarPrimitive.Root>
    </Portal>
  )
}
