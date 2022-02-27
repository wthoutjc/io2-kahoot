import '../../styles/timeModal/timeModal.css'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

// Date
import moment from 'moment'

//decode jwt
import decodeJWT from 'jwt-decode'

//Components
import Loader from '../../components/loaders/loader'

const TimeModal = ({ renderTimeModal }) => {
  const history = useHistory()
  const [timeREST, setTimeREST] = useState(null)

  const intervalF = useCallback(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem('jwtStudent')) {
        const time = moment
          .unix(decodeJWT(localStorage.getItem('jwtStudent')).exp)
          .subtract(moment.duration(moment().format('hh:mm:ss')))
          .format('00:mm:ss')
        setTimeREST(time)
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }, [])

  useEffect(() => {
    if (timeREST === '00:00:00') {
      localStorage.removeItem('jwtStudent')
      history.push('/error')
    }
  }, [timeREST, history])

  useEffect(() => {
    intervalF()
  }, [intervalF])

  return ReactDOM.createPortal(
    <>
      {renderTimeModal && (
        <div className="time-modal">
          <div className="timer">
            {timeREST ? <p> {timeREST} </p> : <Loader />}
          </div>
        </div>
      )}
    </>,
    document.getElementById('portal')
  )
}

export default TimeModal

TimeModal.propTypes = {
  renderTimeModal: PropTypes.bool.isRequired,
}
