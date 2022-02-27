import '../../styles/start/register.css'
import { useState } from 'react'

// Icons
import * as AiIcons from 'react-icons/ai'

// Hooks
import useUser from '../../hooks/useUser'

// Components
import LoadingServer from '../loaders/loadingServer'
import Notification from '../notification/notification'

const Register = ({ setRenderRegister, setRenderModal, setChildrenModal }) => {
  const { registerUser } = useUser()

  const [render, setRender] = useState(false)

  const [newStudent, setNewStudent] = useState({
    id: null,
    nombre: null,
    apellido: null,
    proyecto: null,
    correo: null,
  })

  const notifyMessage = ({ message, ok }) => {
    setChildrenModal({
      title: ok ? 'Éxito: ' : 'Error: ',
      body: <Notification notification={{ message, ok }} />,
    })
    setRenderModal(true)
  }

  const handleRegister = () => {
    registerUser({ setRender, newStudent }).then((res) => {
      const message = String(res[0])
      const ok = res[1]
      notifyMessage({ message, ok })
    })
    setRenderRegister(false)
  }

  return (
    <>
      <LoadingServer render={render} />
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
        <input
          type="text"
          name="nombre"
          id="nombre"
          placeholder="Nombre..."
          onChange={(e) =>
            setNewStudent({ ...newStudent, nombre: e.target.value })
          }
        />
        <span>Apellido(s)</span>
        <input
          type="text"
          name="apellido"
          id="apellido"
          placeholder="Apellido..."
          onChange={(e) =>
            setNewStudent({ ...newStudent, apellido: e.target.value })
          }
        />
        <span>Código estudiantil</span>
        <input
          type="number"
          name="codigo-estudiantil"
          id="codigo-estudiantil"
          placeholder="Ej: 20181234567"
          onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
        />
        <span>Proyecto Curricular</span>
        <select
          name="proyecto_curricular-select"
          id="proyecto_curricular-select"
          defaultValue={'Seleccionar'}
          onChange={(e) =>
            setNewStudent({ ...newStudent, proyecto: e.target.value })
          }
        >
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
          onChange={(e) =>
            setNewStudent({ ...newStudent, correo: e.target.value })
          }
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            handleRegister()
          }}
        >
          Registrarse
        </button>
      </form>
    </>
  )
}

export default Register
