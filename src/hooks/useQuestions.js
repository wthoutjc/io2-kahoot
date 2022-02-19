import { useState } from 'react'

const useQuestions = () => {
  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
  })
  return {
    answers,
    setAnswers,
  }
}

export default useQuestions
