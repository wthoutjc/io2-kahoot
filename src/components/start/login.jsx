import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Components
import Notification from '../notification/notification'
import Loader from '../loaders/loader'

// Services
import itsNumber from '../../services/verifiers/itsNumber'

// Hooks
import useUser from '../../hooks/useUser'

const Login = ({ setRenderRegister, setRenderModal, setChildrenModal }) => {
  const history = useHistory()

  const [idStudent, setIdStudent] = useState(null)

  // Loader
  const [loading, setLoading] = useState(false)

  // useUser Hook
  const { user, login } = useUser()

  const notifyError = (message) => {
    setChildrenModal({
      title: `Error: `,
      body: <Notification notification={{ message, ok: false }} />,
    })
    setRenderModal(true)
  }

  const handleLogin = () => {
    if (!itsNumber(idStudent)) {
      return notifyError('Código no válido')
    }
    login({ idStudent, setLoading }).then((res) => {
      if (!res[1]) {
        return notifyError(res[0])
      }
      history.push('/data')
    })
  }

  useEffect(() => {
    if (user) {
      history.push('/data')
    }
  }, [user, history])

  return (
    <>
      <form action="">
        <h1>Entrar a la prueba</h1>
        <div className="input-data">
          <span>Código Estudiantil</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Ej: 2018234567"
            onChange={(e) => {
              setIdStudent(e.target.value)
            }}
          />
        </div>
        <div className="buttons-container">
          <a href="#" onClick={() => setRenderRegister(true)}>
            <i>¿No estas registrado?</i>
          </a>
          {loading ? (
            <button
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Loader />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault()
                handleLogin()
              }}
            >
              CONTINUAR
            </button>
          )}
        </div>
      </form>
    </>
  )
}

export default Login
