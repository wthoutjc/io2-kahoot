import '../../styles/modal/modal.css'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

//Icons
import * as AiIcons from 'react-icons/ai'
const Modal = ({ renderModal2, childrenModal2, onClose }) => {
  const { title, body } = childrenModal2
  return ReactDOM.createPortal(
    <>
      {renderModal2 && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-content-title2">
              <h1>{title} </h1>
              <button onClick={() => onClose()}>
                <AiIcons.AiFillCloseCircle />
              </button>
            </div>
            <div className="modal-content-body">{body}</div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('portal2')
  )
}

Modal.propTypes = {
  renderModal: PropTypes.bool.isRequired,
  childrenModal: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal
