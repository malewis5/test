import React from 'react'

import css from './AboutGradient.scss'

const global = '../../../../../../static/Global.png'

const AboutGradient = () => {
  return (
    <div className={css.gradientContainer}>
      <div className={css.aboutContents}>
        <div className={css.leftContainer}>
          <h3>From Many, One</h3>
          <p>
            Our diverse team of strategists, technologists, and creatives work in an equally diverse number of locales.
            Our collective experience binds us together, unifying our purpose and infusing and influencing
            everything—from what we create and develop, to what we believe and value.
          </p>
          <div className={css.statsBox}>
            <div className={css.statsTop}>
              <div className={css.stat}>
                <h4>250+</h4>
                <p>Total Employees</p>
              </div>
              <div className={css.stat}>
                <h4>7</h4>
                <p>Countries</p>
              </div>
            </div>
            <div className={css.statsBottom}>
              <div className={css.stat}>
                <h4>4</h4>
                <p>Continents</p>
              </div>
              <div className={css.stat}>
                <h4>18</h4>
                <p>States</p>
              </div>
            </div>
          </div>
        </div>

        <div className={css.rightContainer}>
          <img src={global} />
        </div>
      </div>
    </div>
  )
}

export default AboutGradient
