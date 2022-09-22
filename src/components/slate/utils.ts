import { nanoid } from 'nanoid'
import {
  Editor,
  Element,
  Operation,
  Path,
  Point,
  Range,
  Transforms
} from 'slate'

import { BlockType, CustomElement, Format } from './types'

export const makeNodeId = () => nanoid(16)

export const withNodeId = (editor: Editor) => {
  const { apply } = editor

  editor.apply = (operation: Operation) => {
    if (operation.type === 'insert_node' && operation.path.length === 1) {
      return apply(operation)
    }

    if (operation.type === 'split_node' && operation.path.length === 1) {
      ;(operation.properties as any).id = makeNodeId()
      return apply(operation)
    }

    return apply(operation)
  }

  return editor
}

const SHORTCUTS: Record<string, BlockType> = {
  '*': BlockType.BulletedList,
  '-': BlockType.BulletedList,
  '+': BlockType.BulletedList,
  '#': BlockType.H1,
  '##': BlockType.H2,
  '###': BlockType.H3,
  '[]': BlockType.ToDo
}

export const withShortcuts = (editor: Editor) => {
  const { deleteBackward, insertText } = editor

  editor.insertText = (text) => {
    const { selection } = editor

    if (text.endsWith(' ') && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n)
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range) + text.slice(0, -1)
      const type = SHORTCUTS[beforeText]

      if (type) {
        Transforms.select(editor, range)

        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor)
        }

        const newProperties: Partial<CustomElement> = {
          type
        }
        Transforms.setNodes<CustomElement>(editor, newProperties, {
          match: (n) => Editor.isBlock(editor, n)
        })

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args: unknown[]) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n)
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          !Editor.isEditor(block) &&
          Element.isElement(block) &&
          block.type !== BlockType.Paragraph &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<CustomElement> = {
            type: BlockType.Paragraph
          }
          Transforms.setNodes(editor, newProperties)

          return
        }
      }

      // @ts-ignore
      deleteBackward(...args)
    }
  }

  return editor
}

export function toggleMark(editor: Editor, format: Format) {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    removeMark(editor, format)
  } else {
    addMark(editor, format)
  }
}

export function removeMark(editor: Editor, format: Format) {
  Editor.removeMark(editor, format)
}

export function addMark(editor: Editor, format: Format) {
  Editor.addMark(editor, format, true)
}

export function isMarkActive(editor: Editor, format: Format) {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export function topLevelPath(path: Path): Path {
  return [path[0] ?? 0]
}

type CursorType = 'grab' | 'grabbing'

export function setGlobalCursor(type: CursorType) {
  document.body.classList.add(type)
}

export function removeGlobalCursor(type: CursorType) {
  document.body.classList.remove(type)
}
