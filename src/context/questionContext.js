import { useState, createContext } from 'react'

const questionContext = createContext({})

export function QuestionContextProvider({ children }) {
  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
  })

  return (
    <questionContext.Provider value={{ answers, setAnswers }}>
      {children}
    </questionContext.Provider>
  )
}

export default questionContext
