import '../../styles/slider/slider.css'
import '../../styles/question-cards/question-card.css'
import '../../styles/endTest/endTest.css'
import { useState, useRef, useEffect } from 'react'

// Hooks
import useQuestions from '../../hooks/useQuestions'
import useModal from '../../hooks/useModal'

// Components
import Question1 from '../../components/questions/question1'
import Question2 from '../../components/questions/question2'
import Question3 from '../../components/questions/question3'
import Question4 from '../../components/questions/question4'
import Question5 from '../../components/questions/question5'
import LoadingServer from '../loaders/loadingServer'
import Notification from '../notification/notification'
import ModalNotification from '../modal/modalNotification'

import TimeModal from '../modal/timeModal'

// Icons
import * as BsIcons from 'react-icons/bs'

//decode jwt
import decodeJWT from 'jwt-decode'

// Imports para END TEST

const svgEndTest = require('../../images/sending.png')

const EndTest = () => {
  const [render, setRender] = useState(false)

  const { getRating } = useQuestions()

  const [rating, setRating] = useState({ render: false, rating: null })

  const handleGetRating = () => {
    setRating({ ...rating, render: true })
  }

  useEffect(() => {
    const id = decodeJWT(localStorage.getItem('jwtStudent')).sub.id
    getRating({ setRender, id }).then((res) => {
      const _rating = res[0][1]
      setRating({ ...rating, rating: _rating })
      localStorage.removeItem('jwtStudent')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRating])

  return (
    <>
      <LoadingServer render={render} />
      <div className="end-test">
        <div className="end-test-container">
          <div className="img-end-test">
            <img src={svgEndTest} alt="" />
          </div>
          <h1>Tus respuestas fueron enviadas satisfactoriamente!</h1>
          <button className="end-test-info" onClick={handleGetRating}>
            CONSULTAR MI CALIFICACIÓN
          </button>
          {rating && <p>Tu calificación es: {rating}</p>}
        </div>
      </div>
    </>
  )
}

const Slider = () => {
  // Modal States
  const { renderModal, childrenModal, setRenderModal, setChildrenModal } =
    useModal()

  const { answers, setAnswers, sendAnswers } = useQuestions()

  const [render, setRender] = useState(false)

  const questions = [
    <Question1 key={1} answers={answers} setAnswers={setAnswers} />,
    <Question2 key={2} answers={answers} setAnswers={setAnswers} />,
    <Question3 key={3} answers={answers} setAnswers={setAnswers} />,
    <Question4 key={4} answers={answers} setAnswers={setAnswers} />,
    <Question5 key={5} answers={answers} setAnswers={setAnswers} />,
  ]

  const [renderEndTest, setRenderEndTest] = useState(false)

  const [pag, setPag] = useState(1)

  const handleNextPag = () => pag < 5 && setPag(pag + 1)
  const handlePreviousPag = () => pag > 1 && setPag(pag - 1)

  const pagIndicator = useRef()

  useEffect(() => {
    for (let i = 0; i < pagIndicator.current.children.length; i++) {
      if (pagIndicator.current.children[i].hasAttribute('class')) {
        pagIndicator.current.children[i].removeAttribute('class')
      }
    }
    const current = pagIndicator.current.children[pag - 1]
    current.setAttribute('class', 'active')
  }, [pag])

  const notifyMessage = ({ message, ok }) => {
    setChildrenModal({
      title: ok ? 'Éxito: ' : 'Error: ',
      body: <Notification notification={{ message, ok }} />,
    })
    setRenderModal(true)
  }

  const handleSendAnswers = () => {
    const idStudent = decodeJWT(localStorage.getItem('jwtStudent')).sub.id
    sendAnswers({ setRender, idStudent }).then((res) => {
      if (!res[1]) {
        const message = String(res[0])
        const ok = res[1]
        return notifyMessage({ message, ok })
      }
      setRenderEndTest(true)
    })
  }

  if (renderEndTest) return <EndTest />

  return (
    <>
      <TimeModal renderTimeModal={true} />
      {renderModal && (
        <ModalNotification
          renderModal={renderModal}
          childrenModal={childrenModal}
          onClose={() => setRenderModal(false)}
        />
      )}
      <LoadingServer render={render} />
      <div className="slider">
        <div className="slider-content">
          <div className="slider-content-title">
            <h1>PREGUNTA {pag}:</h1>
            <h1>{pag === 1 ? 'TEORÍA' : 'PRÁCTICA'}</h1>
          </div>
          {questions[pag - 1]}
          <div className="slider-content-footer">
            <div className="btn-move">
              <button
                className={pag === 1 ? 'no-clic' : 'clic'}
                onClick={handlePreviousPag}
              >
                <BsIcons.BsArrowReturnLeft />
              </button>
              <button
                className={pag === 5 ? 'no-clic' : 'clic'}
                onClick={handleNextPag}
              >
                <BsIcons.BsArrowReturnRight />
              </button>
            </div>
            <div className="pag-indicator" ref={pagIndicator}>
              <div onClick={() => setPag(1)}></div>
              <div onClick={() => setPag(2)}></div>
              <div onClick={() => setPag(3)}></div>
              <div onClick={() => setPag(4)}></div>
              <div onClick={() => setPag(5)}></div>
            </div>
            {pag === 5 && (
              <button
                className="finish-btn"
                onClick={() => handleSendAnswers()}
              >
                TERMINAR Y ENVIAR
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Slider
