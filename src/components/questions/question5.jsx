import { useRef, useEffect, useState } from 'react'

//decode jwt
import decodeJWT from 'jwt-decode'

// Components
import Notification from '../notification/notification'
import Modal from '../modal/modal'
import ModalNotification from '../modal/modalNotification'

// Hooks
import useModal from '../../hooks/useModal'

// Date
import moment from 'moment'

//MathJAX
import { MathJax, MathJaxContext } from 'better-react-mathjax'

const Q5Calculadora = () => {
  const { renderModal, childrenModal, setChildrenModal, setRenderModal } =
    useModal()

  const notifyMessage = ({ message, ok }) => {
    setChildrenModal({
      title: ok ? 'Éxito: ' : 'Error: ',
      body: <Notification notification={{ message, ok }} />,
    })
    setRenderModal(true)
  }

  const [q5Data, setQ5Data] = useState({
    d: null,
    c1: null,
    c2: null,
    c3: null,
    r: null,
  })

  const [q5Results, setQ5Results] = useState({
    q: null,
    t: null,
  })

  const q = (C2, C3, D, R) => {
    return parseFloat(((2 * C2 * D) / (C3 * (1 - D / R))) ** 0.5).toFixed(3)
  }
  const t1 = (Q, R) => {
    return parseFloat((Q / R) * 365).toFixed(0)
  }

  const handleCalc = () => {
    /**
     * VERIFICACIONES
     */
    const { d, c1, c2, c3, r } = q5Data
    if (!d || !c1 || !c2 || !c3 || !r) {
      //error
      const message = 'Datos no válidos'
      const ok = false
      return notifyMessage({ message, ok })
    }
    setQ5Results({
      q: q(c2, c3, d, r),
      t: t1(q(c2, c3, d, r), r),
    })
  }

  return (
    <>
      {renderModal && (
        <ModalNotification
          renderModal={renderModal}
          childrenModal={childrenModal}
          onClose={() => setRenderModal(false)}
        />
      )}
      <div className="q4-calculadora">
        <MathJaxContext>
          <div className="q4-calc-form">
            <h2>Digite los datos</h2>
            <h4>
              <MathJax>{'\\(D \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-l"
              id="q4-l"
              onChange={(e) => setQ5Data({ ...q5Data, d: e.target.value })}
            />
            <h4>
              <MathJax>{'\\(C_1 \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-t"
              id="q4-t"
              onChange={(e) => setQ5Data({ ...q5Data, c1: e.target.value })}
            />
            <h4>
              <MathJax>{'\\(C_2 \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-d"
              id="q4-d"
              onChange={(e) => setQ5Data({ ...q5Data, c2: e.target.value })}
            />
            <h4>
              <MathJax>{'\\(C_3 \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-i"
              id="q4-i"
              onChange={(e) => setQ5Data({ ...q5Data, c3: e.target.value })}
            />
            <h4>
              <MathJax>{'\\(R \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-i"
              id="q4-i"
              onChange={(e) => setQ5Data({ ...q5Data, r: e.target.value })}
            />
            <button onClick={handleCalc}>CALCULAR</button>
          </div>
          <div className="q4-calc-results">
            <h2>Resultados</h2>
            <h4>
              <MathJax>{'\\(Q \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-z"
              id="q4-z"
              defaultValue={q5Results.q}
              readOnly
            />
            <h4>
              <MathJax>{'\\(T_1 \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-sig-tl"
              id="q4-sig-tl"
              defaultValue={q5Results.t}
              readOnly
            />
          </div>
        </MathJaxContext>
      </div>
    </>
  )
}

const Question5Pista = () => {
  const [renderPista, setRenderPista] = useState(false)

  return (
    <>
      <div className="pista-container">
        <h3>Esta pista esta relacionada con el punto 5.</h3>
        <div className="pista-options">
          <button
            onClick={() => {
              setRenderPista(true)
            }}
          >
            Obtener mi pista
          </button>
        </div>
      </div>
      {renderPista && (
        <div className="pista">
          <p>No es la D.</p>
        </div>
      )}
    </>
  )
}

const Q5HelpFormulas = () => {
  return (
    <>
      <div className="helper-container">
        <MathJaxContext>
          <h2>
            Estas fórmulas son específicas para la solución de este punto.
          </h2>
          <MathJax>
            {'\\(Q = \\sqrt{\\frac{2C_2D}{C_3(1-\\frac{D}{R})}} \\)'}
          </MathJax>
          <MathJax>{'\\(T_1 = \\frac{Q}{R} \\)'}</MathJax>
          <p>donde:</p>
          <div className="flex-container">
            <MathJax>
              {'\\(D = \\)'} <p>Unidades demandadas por año.</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(C_1 = \\)'} <p>Costo de cada unidad</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(C_2 = \\)'} <p>Costo de una tanda de producción</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(C_3 = \\)'} <p>Costo de almacenamiento</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(R = \\)'} <p>Tasa de producción anual</p>{' '}
            </MathJax>
          </div>
          <h3>
            Puedes usar esta nomenclatura para usar la calculadora, e
            interpretar los resultados.
          </h3>
        </MathJaxContext>
      </div>
    </>
  )
}

const Question5 = ({ answers, setAnswers }) => {
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
    setAnswers({ ...answers, question5: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question5[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ5Pista = () => {
    setChildrenModal2({
      title: `PISTA`,
      body: <Question5Pista />,
    })
    setRenderModal2(true)
  }

  const handleQ4HelpFormula = () => {
    setChildrenModal2({
      title: `AYUDA FÓRMULAS`,
      body: <Q5HelpFormulas />,
    })
    setRenderModal2(true)
  }

  const handleQ5Calculadora = () => {
    setChildrenModal2({
      title: `CALCULADORA`,
      body: <Q5Calculadora />,
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
                  'https://drive.google.com/file/d/1Q2cU8_TG1F_06Mi8jf2psIuTzeB0AY6o/view?usp=sharing'
                )
              }
            >
              Ayuda teórica
            </button>
            <button onClick={handleQ4HelpFormula}>Ayuda fórmulas</button>
            <button onClick={handleQ5Pista}>Pista</button>
            <button onClick={handleQ5Calculadora}>Calculadora</button>
          </div>
        </div>
        <div className="question">
          <h3>Enunciado</h3>
          <p>
            La demanda de un producto es de 15000 unidades al año, en él no se
            permite déficit. La empresa puede producir dicho producto a una tasa
            de 32000 unidades al año. El costo de organizar una tanda de
            producción es de $500 y el costo de almacenamiento es de $2 por mes.
            Sabiendo que el costo de cada unidad es de $6 calcular el tiempo de
            manufacturación T <sub>1</sub>
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
            <label htmlFor="rta-A">A. 51 días</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-B"
              id="rta-B"
              onChange={() => handleChecked(2)}
            />
            <label htmlFor="rta-B">B. 43 días</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-C"
              id="rta-C"
              onChange={() => handleChecked(3)}
            />
            <label htmlFor="rta-C">C. 44 días</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-D"
              id="rta-D"
              onChange={() => handleChecked(4)}
            />
            <label htmlFor="rta-D">D. Ninguna de las anteriores</label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question5
