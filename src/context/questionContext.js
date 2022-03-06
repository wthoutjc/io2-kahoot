import { useState, createContext, useCallback } from 'react'

const questionContext = createContext({})

export function QuestionContextProvider({ children }) {
  const [answers, setAnswers] = useState({
    question1: [null, null],
    question2: [null, null],
    question3: [null, null],
    question4: [null, null],
    question5: [null, null],
  })

  return (
    <questionContext.Provider value={{ answers, setAnswers }}>
      {children}
    </questionContext.Provider>
  )
}

export default questionContext
