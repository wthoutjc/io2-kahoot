import '../../styles/timeOut/timeOut.css'

const timeOutImage = require('../../images/clock.png')

const TimeOut = () => {
  return (
    <div className="time-out">
      <div className="time-out-container">
        <div className="timeout-img">
          <img src={timeOutImage} alt="" />
        </div>
        <h1>
          Tu tiempo para la prueba ha finalizado, sin embargo, tus respuestas
          fueron registradas en nuestro sistema.
        </h1>

        <p>Para consultar su puntuación, vuelva al menú principal.</p>
      </div>
    </div>
  )
}

export default TimeOut
