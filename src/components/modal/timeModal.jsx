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

  const updateDate = () => {
    console.log('NOKASXD')
    if (localStorage.getItem('jwtStudent')) {
      const time = moment
        .unix(decodeJWT(localStorage.getItem('jwtStudent')).exp)
        .subtract(moment.duration(moment().format('hh:mm:ss')))
        .format('00:mm:ss')
      setTimeREST(time)
    } else {
      clearInterval(interval)
    }
  }

  const interval = useCallback(() => {
    setInterval(() => {
      updateDate()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    interval()
  }, [interval])

  useEffect(() => {
    if (timeREST === '00:00:00') {
      localStorage.removeItem('jwtStudent')
      history.push('/error')
    }
  }, [timeREST, history, interval])

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
