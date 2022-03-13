import '../../styles/ranking/ranking.css'
import { useState, useEffect } from 'react'

// Hooks
import useQuestions from '../../hooks/useQuestions'

// Components
import LoadingServer from '../loaders/loadingServer'
import Table from '../table/table'

const Ranking = () => {
  const [render, setRender] = useState(false)

  const { getRanking } = useQuestions()

  const [contentTable, setContentTable] = useState({
    columns: ['Nombre', 'Puntaje'],
    rows: null,
  })

  useEffect(() => {
    getRanking({ setRender }).then((res) => {
      setContentTable({
        columns: ['Nombre', 'Puntaje'],
        rows: Array.isArray(res[0]) ? res[0] : [[`${res[0]}`, '']],
      })
    })
  }, [getRanking])

  return (
    <>
      <LoadingServer render={render} />
      <div className="ranking-container">
        <div className="ranking">
          <h1>Tabla de puntaje:</h1>
          <p>Estos son los resultados obtenidos hasta el momento</p>
          <Table contentTable={contentTable} style={'ranking-table'} />
        </div>
      </div>
    </>
  )
}

export default Ranking
