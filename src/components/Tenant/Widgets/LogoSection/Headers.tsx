import React from 'react'

import css from './LogoSection.scss'

const LogoSection = ({
  logoIndex,
  setLogoIndex,
}: {
  logoIndex: number
  setLogoIndex: React.Dispatch<React.SetStateAction<number>>
}) => {
  const filter = (e: any) => {
    const change =
      e.target.value === '0'
        ? setLogoIndex(0)
        : e.target.value === '1'
        ? setLogoIndex(1)
        : e.target.value === '2'
        ? setLogoIndex(2)
        : e.target.value === '3'
        ? setLogoIndex(3)
        : e.target.value === '4'
        ? setLogoIndex(4)
        : e.target.value === '5'
        ? setLogoIndex(5)
        : e.target.value === '6'
        ? setLogoIndex(6)
        : null
    return change
  }

  return (
    <div>
      <div className={css.headers}>
        <p className={`${logoIndex === 0 ? css.clicked : css.notClicked}`} onClick={() => setLogoIndex(0)}>
          ALL
        </p>
        <p className={`${logoIndex === 1 ? css.clicked : css.notClicked}`} onClick={() => setLogoIndex(1)}>
          DATA & ANALYTICS
        </p>
        <p className={`${logoIndex === 2 ? css.clicked : css.notClicked}`} onClick={() => setLogoIndex(2)}>
          TESTING & OPTIMIZATION
        </p>
        <p className={`${logoIndex === 3 ? css.clicked : css.notClicked}`} onClick={() => setLogoIndex(3)}>
          CLOUD INFRASTRUCTURE
        </p>
        <p className={`${logoIndex === 4 ? css.clicked : css.notClicked}`} onClick={() => setLogoIndex(4)}>
          EMERGING TECH
        </p>
        <p className={`${logoIndex === 5 ? css.clicked : css.notClicked}`} onClick={() => setLogoIndex(5)}>
          ECOMMERCE PLATFORMS
        </p>
        <p className={`${logoIndex === 6 ? css.clicked : css.notClicked}`} onClick={() => setLogoIndex(6)}>
          MARKETING
        </p>
      </div>
      <div className={css.dropdown}>
        <select className={css.dropInput} onChange={filter}>
          <option selected disabled hidden>
            Filter: ALL
          </option>
          <option value="0">ALL</option>
          <option value="1"> DATA & ANALYTICS</option>
          <option value="2"> TESTING & OPTIMIZATION</option>
          <option value="3"> CLOUD INFRASTRUCTURE</option>
          <option value="4"> EMERGING TECH</option>
          <option value="5"> ECOMMERCE PLATFORMS</option>
          <option value="6"> MARKETING</option>
        </select>
      </div>
    </div>
  )
}

export default LogoSection
