import { useRef, useEffect, useState } from 'react'

//decode jwt
import decodeJWT from 'jwt-decode'

// Components
import Modal from '../modal/modal'

//Hooks
import useModal from '../../hooks/useModal'

// Date
import moment from 'moment'

const Question1Hint = () => {
  const [renderPista, setRenderPista] = useState(false)
  const [renderPista2, setRenderPista2] = useState(false)

  return (
    <>
      <div className="pista-container">
        <h3>This hint is about question 1.</h3>
        <div className="pista-options">
          <button
            onClick={() => {
              setRenderPista(true)
            }}
          >
            Get hint
          </button>
        </div>
        {renderPista && (
          <>
            <div className="pista">
              <p>B is not the answer.</p>
            </div>
            <div className="pista-options">
              <button
                onClick={() => {
                  setRenderPista2(true)
                }}
              >
                Get extra hint
              </button>
            </div>
          </>
        )}
        {renderPista2 && (
          <>
            <div className="pista">
              <p>The problem is about inventorys.</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

const Question1 = ({ answers, setAnswers }) => {
  const { renderModal2, childrenModal2, setRenderModal2, setChildrenModal2 } =
    useModal()

  const answersDOM = useRef()

  const handleChecked = (x) => {
    for (let i = 0; i < answersDOM.current.children.length; i++) {
      answersDOM.current.children[i].children[1].setAttribute('class', 'false')
    }
    const liDOM = answersDOM.current.children[x - 1].children[1]
    liDOM.setAttribute('class', 'checked')
    const time = moment
      .unix(decodeJWT(localStorage.getItem('jwtStudent')).exp)
      .subtract(moment.duration(moment().format('hh:mm:ss')))
      .format('00:mm:ss')
    setAnswers({ ...answers, question1: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question1[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ4Pista = () => {
    setChildrenModal2({
      title: `HINT`,
      body: <Question1Hint />,
    })
    setRenderModal2(true)
  }

  return (
    <div className="card-question">
      {renderModal2 && (
        <Modal
          renderModal2={renderModal2}
          childrenModal2={childrenModal2}
          onClose={() => setRenderModal2(false)}
        />
      )}
      <div className="header-card">
        <div className="helpers">
          <div className="helpers-btn">
            <button
              onClick={() =>
                window.open(
                  'https://drive.google.com/file/d/12teGtHwjC8GJMmLjhgAMX8W0nHTvarp2/view?usp=sharing'
                )
              }
            >
              Theoretical support
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://drive.google.com/file/d/1-vGce2A2lUOOEAg5H2zaK-7uDG6y7mM5/view?usp=sharing'
                )
              }
            >
              Theoretical support
            </button>
            <button onClick={handleQ4Pista}>Hint</button>
            <button
              onClick={() =>
                window.open(
                  'https://docs.google.com/document/d/1hcmv81aJBFmHUfYAuMVkY-d3YDw33Xp3/edit?usp=sharing&ouid=106792408206325515763&rtpof=true&sd=true'
                )
              }
            >
              Theoretical support
            </button>
          </div>
        </div>
        <div className="question">
          <h3>Enunciado</h3>
          <p>Complete the sentence below</p>
          <p>
            The __________ problem has to do with holding an item in reserve to
            meet fluctuations in _______. Overstocking an item increases the
            cost of ________ and ________, and understocking disrupts
            ___________ and/or ______. The result is to seek an inventory level
            that balances the two extremes by minimizing an appropriate _____
            function.
          </p>
        </div>
      </div>
      <div className="answers-card">
        <h4>Seleccione una única respuesta</h4>
        <ul ref={answersDOM}>
          <li>
            <input
              type="checkbox"
              name="rta-A"
              id="rta-A"
              onChange={() => handleChecked(1)}
            />
            <label htmlFor="rta-A">
              A. inventory, demand, production, sales, capital, storage, cost
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-B"
              id="rta-B"
              onChange={() => handleChecked(2)}
            />
            <label htmlFor="rta-B">
              B. deterministic, capital, cost, sales, inventory, demand, offer
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-C"
              id="rta-C"
              onChange={() => handleChecked(3)}
            />
            <label htmlFor="rta-C">
              C. inventory, demand, capital, storage, production, sales, cost
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-D"
              id="rta-D"
              onChange={() => handleChecked(4)}
            />
            <label htmlFor="rta-D">
              D. probability, stock, production, offer, cost, inventory, demand
            </label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question1
