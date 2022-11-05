import React, { useState } from 'react'

import css from './TestimonialCarousel.scss'

interface ITestimonial {
  image: string
  text: string
  name: string
  title: string
  mobileImage: string
  altText: string
}

export interface ITestimonialProps {
  data: ITestimonial[]
}

const TestimonialCarousel: React.FC<ITestimonialProps> = (props: ITestimonialProps) => {
  const slides = props.data?.length ? props.data : []
  const [activeIndex, setActiveIndex] = useState(0)
  const [indexArr, setIndexArr] = React.useState<number[]>([])
  const length = slides.length

  const nextSlide = () => {
    setActiveIndex(activeIndex === length - 1 ? 0 : activeIndex + 1)
  }

  const prevSlide = () => {
    setActiveIndex(activeIndex === 0 ? length - 1 : activeIndex - 1)
  }

  const tick = () => {
    setActiveIndex(activeIndex === length - 1 ? 0 : activeIndex + 1)
  }

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 5000)
    return function cleanup() {
      clearInterval(timerID)
    }
  }, [activeIndex])

  React.useEffect(() => {
    const arr = []
    for (let i = 0; i < slides.length; i++) {
      arr.push(i)
    }
    setIndexArr(arr)
  }, [])

  if (!Array.isArray(slides) || slides.length <= 0) {
    return <div />
  }

  return (
    <div>
      <div className={css.container}>
        <div className={css.leftArrow} onClick={prevSlide}>
          <i className="fas fa-arrow-left" />
        </div>
        <div className={css.rightArrow} onClick={nextSlide}>
          <i className="fas fa-arrow-right" />
        </div>

        {slides.map((slide, index) => {
          return (
            <div
              className={index === activeIndex ? `${css.slide} ${css.active}` : `${css.slide} ${css.inactive}`}
              key={index}
            >
              {index === (activeIndex === 0 ? slides.length - 1 : activeIndex - 1) && (
                <div className={css.slideWrapperLeft}>
                  <div className={css.imgGradient}>
                    <img className={css.image} src={slide.image} alt={slide.altText} />
                  </div>
                  <div className={css.unmasked}>
                    <h3 className={css.text}>{slide.text}</h3>
                    <p className={css.name}>{slide.name}</p>
                    <p className={css.title}>{slide.title}</p>
                  </div>
                </div>
              )}
              {index === activeIndex && (
                <div className={css.slideWrapper}>
                  <div className={css.imgGradient}>
                    <img className={css.image} src={slide.image} alt={slide.altText} />
                    <img className={css.mobileImage} src={slide.mobileImage} alt={slide.altText} />
                  </div>
                  <div className={css.unmasked}>
                    <h3 className={css.text}>{slide.text}</h3>
                    <p className={css.name}>{slide.name}</p>
                    <p className={css.title}>{slide.title}</p>
                  </div>
                </div>
              )}
              {index === (activeIndex === slides.length - 1 ? 0 : activeIndex + 1) && (
                <div className={css.slideWrapperRight}>
                  <div className={css.imgGradient}>
                    <img className={css.image} src={slide.image} alt={slide.altText} />
                  </div>
                  <div className={css.unmasked}>
                    <h3 className={css.text}>{slide.text}</h3>
                    <p className={css.name}>{slide.name}</p>
                    <p className={css.title}>{slide.title}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className={css.radioContainer}>
        {indexArr.map((i: number) => (
          <div className={i === activeIndex ? `${css.radio} ${css.active}` : `${css.radio}`} key={i} />
        ))}
      </div>
    </div>
  )
}

export default TestimonialCarousel
