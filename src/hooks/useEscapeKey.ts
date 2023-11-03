import { useCallback, useEffect } from 'react'

const KEY_NAME_ESC = 'Escape'
const KEY_EVENT_TYPE = 'keyup'

export const useEscapeKey: ({
  isOpen,
  handleEsc,
}: {
  isOpen: Function
  handleEsc?: Function
}) => void = ({ isOpen, handleEsc }) => {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        isOpen()
        if (handleEsc) {
          handleEsc()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  )

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false)

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false)
    }
  }, [handleEscKey])
}
