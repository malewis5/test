import React from 'react'

import css from './JobsHeader.scss'
import { filtersMap } from './utils'

const Header = ({
  jobIndex,
  setJobIndex,
}: {
  jobIndex: number
  setJobIndex: React.Dispatch<React.SetStateAction<number>>
}) => {
  const filter = (e: any) => {
    const change =
      e.target.value === '0'
        ? setJobIndex(0)
        : e.target.value === '1'
        ? setJobIndex(1)
        : e.target.value === '2'
        ? setJobIndex(2)
        : e.target.value === '3'
        ? setJobIndex(3)
        : e.target.value === '4'
        ? setJobIndex(4)
        : e.target.value === '5'
        ? setJobIndex(5)
        : e.target.value === '6'
        ? setJobIndex(6)
        : null
    return change
  }

  return (
    <div>
      <div className={css.headers}>
        {filtersMap.map((filterOpt) => {
          return (
            <p
              key={filterOpt.label}
              className={`${jobIndex === filterOpt.value ? css.clicked : css.notClicked}`}
              onClick={() => setJobIndex(filterOpt.value)}
            >
              {filterOpt.label}
            </p>
          )
        })}
      </div>
      <div className={css.dropdown}>
        <select className={css.dropInput} defaultValue={0} onChange={filter}>
          <option value="0">ALL</option>
          <option value="1"> SALES </option>
          <option value="2"> BUSINESS ADMIN</option>
          <option value="3"> MARKETING</option>
          <option value="4"> DESIGN</option>
          <option value="5"> DEVELOPMENT</option>
        </select>
      </div>
    </div>
  )
}

export default Header
