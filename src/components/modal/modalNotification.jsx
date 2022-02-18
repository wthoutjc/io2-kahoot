import '../../styles/modal/modal-notification.css'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

//Icons
import * as AiIcons from 'react-icons/ai'

const ModalNotification = ({ renderModal, childrenModal, onClose }) => {
  const { title, body } = childrenModal
  const { notification } = body.props
  return ReactDOM.createPortal(
    <>
      {renderModal && (
        <div className="modal-notification">
          <div
            className={
              notification.ok ? 'modal-content ok' : 'modal-content error'
            }
          >
            <div className="modal-content-title">
              <h4>{title} </h4>
              <button onClick={() => onClose()}>
                <AiIcons.AiFillCloseCircle />
              </button>
            </div>
            <div
              className={
                notification.ok
                  ? 'modal-content-body ok-secondary'
                  : 'modal-content-body error-secondary'
              }
            >
              {body}
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('portal')
  )
}

ModalNotification.propTypes = {
  renderModal: PropTypes.bool.isRequired,
  childrenModal: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ModalNotification
