import Link from 'next/link'
import React, { useState } from 'react'

import ThemedButton from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Button/Button'
import { THEME_BUTTON_TYPES } from '../../../Omnimerse/cms/Frontend/omnistudio-frontend-components/src/Common/Theme/ThemeWrapper'
import css from './VerticalCarousel.scss'

const SmallMark = '../../../../../static/small-mark.svg'
const Modernization = 'https://storage.googleapis.com/peakactivity-site-assets/home/servicesCarousel/modernization.png'
const Optimization = 'https://storage.googleapis.com/peakactivity-site-assets/home/servicesCarousel/optimization.png'
const Innovation = 'https://storage.googleapis.com/peakactivity-site-assets/home/servicesCarousel/innovation.png'
const Engineering = 'https://storage.googleapis.com/peakactivity-site-assets/home/servicesCarousel/engineering.png'
const ModernizationMobile =
  'https://storage.googleapis.com/peakactivity-site-assets/home/servicesCarousel/modernizationMobile.png'
const OptimizationMobile =
  'https://storage.googleapis.com/peakactivity-site-assets/home/servicesCarousel/optimizationMobile.png'
const InnovationMobile =
  'https://storage.googleapis.com/peakactivity-site-assets/home/servicesCarousel/innovationMobile.png'
const EngineeringMobile =
  'https://storage.googleapis.com/peakactivity-site-assets/home/servicesCarousel/engineeringMobile.png'

const VerticalCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [indexArr, setIndexArr] = React.useState<number[]>([])
  React.useEffect(() => {
    const arr = []
    for (let i = 0; i < EquipData.length; i++) {
      arr.push(i)
    }
    setIndexArr(arr)
  }, [])
  let newstate = 0
  interface IActive {
    image: string
    mobileImage: string
    title: string
    text: string
    route: string
    altText: string
  }

  const EquipData: IActive[] = [
    {
      image: Modernization,
      mobileImage: ModernizationMobile,
      title: 'MODERNIZATION',
      text: 'Modernize legacy systems with state-of-the-art technology solutions.',
      route: '/modernization',
      altText:
        'A person in a large warehouse aims a tablet at shelves holding boxes of different sizes. The tablet is showing information related to shipping times.',
    },
    {
      image: Optimization,
      mobileImage: OptimizationMobile,
      title: 'OPTIMIZATION',
      text: 'Increase customer engagement and ROI through continual optimization of your channels.',
      route: '/optimization',
      altText:
        'People are seated in a conference room looking at a woman who is gesturing towards a whiteboard, upon which there is writing.',
    },
    {
      image: Innovation,
      mobileImage: InnovationMobile,
      title: 'INNOVATION',
      text: 'Create unique customer experiences or products through innovative technologies.',
      route: '/innovation',
      altText:
        'A young woman is touching the glass of a store window upon which we see several computer-generated images of dresses in different colors.',
    },
    {
      image: Engineering,
      mobileImage: EngineeringMobile,
      title: 'ENGINEERING SERVICES',
      text: 'Hire seasoned technical talent for your projects, using highly flexible working models.',
      route: '/engineering-services',
      altText: 'A seated man gestures towards his computer screen while two standing women look at his screen.',
    },
  ]

  const ClickCustomer = () => {
    newstate = 0
    setActiveIndex(newstate)
  }
  const ClickCommerce = () => {
    newstate = 1
    setActiveIndex(newstate)
  }
  const ClickMarketing = () => {
    newstate = 2
    setActiveIndex(newstate)
  }
  const ClickTechnology = () => {
    newstate = 3
    setActiveIndex(newstate)
  }
  const tick = () => {
    setActiveIndex(activeIndex === 3 ? 0 : activeIndex + 1)
  }
  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 5000)
    return function cleanup() {
      clearInterval(timerID)
    }
  }, [activeIndex])

  return (
    <div className={css.carouselContainer}>
      <div className={css.patternImage} />
      <img className={css.smallMark} src={SmallMark} />
      <div className={css.textContainer}>
        <h2 className={css.desktopText}>Forward. Always Forward.</h2>
        <h2 className={css.tabletText}>
          Forward. <br />
          Always Forward.
        </h2>
        <p>
          Of the digital marketplace, one thing is certain: it will change. Whether driven by advancements in
          technology, trends in consumer behavior, or other forces, your company must constantly plan and prepare itself
          so it can anticipate and leverage change to its advantage. In other words, wherever you are on your journey,
          progress is paramount.
        </p>
        <p>
          We focus our expertise on four areas. Our services are designed to make your business more profitable, by
          ensuring that you attain—and, more importantly—sustain the forward momentum you need to ensure short and
          long-term success.
        </p>
      </div>
      <div className={css.carousel}>
        <div className={css.selectionContainer}>
          <p>OUR SERVICES</p>
          <div className={css.selections}>
            <div onClick={ClickCustomer}>
              <div className={activeIndex === 0 ? `${css.selection} ${css.activeSelect}` : `${css.selection}`}>
                <h3>Modernization</h3>
                <i className={activeIndex === 0 ? 'fas fa-arrow-right' : `${css.noArrow}`} />
              </div>
            </div>
            <div onClick={ClickCommerce}>
              <div className={activeIndex === 1 ? `${css.selection} ${css.activeSelect}` : `${css.selection}`}>
                <h3>Optimization</h3>
                <i className={activeIndex === 1 ? 'fas fa-arrow-right' : `${css.noArrow}`} />
              </div>
            </div>
            <div onClick={ClickMarketing}>
              <div className={activeIndex === 2 ? `${css.selection} ${css.activeSelect}` : `${css.selection}`}>
                <h3>Innovation</h3>
                <i className={activeIndex === 2 ? 'fas fa-arrow-right' : `${css.noArrow}`} />
              </div>
            </div>
            <div onClick={ClickTechnology}>
              <div className={activeIndex === 3 ? `${css.selection} ${css.activeSelect}` : `${css.selection}`}>
                <h3> Engineering Services</h3>
                <i className={activeIndex === 3 ? 'fas fa-arrow-right' : `${css.noArrow}`} />
              </div>
            </div>
          </div>
        </div>
        <div className={css.contentContainer}>
          {EquipData.map((data: IActive, index) => {
            return (
              <div className={index === activeIndex ? `${css.content} ${css.active}` : `${css.content}`} key={index}>
                {index === activeIndex && (
                  <Link href={data.route}>
                    <a>
                      <div className={css.contentWrapper}>
                        <img className={css.desktopImg} src={data.image} />
                        <img className={css.mobileImg} src={data.mobileImage} />
                        <div className={css.mask} />
                        <div className={css.unmasked}>
                          <div className={css.slideCategory}>{data.title}</div>
                          <div className={css.slideText}>{data.text}</div>
                          <Link href={data.route}>
                            <a>
                              <div className={css.button}>
                                <ThemedButton type={THEME_BUTTON_TYPES.PRIMARY}>LEARN MORE</ThemedButton>
                              </div>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </a>
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div className={css.radioContainer}>
        {indexArr.map((i: number) => (
          <div
            onClick={() => setActiveIndex(i)}
            className={i === activeIndex ? `${css.radio} ${css.active}` : `${css.radio}`}
            key={i}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default VerticalCarousel
