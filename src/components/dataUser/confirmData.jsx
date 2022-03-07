import '../../styles/confirmData/confirm-data.css'
import { useEffect, useState } from 'react'

//Hooks
import useUser from '../../hooks/useUser'
import useModal from '../../hooks/useModal'

// Icons
import * as BsIcons from 'react-icons/bs'

//Components
import SliderContextContainer from '../slider/sliderContextContainer'
import LoadingServer from '../loaders/loadingServer'
import TimeModal from '../modal/timeModal'
import Notification from '../notification/notification'
import ModalNotification from '../modal/modalNotification'

//decode jwt
import decodeJWT from 'jwt-decode'

const ConfirmData = () => {
  // Modal States
  const { renderModal, childrenModal, setRenderModal, setChildrenModal } =
    useModal()

  const [render, setRender] = useState(false)

  const { user, verifyJWT, updateInfoUser } = useUser()

  const [editMode, setEditMode] = useState(false)
  const [updateUser, setUpdateUser] = useState(decodeJWT(user).sub)

  const [renderSlider, setRenderSlider] = useState(false)

  const notifyMessage = ({ message, ok }) => {
    setChildrenModal({
      title: ok ? 'Éxito: ' : 'Error: ',
      body: <Notification notification={{ message, ok }} />,
    })
    setRenderModal(true)
  }

  const handleUpdateInfo = () => {
    const id = decodeJWT(localStorage.getItem('jwtStudent')).sub.id
    updateInfoUser({ setRender, id, updateUser }).then((res) => {
      const message = String(res[0])
      const ok = res[1]
      notifyMessage({ message, ok })
    })
  }

  const handleStartTest = () => {
    setRenderSlider(true)
  }

  useEffect(() => {
    verifyJWT({ setRender })
  }, [verifyJWT])

  if (renderSlider) return <SliderContextContainer />

  return (
    <>
      <LoadingServer render={render} />
      <TimeModal renderTimeModal={true} />
      {renderModal && (
        <ModalNotification
          renderModal={renderModal}
          childrenModal={childrenModal}
          onClose={() => setRenderModal(false)}
        />
      )}
      <div className="confirm-data">
        <div className="info-user">
          <h1>VERIFICA TU INFORMACIÓN</h1>
          <i>
            Dale clic en EDITAR, en dado caso de que tu información no sea
            correcta.
          </i>
          <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
            {editMode ? <BsIcons.BsCheck /> : 'EDITAR'}
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleUpdateInfo()
            }}
          >
            <span>Nombre</span>
            <input
              type="text"
              name="nombre"
              id="nombre"
              className={editMode ? 'edit' : 'input-confirm-data'}
              defaultValue={updateUser.nombre}
              readOnly={!editMode}
              onChange={(e) => {
                const newName = e.target.value
                setUpdateUser({ ...updateUser, nombre: newName })
              }}
            />
            <span>Apellido</span>
            <input
              type="text"
              name="apellido"
              id="apellido"
              className={editMode ? 'edit' : 'input-confirm-data'}
              defaultValue={updateUser.apellido}
              readOnly={!editMode}
              onChange={(e) => {
                const newApellido = e.target.value
                setUpdateUser({ ...updateUser, apellido: newApellido })
              }}
            />
            <span>Código</span>
            <input
              type="text"
              name="codigo"
              id="codigo"
              className={editMode ? 'edit' : 'input-confirm-data'}
              defaultValue={updateUser.id}
              readOnly={!editMode}
              onChange={(e) => {
                const newCodigo = e.target.value
                setUpdateUser({ ...updateUser, codigo: newCodigo })
              }}
            />
            <span>Correo</span>
            <input
              type="text"
              name="correo"
              id="correo"
              className={editMode ? 'edit' : 'input-confirm-data'}
              defaultValue={updateUser.correo}
              readOnly={!editMode}
              onChange={(e) => {
                const newEmail = e.target.value
                setUpdateUser({ ...updateUser, codigo: newEmail })
              }}
            />
            <span>Proyecto Curricular</span>
            <input
              type="text"
              name="proyecto_curricular"
              id="proyecto_curricular"
              className={editMode ? 'edit' : 'input-confirm-data'}
              defaultValue={updateUser.proyecto}
              readOnly={!editMode}
              onChange={(e) => {
                const newProyecto = e.target.value
                setUpdateUser({ ...updateUser, proyecto: newProyecto })
              }}
            />
            {editMode && (
              <button className="update-data-btn">ACTUALIZAR</button>
            )}
          </form>
        </div>
        <div className="start-test">
          <h1>PRUEBA</h1>
          <hr />
          <h3>Consideraciones</h3>
          <p>La prueba consta de cinco preguntas.</p>
          <p>La prueba consta de un tiempo total de 40 minutos.</p>
          <p>
            La calificación de tu prueba será en base a la información
            registrada en nuestro sistema, por favor valídela.
          </p>
          <p>Tres preguntas teóricas y dos preguntas prácticas.</p>
          <p>
            Cada pregunta va a tener un soporte teórico ó una pequeña aplicación
            tipo calculadora para realizar los cálculos, sin embargo, va a tener
            que interpretar los resultados.
          </p>
          <button onClick={handleStartTest}>COMENZAR PRUEBA</button>
        </div>
      </div>
    </>
  )
}

export default ConfirmData
