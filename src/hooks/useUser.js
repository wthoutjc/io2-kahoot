import sessionContext from '../context/loginContext'
import { useHistory } from 'react-router-dom'
import { useState, useCallback, useContext, useRef } from 'react'

//Services
import postService from '../services/postServices'
import getService from '../services/getService'

//URL States
import urlStates from './urlStates'

const useUser = () => {
  // Administración de JWT
  const { user, setUser } = useContext(sessionContext)

  // Estado global de URL de backend: prod or dev stage
  const urlGeneral = useRef(urlStates)

  // Redireccionamientos
  const history = useHistory()

  const login = useCallback(
    async ({ idStudent, setLoading }) => {
      const url = `${urlGeneral.current}/login`
      try {
        setLoading(true)
        const params = { idStudent }
        const data = await postService({ url, params })
        if (data) {
          setLoading(false)
          if (data[1]) {
            setUser(data[0])
            localStorage.setItem('jwtStudent', data[0])
          } else {
            setUser(null)
            localStorage.removeItem('jwtStudent')
          }
          return data
        }
      } catch (error) {
        console.error(error)
        setUser(null)
        localStorage.removeItem('jwtStudent')
      }
    },
    [setUser]
  )

  const verifyJWT = useCallback(
    async ({ setRender }) => {
      const url = `${urlGeneral.current}/verifyJWT`
      try {
        setRender(true)
        const data = await getService({ url })
        if (data) setRender(false)
        if (!data[1]) {
          setUser(null)
          localStorage.removeItem('jwtStudent')
          history.push('/error')
          return false
        }
        return true
      } catch (error) {
        console.error(error)
      }
    },
    [setUser, history]
  )

  return {
    user,
    login,
    verifyJWT,
  }
}

export default useUser
