import type { ListElement } from '~/components/slate/types'

export type BlockListProps = {
  element: ListElement
  children: React.ReactNode
}

export const BlockList = ({ children }: BlockListProps) => {
  return (
    <ul>
      <li>{children}</li>
    </ul>
  )
}
