//Components
import TimeOut from '../components/errors/timeOut'

const publicRoutes = [
  {
    path: '/error',
    name: 'Error',
    component: TimeOut,
    exact: true,
  },
]

export default publicRoutes
