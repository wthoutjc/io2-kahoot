import sessionContext from '../context/loginContext'
import { useHistory } from 'react-router-dom'
import { useState, useCallback, useContext, useRef } from 'react'

//Services
import loginService from '../services/loginService'
import logoutService from '../services/logoutService'

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
    async ({ codeStudent, setLoading }) => {
      const url = `${urlGeneral.current}users/${codeStudent}.json`
      try {
        const settigns = {
          headers: {
            method: 'GET',
            Accept: 'application/json',
          },
        }
        setLoading(true)
        const data = await loginService({ url, settigns })
        if (data) {
          setLoading(false)
          if (data[1]) {
            // SIMULAR EL JWT
            setUser(data[0])
            localStorage.setItem('jwt', JSON.stringify(data[0]))
          } else {
            setUser(null)
            localStorage.removeItem('jwt')
          }
          return data
        }
      } catch (error) {
        console.error(error)
        setUser(null)
        localStorage.removeItem('jwt')
      }
    },
    [setUser]
  )

  const logout = useCallback(
    async ({ setRender }) => {
      const url = `${urlGeneral.current}/revokeToken`
      try {
        setRender(true)
        const data = await logoutService(localStorage.getItem('jwt'), url)
        if (data) {
          setRender(false)
          localStorage.removeItem('jwt')
          setUser(null)
        }
      } catch (error) {
        console.error(error)
        setUser(null)
        localStorage.removeItem('jwt')
      }
    },
    [setUser]
  )

  return {
    user,
    login,
    logout,
  }
}

export default useUser
