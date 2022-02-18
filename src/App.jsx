import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'

import publicRoutes from './routes/publicRoutes'
import privateRoutes from './routes/privateRoutes'

// Context
import { UserContextProvider } from './context/loginContext'

// Rutas
import PrivateRoute from './components/privateRoute/privateRoute'
import PublicRoute from './components/publicRoute/publicRoute'

//Start component
import Start from './components/start/start'

// Errors
import PageNotFound404 from './components/errors/pageNotFound404'
import NotAvailable from './components/errors/notAvailable'

const App = () => {
  const [correctSize, setCorrectSize] = useState(true)
  useEffect(() => {
    const verifyAvailableApp = () => {
      setCorrectSize(true)
      if (window.innerWidth < 320) setCorrectSize(false)
    }
    window.addEventListener('resize', verifyAvailableApp)
  }, [])
  return (
    <>
      {correctSize ? (
        <UserContextProvider>
          <Router>
            <Switch>
              <Route exact={true} path={'/'} component={Start} />
              {publicRoutes.map((route, index) => {
                return (
                  <PublicRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={() => <route.component />}
                  />
                )
              })}
              {privateRoutes.map((route, index) => {
                return (
                  <PrivateRoute
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={() => <route.component />}
                  />
                )
              })}
              <Route path="*">
                <PageNotFound404 />
              </Route>
            </Switch>
          </Router>
        </UserContextProvider>
      ) : (
        <NotAvailable />
      )}{' '}
    </>
  )
}
export default App
