import '../../styles/start/register.css'

//Icons
import * as AiIcons from 'react-icons/ai'

const Register = ({ setRenderRegister }) => {
  return (
    <>
      <form action="">
        <div className="title">
          <h1>Registrarse</h1>
          <button
            onClick={(e) => {
              e.preventDefault()
              setRenderRegister(false)
            }}
          >
            <AiIcons.AiOutlineClose />
          </button>
        </div>
        <span>Nombre(s)</span>
        <input type="text" name="nombre" id="nombre" placeholder="Nombre..." />
        <span>Apellido(s)</span>
        <input
          type="text"
          name="apellido"
          id="apellido"
          placeholder="Apellido..."
        />
        <span>Código estudiantil</span>
        <input
          type="number"
          name="codigo-estudiantil"
          id="codigo-estudiantil"
          placeholder="Ej: 20181234567"
        />
        <span>Facultad</span>
        <select name="facultad" id="facultad" defaultValue={'Seleccionar'}>
          <option value="Seleccionar">Seleccionar</option>
          <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
          <option value="Otro">Otro</option>
        </select>
        <span>Correo instucional</span>
        <input
          type="email"
          name="correo"
          id="correo"
          placeholder="Ej: example@correo.udistrital.edu.co"
        />
        <button
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          Registrarse
        </button>
      </form>
    </>
  )
}

export default Register
