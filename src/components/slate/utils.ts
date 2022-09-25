import { nanoid } from 'nanoid'
import { Editor, Operation, Path } from 'slate'

import type { Format } from './types'

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
