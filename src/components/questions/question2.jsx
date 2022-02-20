import { useRef } from 'react'

// Hook
import useQuestions from '../../hooks/useQuestions'

const Question2 = () => {
  const { answers, setAnswers } = useQuestions()

  const answersDOM = useRef()

  const handleChecked = (x) => {
    for (let i = 0; i < answersDOM.current.children.length; i++) {
      answersDOM.current.children[i].children[1].setAttribute('class', 'false')
    }
    const liDOM = answersDOM.current.children[x - 1].children[1]
    liDOM.setAttribute('class', 'checked')
    setAnswers({ ...answers, question2: x })
  }

  return (
    <div className="card-question">
      <div className="header-card">
        <div className="helpers">
          <div className="helpers-btn">
            <button>1234</button>
            <button>1234</button>
            <button>1234</button>
            <button>1234</button>
          </div>
        </div>
        <div className="question">
          <h3>Enunciado</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            nisi exercitationem enim iste. Illo nisi qui obcaecati? Ea doloribus
            nostrum exercitationem, consequuntur id pariatur voluptatem expedita
            tempora ipsam neque libero.
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
            <label htmlFor="rta-A">RESPUESTA A</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-B"
              id="rta-B"
              onChange={() => handleChecked(2)}
            />
            <label htmlFor="rta-B">RESPUESTA B</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-C"
              id="rta-C"
              onChange={() => handleChecked(3)}
            />
            <label htmlFor="rta-C">RESPUESTA C</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-D"
              id="rta-D"
              onChange={() => handleChecked(4)}
            />
            <label htmlFor="rta-D">RESPUESTA D</label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question2
