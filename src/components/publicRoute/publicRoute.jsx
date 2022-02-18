import { Route, Redirect } from 'react-router-dom'

//Hook
import useUser from '../../hooks/useUser'

const PublicRoute = ({ render: Component, ...rest }) => {
  const { user } = useUser()

  let renderStatus = false
  let renderErrorStatus = false

  if (!user) {
    renderStatus = false
    renderErrorStatus = true
  } else {
    renderStatus = true
  }

  return (
    <Route {...rest}>
      {!renderStatus ? (
        <Component />
      ) : renderErrorStatus ? (
        <Redirect to="/error" />
      ) : (
        <Redirect to="/" />
      )}
    </Route>
  )
}

export default PublicRoute
