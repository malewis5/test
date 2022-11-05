import React, { useRef, useState } from 'react'

import ThemedButton from '../../Common/Button/ThemedButton'
import { THEME_BUTTON_TYPES } from '../../Common/Theme/ThemeWrapper'
import css from './JobsSection.scss'

const JobList = ({ allJobs /*jobIndex*/ }: any) => {
  const [active, setActive] = useState<number>(-1)
  const itemsRef: any = useRef([])
  const type = THEME_BUTTON_TYPES.PRIMARY
  const type_secondary = THEME_BUTTON_TYPES.SECONDARY
  const jazzSubdomainUrl = `https://peakactivity.applytojob.com/`
  const jazzJobApplyUrl = `${jazzSubdomainUrl}apply/`
  const jazzJobShareUrl = `${jazzSubdomainUrl}app/share/`
  // you can access the elements with itemsRef.current[n]

  //console.log(jobIndex)
  // const jobFilter = jobIndex === 0 ? allJobs : jobIndex === 1 ? allJobs.filter(e => )
  const handleToggle = (index: number) => {
    if (index === active) {
      setActive(-1)
    } else {
      setActive(index)
      setTimeout(() => {
        const currentItem = itemsRef?.current[index]
        currentItem.scrollIntoView?.({
          behavior: 'smooth',
        })
      })
    }
  }
  return (
    <div>
      {allJobs.map((job: React.SetStateAction<any>, index: number) => {
        return (
          <div key={index} ref={(el) => (itemsRef.current[index] = el)} className={css.jobContainer}>
            {index !== 0 && <hr className={css.line} />}
            <div onClick={() => handleToggle(index)}>
              <div className={css.jobCat}>{job?.department?.toUpperCase()}</div>
              <div className={css.title}>{job.title}</div>
              <button onClick={() => handleToggle(index)} className={css.detailsButton}>
                {active === index ? 'HIDE' : 'VIEW'} DETAILS
              </button>
            </div>

            {active === index ? (
              <div className={css.body}>
                <hr className={css.line} />

                <div dangerouslySetInnerHTML={{ __html: `${job.description}` }} />
                {job.board_code && (
                  <div className={css.jobsButtons}>
                    <a href={`${jazzJobApplyUrl}${job.board_code}`} target="_blank" rel="noreferrer">
                      <div className={css.contactBtn}>
                        <ThemedButton type={type}>APPLY NOW</ThemedButton>
                      </div>
                    </a>
                    <a href={`${jazzJobShareUrl}${job.board_code}`} target="_blank" rel="noreferrer">
                      <div className={css.contactBtn}>
                        <ThemedButton type={type_secondary}>SHARE THIS</ThemedButton>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default JobList
