import '../../styles/table/table.css'
import { useState, useEffect } from 'react'

const Table = ({ contentTable = null, style }) => {
  const [table, setTable] = useState(null)

  const columns = table?.columns
  const data = table?.rows

  useEffect(() => {
    if (contentTable) setTable({ ...contentTable })
  }, [contentTable])

  return (
    <>
      <table className={style}>
        <thead>
          <tr>
            {columns?.map((column, index) => {
              return <td key={index}>{column}</td>
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => {
            return (
              <tr key={index}>
                {row?.map((dataRow, index) => {
                  return <td key={index}>{dataRow}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Table
