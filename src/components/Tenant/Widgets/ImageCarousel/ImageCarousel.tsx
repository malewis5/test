import React from 'react'

import css from './ImageCarousel.scss'

interface IImage {
  image: string
}

export interface IImageCarouselProps {
  data: IImage[]
}
const ImageCarousel = (props: IImageCarouselProps) => {
  const slides = props.data?.length ? props.data : []

  if (!Array.isArray(slides) || slides.length <= 0) {
    return <div />
  }

  return (
    <div>
      <div className={css.imageCarousel}>
        <div className={css.row}>
          {slides.map((slide, index) => (
            <div key={index} className={css.slide}>
              <img src={slide.image} />
            </div>
          ))}
          {slides.map((slide, index) => (
            <div key={index + slides.length} className={css.slide}>
              <img src={slide.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageCarousel
