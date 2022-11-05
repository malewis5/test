import React from 'react'

import Cards from './Cards'
import Headers from './Headers'
import css from './LogoSection.scss'

const LogoSection = () => {
  const [logoIndex, setLogoIndex] = React.useState(0)
  return (
    <div className={css.background}>
      <Headers logoIndex={logoIndex} setLogoIndex={setLogoIndex} />
      <div className={css.text}>
        <h2>The Company We Keep</h2>
        <p style={{ marginTop: 15 }}>
          In order to provide you with the latest technologies that best suit your particular business requirements, we
          are proud to have established relationships — through formal partnerships or advanced certification — with the
          best-in-class technologies and tools.
        </p>
      </div>
      <Cards logoIndex={logoIndex} />
    </div>
  )
}

export default LogoSection
