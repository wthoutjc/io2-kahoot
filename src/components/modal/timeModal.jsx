import '../../styles/timeModal/timeModal.css'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

// Hooks
import useQuestions from '../../hooks/useQuestions'

// Date
import moment from 'moment'

//decode jwt
import decodeJWT from 'jwt-decode'

//Components
import Loader from '../../components/loaders/loader'
import LoadingServer from '../loaders/loadingServer'

const TimeModal = ({ renderTimeModal }) => {
  const [render, setRender] = useState(false)
  const [times, setTimes] = useState(0)

  const { sendAnswers } = useQuestions()

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
      setTimes(times + 1)
      if (times === 1) {
        const idStudent = decodeJWT(localStorage.getItem('jwtStudent')).sub.id
        sendAnswers({ setRender, idStudent }).then((res) => {
          console.log(res)
          localStorage.removeItem('jwtStudent')
          history.push('/error')
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeREST, history, sendAnswers])

  useEffect(() => {
    intervalF()
  }, [intervalF])

  return ReactDOM.createPortal(
    <>
      <LoadingServer render={render} />
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
