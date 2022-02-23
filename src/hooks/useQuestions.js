import questionContext from '../context/questionContext'
import { useCallback, useContext, useEffect } from 'react'

const useQuestions = () => {
  const { answers, setAnswers } = useContext(questionContext)

  return {
    answers,
    setAnswers,
  }
}

export default useQuestions
