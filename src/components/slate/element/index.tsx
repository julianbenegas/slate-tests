import type { RenderElementProps } from 'slate-react'

import Block from './block'

export const RenderElement = (props: RenderElementProps) => {
  return <Block {...props} />
}
