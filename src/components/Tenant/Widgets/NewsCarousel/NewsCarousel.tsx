import Link from 'next/link'
import React from 'react'

import css from './NewsCarousel.scss'

interface INews {
  icon: string
  text: string
  route: string
}

export interface INewsCarouselProps {
  data: INews[]
}

const NewsCarousel = (props: INewsCarouselProps) => {
  const slides = props.data?.length ? props.data : []
  const [current, setCurrent] = React.useState(0)
  const length = slides.length

  const tick = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 5000)
    return function cleanup() {
      clearInterval(timerID)
    }
  }, [current])

  if (!Array.isArray(slides) || slides.length <= 0) {
    return <div />
  }

  return (
    <div className={css.newsContainer}>
      <div>
        {slides.map((res, index) => (
          <React.Fragment key={index}>
            <div className={index === current ? `${css.slide} ${css.active}` : `${css.slide}`}>
              {index === current && (
                <div className={css.newsWrapper} key={index}>
                  <div className={css.image}>
                    <Link href={res.route}>
                      <a>
                        <img src={res.icon} />
                      </a>
                    </Link>
                  </div>
                  <Link href={res.route}>
                    <a>
                      <div className={css.textContainer}>
                        <p className={css.newsHeader}>In the News</p>
                        <h3 className={css.newsText}>{res.text}</h3>
                      </div>
                    </a>
                  </Link>
                  <div className={css.arrows}>
                    <div className={css.leftArrow} onClick={prevSlide}>
                      <i className="fas fa-arrow-left" />
                    </div>
                    <div className={css.rightArrow} onClick={nextSlide}>
                      <i className="fas fa-arrow-right" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default NewsCarousel
