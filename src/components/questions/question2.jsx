import { useRef, useEffect, useState } from 'react'

//decode jwt
import decodeJWT from 'jwt-decode'

// Components
import Modal from '../modal/modal'

// Hooks
import useModal from '../../hooks/useModal'

// Date
import moment from 'moment'

const Question2Pista = () => {
  const [renderPista, setRenderPista] = useState(false)

  return (
    <>
      <div className="pista-container">
        <h3>Esta pista esta relacionada con el punto 2.</h3>
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
          <p>No es la B.</p>
        </div>
      )}
    </>
  )
}

const Question2 = ({ answers, setAnswers }) => {
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
    setAnswers({ ...answers, question2: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question2[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ2Pista = () => {
    setChildrenModal2({
      title: `PISTA`,
      body: <Question2Pista />,
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
                  'https://www.ingenioempresa.com/modelos-deterministicos-de-inventario/#:~:text=%C2%BFQu%C3%A9%20son%20los%20modelos%20determ%C3%ADnisticos,pedidos%20reales%20de%20los%20clientes.'
                )
              }
            >
              Ayuda teórica
            </button>
            <button
              onClick={() =>
                window.open(
                  'http://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S0186-10422012000300011'
                )
              }
            >
              Ayuda teórica
            </button>
            <button onClick={handleQ2Pista}>Pista</button>
            <button
              onClick={() =>
                window.open(
                  'http://repositorio.cucea.udg.mx/jspui/bitstream/123456789/468/3/Modelos%20determin%C3%ADsticos%20de%20control%20de%20inventarios.pdf'
                )
              }
            >
              Ayuda teórica
            </button>
          </div>
        </div>
        <div className="question">
          <h3>Enunciado</h3>
          <p>
            De los siguientes, marque el que usted considera son modelos de
            inventarios determinísticos:
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
            <label htmlFor="rta-A">A. B y C</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-B"
              id="rta-B"
              onChange={() => handleChecked(2)}
            />
            <label htmlFor="rta-B">
              B. Inventarios por periodo, inventarios por pedido, método de un
              solo lote, método de lote por lote.
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
              C. EOQ básico, EOQ con descuentos por cantidad, cantidad económica
              a producir.
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
              D. Registro de asistencia de trabajadores, conteo de empanadas por
              parte del gerente a los peones de la institución, una lista de
              faltas de los prestadores de servicio de aseo y mantenimiento
              general.
            </label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question2
