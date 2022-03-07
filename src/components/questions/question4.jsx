import { useRef, useEffect, useState } from 'react'
import '../../styles/questions/question.css'

//decode jwt
import decodeJWT from 'jwt-decode'

// Date
import moment from 'moment'

// Components
import Notification from '../notification/notification'
import Modal from '../modal/modal'
import ModalNotification from '../modal/modalNotification'

// Hooks
import useModal from '../../hooks/useModal'

//MathJAX
import { MathJax, MathJaxContext } from 'better-react-mathjax'

const Q4HelpFormulas = () => {
  return (
    <>
      <div className="helper-container">
        <MathJaxContext>
          <h2>
            Estas fórmulas son específicas para la solución de este punto.
          </h2>
          <MathJax>
            {
              '\\(\\sigma_{T+L} = \\sqrt{\\sum_{i = 1}^{T+L} \\sigma_d^2} = \\sqrt{(T + L)\\sigma_d^2} \\)'
            }
          </MathJax>
          <MathJax>{'\\(q = d*(T+L) + z * \\sigma_{T+L} - I \\)'}</MathJax>
          <p>donde:</p>
          <div className="flex-container">
            <MathJax>
              {'\\(T = \\)'} <p>número de días entre revisiones</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(q = \\)'} <p>cantidad a pedir</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(\\sigma_d^2 = \\)'} <p>desviación estandar</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(L = \\)'} <p>tiempo de entrega (entre pedido y recibido)</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(d = \\)'} <p>demanda diaria promedio pronosticada</p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(z = \\)'}
              <p>
                número de desviaciones estándar para una probabilidad de
                servicio especifica
              </p>
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(\\sigma_{T+L} = \\)'}{' '}
              <p>
                desviación estándar de la demanda durante el tiempo de revisión
                y entrega
              </p>{' '}
            </MathJax>
          </div>
          <div className="flex-container">
            <MathJax>
              {'\\(I = \\)'}
              <p>nivel de inventario actual (incluye las piezas pedidas)</p>
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

const Q4Calculadora = () => {
  const { renderModal, childrenModal, setChildrenModal, setRenderModal } =
    useModal()

  const notifyMessage = ({ message, ok }) => {
    setChildrenModal({
      title: ok ? 'Éxito: ' : 'Error: ',
      body: <Notification notification={{ message, ok }} />,
    })
    setRenderModal(true)
  }

  const [q4Data, setQ4Data] = useState({
    l: null,
    t: null,
    d: null,
    i: null,
    sig: null,
    prob: 0.9,
  })

  const [q4Results, setQ4Results] = useState({
    z: null,
    sigTL: null,
    q: null,
  })

  const percentile_z = (p) => {
    if (p < 0.5) return -this.percentile_z(1 - p)

    if (p > 0.92) {
      if (p === 1) return Infinity
      let r = Math.sqrt(-Math.log(1 - p))
      return (
        (((2.3212128 * r + 4.8501413) * r - 2.2979648) * r - 2.7871893) /
        ((1.6370678 * r + 3.5438892) * r + 1)
      )
    }
    p -= 0.5
    let r = p * p
    return (
      (p *
        (((-25.4410605 * r + 41.3911977) * r - 18.6150006) * r + 2.5066282)) /
      ((((3.1308291 * r - 21.062241) * r + 23.0833674) * r - 8.4735109) * r + 1)
    )
  }

  const handleCalc = () => {
    /**
     * VERIFICACIONES
     */
    const { l, t, d, i, prob, sig } = q4Data
    if (!l || !t || !d || !i || !sig) {
      //error
      const message = 'Datos no válidos'
      const ok = false
      return notifyMessage({ message, ok })
    }

    if (parseFloat(sig) < 0.9) {
      const message = 'Desv. estándar no válida'
      const ok = false
      return notifyMessage({ message, ok })
    }

    /**
     * CALCULA Z
     */
    const z = parseFloat(percentile_z(parseFloat(prob))).toFixed(2)
    /**
     * CALCULA sig TL
     */
    const sigTL = parseFloat(
      Math.sqrt((parseFloat(t) + parseFloat(l)) * Math.pow(parseFloat(sig), 2))
    ).toFixed(1)
    /**
     * CALCULA q
     */
    const q = parseFloat(
      parseFloat(d) * (parseFloat(t) + parseFloat(l)) +
        percentile_z(parseFloat(prob)) * parseFloat(sigTL) -
        parseFloat(i)
    ).toFixed(0)
    setQ4Results({ ...q4Results, q, sigTL, z })
  }

  useEffect(() => {
    console.log(q4Results)
  }, [q4Results])

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
              <MathJax>{'\\(L \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-l"
              id="q4-l"
              onChange={(e) => setQ4Data({ ...q4Data, l: e.target.value })}
            />
            <h4>
              <MathJax>{'\\(T \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-t"
              id="q4-t"
              onChange={(e) => setQ4Data({ ...q4Data, t: e.target.value })}
            />
            <h4>
              <MathJax>{'\\(d \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-d"
              id="q4-d"
              onChange={(e) => setQ4Data({ ...q4Data, d: e.target.value })}
            />
            <h4>
              <MathJax>{'\\(I \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-i"
              id="q4-i"
              onChange={(e) => setQ4Data({ ...q4Data, i: e.target.value })}
            />
            <h4>
              <MathJax>{'\\(\\sigma_d^2 \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-i"
              id="q4-i"
              onChange={(e) => setQ4Data({ ...q4Data, sig: e.target.value })}
            />
            <h4>Probabilidad</h4>
            <input
              type="range"
              name="q4-sigma"
              id="q4-sigma"
              min={0.9}
              max={1}
              step={0.01}
              onChange={(e) => setQ4Data({ ...q4Data, prob: e.target.value })}
            />
            <p>{q4Data.prob * 100} %</p>
            <button onClick={handleCalc}>CALCULAR</button>
          </div>
          <div className="q4-calc-results">
            <h2>Resultados</h2>
            <h4>
              <MathJax>{'\\(z \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-z"
              id="q4-z"
              defaultValue={q4Results.z}
              readOnly
            />
            <h4>
              <MathJax>{'\\(\\sigma_{T*L} \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-sig-tl"
              id="q4-sig-tl"
              defaultValue={q4Results.sigTL}
              readOnly
            />
            <h4>
              <MathJax>{'\\(q \\)'}</MathJax>
            </h4>
            <input
              type="number"
              name="q4-q"
              id="q4-q"
              defaultValue={q4Results.q}
              readOnly
            />
          </div>
        </MathJaxContext>
      </div>
    </>
  )
}

const Question4 = ({ answers, setAnswers }) => {
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
    setAnswers({ ...answers, question4: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question4[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ4HelpFormula = () => {
    setChildrenModal2({
      title: `AYUDA FÓRMULAS`,
      body: <Q4HelpFormulas />,
    })
    setRenderModal2(true)
  }

  const handleQ4Calculadora = () => {
    setChildrenModal2({
      title: `CALCULADORA`,
      body: <Q4Calculadora />,
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
            <button>Pista</button>
            <button onClick={handleQ4Calculadora}>Calculadora</button>
          </div>
        </div>
        <div className="question">
          <h3>Enunciado</h3>
          <p>
            La demanda diaria de un producto es de 10 unidades con una
            desviación estándar de 3 unidades. El periodo de revisión es de 30
            días y el tiempo de entrega de 14 días. La gerencia estableció la
            política de cubrir 98% de la demanda con las existencias. Al
            principio de este periodo de revisión hay 150 unidades en el
            inventario, ¿Cuántas unidades se deben pedir?
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
            <label htmlFor="rta-A">A. 449 unidades</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-B"
              id="rta-B"
              onChange={() => handleChecked(2)}
            />
            <label htmlFor="rta-B">B. 413 unidades</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-C"
              id="rta-C"
              onChange={() => handleChecked(3)}
            />
            <label htmlFor="rta-C">C. 331 unidades</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-D"
              id="rta-D"
              onChange={() => handleChecked(4)}
            />
            <label htmlFor="rta-D">D. 327 unidades</label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question4
