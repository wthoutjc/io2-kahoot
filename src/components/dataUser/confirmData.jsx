import '../../styles/confirmData/confirm-data.css'
import { useEffect, useState } from 'react'

//Hooks
import useUser from '../../hooks/useUser'

// Icons
import * as BsIcons from 'react-icons/bs'

//Components
import Slider from '../slider/slider'

const ConfirmData = () => {
  const { user } = useUser()

  const [editMode, setEditMode] = useState(false)
  const [updateUser, setUpdateUser] = useState({ ...user })

  const [renderSlider, setRenderSlider] = useState(false)

  const handleUpdateInfo = () => {
    console.log(updateUser)
  }

  const handleStartTest = () => {
    setRenderSlider(true)
  }

  if (renderSlider) return <Slider />

  return (
    <>
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
              defaultValue={updateUser.codigo}
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
            <span>Facultad</span>
            <input
              type="text"
              name="facultad"
              id="facultad"
              className={editMode ? 'edit' : 'input-confirm-data'}
              defaultValue={updateUser.facultad}
              readOnly={!editMode}
              onChange={(e) => {
                const newFacultad = e.target.value
                setUpdateUser({ ...updateUser, codigo: newFacultad })
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
            La calificación de tu examen será en base a la información
            registrada en nuestro sistema, por favor valídela.
          </p>
          <p>Tres preguntas teóricas y dos preguntas prácticas.</p>
          <p>
            Cada pregunta va a tener un soporte teórico ó una pequeña aplicación
            tipo calculadora para realizar los cálculos.
          </p>
          <button onClick={handleStartTest}>COMENZAR PRUEBA</button>
        </div>
      </div>
    </>
  )
}

export default ConfirmData
