import questionContext from '../context/questionContext'
import { useCallback, useContext, useEffect } from 'react'

const useQuestions = () => {
  const { answers, setAnswers } = useContext(questionContext)

  useEffect(() => {
    console.log(answers)
  }, [answers])

  return {
    answers,
    setAnswers,
  }
}

export default useQuestions
