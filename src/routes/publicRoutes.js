//Components
import TimeOut from '../components/errors/timeOut'
import Ranking from '../components/ranking/ranking'

const publicRoutes = [
  {
    path: '/error',
    name: 'Error',
    component: TimeOut,
    exact: true,
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: Ranking,
    exact: true,
  },
]

export default publicRoutes
