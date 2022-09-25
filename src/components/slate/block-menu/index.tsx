import clsx from 'clsx'
import * as React from 'react'
import { usePopper } from 'react-popper'

import { Portal } from '~/components/primitives/portal'

import { useSlateStore } from '../store'

export const BlockMenu = () => {
  const blockMenuOpen = useSlateStore((state) => state.blockMenuOpen)
  // const editor = useSlate()
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLSpanElement | null>(null)
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = React.useState<HTMLDivElement | null>(
    null
  )
  const { styles, attributes, forceUpdate } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'bottom-start',
      modifiers: [{ name: 'arrow', options: { element: arrowElement } }]
    }
  )

  React.useEffect(() => {
    if (!blockMenuOpen) return

    const el = referenceElement

    if (!el) return

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
    forceUpdate?.()

    return () => {
      el.removeAttribute('style')
    }
  }, [referenceElement, blockMenuOpen, forceUpdate])

  React.useEffect(() => {
    if (blockMenuOpen) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          useSlateStore.setState({ blockMenuOpen: false })
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [blockMenuOpen])

  return (
    <Portal id="block-menu-portal">
      <span
        ref={setReferenceElement}
        className="pointer-events-none invisible select-none"
        aria-hidden
      />
      <div
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={clsx(
          'bg-dark-gray1 border border-dark-gray4 rounded-lg p-4 min-w-[225px] transition-opacity mt-6',
          blockMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        )}
      >
        <div ref={setArrowElement} style={styles.arrow} />
        <label>Text</label>
        <div>H1</div>
        <div>H2</div>
        <div>H3</div>
      </div>
    </Portal>
  )
}
