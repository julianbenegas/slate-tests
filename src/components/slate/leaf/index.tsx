import type { RenderLeafProps } from 'slate-react'

export const RenderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikeThrough) {
    children = <del>{children}</del>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.placeholder) {
    return (
      <>
        <span
          className="absolute text-dark-gray9 select-none pointer-events-none z[-1]"
          contentEditable={false}
        >
          {leaf.placeholder}
        </span>
        <span {...attributes}>{children}</span>
      </>
    )
  }

  return <span {...attributes}>{children}</span>
}
