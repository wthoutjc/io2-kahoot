import { useState, createContext } from 'react'

const sessionContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('jwt')))

  return (
    <sessionContext.Provider value={{ user, setUser }}>
      {children}
    </sessionContext.Provider>
  )
}

export default sessionContext
