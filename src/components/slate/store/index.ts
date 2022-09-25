import create from 'zustand'

type SlateStore = {
  blockMenuOpen: boolean
}

export const useSlateStore = create<SlateStore>((_set) => {
  return {
    blockMenuOpen: false
  }
})
