import { useState } from 'react'

const useModal = () => {
  const [renderModal, setRenderModal] = useState(false)
  const [childrenModal, setChildrenModal] = useState({ title: '', body: null })

  return {
    renderModal,
    childrenModal,
    setRenderModal,
    setChildrenModal,
  }
}

export default useModal
