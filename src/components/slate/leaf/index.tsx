import type { RenderLeafProps } from 'slate-react'

export const RenderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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
