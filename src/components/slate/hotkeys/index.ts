import { isHotkey } from 'is-hotkey'
import type { Editor } from 'slate'

import { useSlateStore } from '../store'
import { toggleMark } from '../utils'

export const HOTKEYS: Record<
  string,
  { action: (editor: Editor) => void; preventDefault?: boolean }
> = {
  'mod+b': {
    action: (editor) => toggleMark(editor, 'bold'),
    preventDefault: true
  },
  'mod+i': {
    action: (editor) => toggleMark(editor, 'italic'),
    preventDefault: true
  },
  'mod+u': {
    action: (editor) => toggleMark(editor, 'underline'),
    preventDefault: true
  },
  'mod+s': {
    action: (editor) => toggleMark(editor, 'strikeThrough'),
    preventDefault: true
  },
  '/': {
    action: () => {
      useSlateStore.setState({ blockMenuOpen: true })
    }
  }
}

export function handleHotkeysOnKeyDown(
  event: React.KeyboardEvent<HTMLDivElement>,
  editor: Editor
) {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event) && editor.selection) {
      const hot = HOTKEYS[hotkey]
      if (!hot) return
      if (hot.preventDefault) event.preventDefault()
      hot.action(editor)
    }
  }
}
