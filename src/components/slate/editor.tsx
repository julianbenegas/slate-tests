import clsx from 'clsx'
import * as React from 'react'
import { Bold, Italic, Underline } from 'react-feather'
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor as SlateEditor,
  Range,
  Text,
  Transforms
} from 'slate'
import { HistoryEditor, withHistory } from 'slate-history'
import {
  Editable,
  ReactEditor,
  RenderLeafProps,
  Slate,
  useFocused,
  useSlate,
  withReact
} from 'slate-react'

import { Portal } from '../primitives/portal'

type TSlateEditor = BaseEditor & ReactEditor & HistoryEditor

export const Editor = () => {
  const editor: TSlateEditor = React.useMemo(
    () => withHistory(withReact(createEditor())),
    []
  )

  const handleOnDOMBeforeInput = React.useCallback(
    (event: InputEvent) => {
      switch (event.inputType) {
        case 'formatBold':
          event.preventDefault()
          return toggleFormat(editor, 'bold')
        case 'formatItalic':
          event.preventDefault()
          return toggleFormat(editor, 'italic')
        case 'formatUnderline':
          event.preventDefault()
          return toggleFormat(editor, 'underlined')
      }
    },
    [editor]
  )

  return (
    <>
      <h1>My Document</h1>
      <Slate editor={editor} value={initialValue}>
        <HoveringToolbar />
        <Editable
          renderLeaf={Leaf}
          placeholder="Enter some text..."
          onDOMBeforeInput={handleOnDOMBeforeInput}
        />
      </Slate>
    </>
  )
}

const toggleFormat = (editor: BaseEditor, format: string) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
}

const isFormatActive = (editor: BaseEditor, format: string) => {
  const [match] = SlateEditor.nodes(editor, {
    // @ts-ignore
    match: (n) => n[format] === true,
    mode: 'all'
  })
  return !!match
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  // @ts-ignore
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  // @ts-ignore
  if (leaf.italic) {
    children = <em>{children}</em>
  }

  // @ts-ignore
  if (leaf.underlined) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const HoveringToolbar = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const editor = useSlate()
  const inFocus = useFocused()

  React.useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      SlateEditor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    if (!domSelection) return
    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`

    return () => {
      el.removeAttribute('style')
    }
  })

  return (
    <Portal id="editor-toolbar" className="relative">
      <div
        className="absolute z-10 bg-gray-900 -top-full -left-full -mt-2 opacity-0 border border-gray-500 shadow-md rounded transition-all"
        ref={ref}
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault()
        }}
      >
        <FormatButton format="bold" />
        <FormatButton format="italic" />
        <FormatButton format="underlined" />
      </div>
    </Portal>
  )
}

const FormatButton = ({ format }: { format: string }) => {
  const editor = useSlate()
  const isActive = isFormatActive(editor, format)
  const icon = React.useMemo(() => {
    return {
      bold: <Bold />,
      italic: <Italic />,
      underlined: <Underline />
    }[format]
  }, [format])

  return (
    <button
      className={clsx(isActive && 'bg-gray-700 color-gray-50')}
      onClick={() => toggleFormat(editor, format)}
    >
      <span>{icon}</span>
    </button>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'This example shows how you can make a hovering menu appear above your content, which you can use to make text '
      },
      // @ts-ignore
      { text: 'bold', bold: true },
      { text: ', ' },
      // @ts-ignore
      { text: 'italic', italic: true },
      { text: ', or anything else you might want to do!' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Try it out yourself! Just ' },
      // @ts-ignore
      { text: 'select any piece of text and the menu will appear', bold: true },
      { text: '.' }
    ]
  }
]
