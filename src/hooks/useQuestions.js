import questionContext from '../context/questionContext'
import { useCallback, useState, useContext, useEffect, useRef } from 'react'

// Services
import getService from '../services/getService'
import postService from '../services/postServices'

// URL General
import urlStates from './urlStates'

const useQuestions = () => {
  const { answers, setAnswers } = useContext(questionContext)

  const urlGeneral = useRef(urlStates)

  const sendAnswers = async ({ setRender, idStudent }) => {
    const url = `${urlGeneral.current}/answers`
    try {
      setRender(true)
      const params = { idStudent, answers }
      const data = await postService({ url, params })
      if (data) {
        setRender(false)
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getRating = useCallback(async ({ setRender, id }) => {
    const url = `${urlGeneral.current}/calificacion/${id}`
    try {
      setRender(true)
      const data = await getService({ url })
      if (data) {
        setRender(false)
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return {
    answers,
    setAnswers,
    sendAnswers,
    getRating,
  }
}

export default useQuestions
