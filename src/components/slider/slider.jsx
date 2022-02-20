import '../../styles/slider/slider.css'
import '../../styles/question-cards/question-card.css'
import { useState, useRef, useEffect, useContext } from 'react'
import questionContext, {
  QuestionContextProvider,
} from '../../context/questionContext'

// Hooks
import useQuestions from '../../hooks/useQuestions'

// Components
import Question1 from '../../components/questions/question1'
import Question2 from '../../components/questions/question2'
import Question3 from '../../components/questions/question3'
import Question4 from '../../components/questions/question4'
import Question5 from '../../components/questions/question5'

// Icons
import * as BsIcons from 'react-icons/bs'

const Slider = () => {
  // Questions
  const { answers } = useQuestions()

  const questions = useRef([
    <Question1 key={1} />,
    <Question2 key={2} />,
    <Question3 key={3} />,
    <Question4 key={4} />,
    <Question5 key={5} />,
  ])

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

  return (
    <>
      <QuestionContextProvider>
        <div className="slider">
          <div className="slider-content">
            <div className="slider-content-title">
              <h1>PREGUNTA {pag}:</h1>
              <h1>{pag === 1 ? 'TEORÍA' : 'PRÁCTICA'}</h1>
            </div>
            {questions.current[pag - 1]}
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
                <button className="finish-btn">TERMINAR Y ENVIAR</button>
              )}
            </div>
          </div>
        </div>
      </QuestionContextProvider>
    </>
  )
}

export default Slider
