import { useState } from 'react'

const useModal = () => {
  const [renderModal, setRenderModal] = useState(false)
  const [childrenModal, setChildrenModal] = useState({ title: '', body: null })

  /**
   * Modal - normal
   */

  const [renderModal2, setRenderModal2] = useState(false)
  const [childrenModal2, setChildrenModal2] = useState({
    title: '',
    body: null,
  })

  return {
    renderModal,
    childrenModal,
    setRenderModal,
    setChildrenModal,
    renderModal2,
    setChildrenModal2,
    setRenderModal2,
    childrenModal2,
  }
}

export default useModal
