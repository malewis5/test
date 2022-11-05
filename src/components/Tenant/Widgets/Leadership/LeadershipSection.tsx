import React from 'react'

import Modal from '../../Common/Modal/Modal'
import css from './LeadershipSection.scss'

const LeadershipSection = () => {
  const [hover, setHover] = React.useState<any>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [selectedData, setSelectedData] = React.useState<any>()
  const photoData = [
    {
      firstName: 'Andrew',
      lastName: 'Boyland',
      title: 'PRESIDENT',
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/andrew.jpeg',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/andrew.png',
      bio: 'Born and raised on Long Island, Andrew moved to New York City after graduating from Binghamton University, where he studied philosophy and law. After 25 years in the city that never sleeps, Andrew relocated to Florida, where he currently leads PeakActivity and RevCommerce, PeakActivity’s sister company, and its new headless eCommerce product. Andrew excels in developing and leading early-to-middle stage companies through their growth phases, and has served in executive management roles at several public and private technology ventures, including Levatas Ventures, SweetskinZ, and Automated Travel Systems, Inc., among others. As an operating executive at Cheyenne Software, Inc. he helped facilitate its sale to Computer Associates for over $1 billion in 1996. Besides being a proud dad, Andrew is a big bike riding enthusiast.',

      onHover: hover,
      id: 0,
      linkedIn: 'https://www.linkedin.com/in/andrewboyland/',
    },
    {
      firstName: 'Melissa ',
      lastName: 'Crow',
      title: 'HEAD OF OPERATIONS',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/mel.png',
      bio: "Born in St. Cloud, Minnesota, Melissa attended Florida Atlantic University, where she studied management and marketing. In her role as Head of Operations, Melissa devises the cross-functional teams and scalable processes required to execute on our clients' visions and deliver great outcomes. Outside of PeakActivity, Melissa is a reader of anything and everything, and loves how books help open our minds to different perspectives in all aspects of our lives, both business and personal. She’s also a huge animal lover and currently shares her home with four rescue dogs that she spoils rotten.",
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/melissa.jpeg',
      onHover: hover,
      id: 1,
      linkedIn: 'https://www.linkedin.com/in/melissacrow/',
    },
    {
      firstName: 'Manish B.',
      lastName: 'Hirapara',
      title: 'CHIEF EXECUTIVE OFFICER',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/manish.png',
      bio: 'Raised in South Florida, Manish has led PeakActivity to become one of the fastest-growing digital strategy and technology implementation companies in the United States. Prior to founding PeakActivity, Manish oversaw the eCommerce efforts for a large global retailer, where he was responsible for an eCommerce platform that transacted over $7 billion in global revenue. Always keen to elevate his communities, Manish sits on the Alumni Board of Directors at UCF, the board of The Broward College Entrepreneurial Experience (BCEx), is a member of the Palm Beach chapter of the YPO, a member of the Economic Council of Palm Beach County, and is a charter member on the board of the NSU Broward Center for Innovation. In his personal time, Manish is an avid traveler, hiker, and has yet to meet a food that he doesn’t like.',
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/manish.jpeg',
      onHover: hover,
      id: 2,
      linkedIn: 'https://www.linkedin.com/in/manishhirapara/',
    },
    {
      firstName: 'Sara',
      lastName: 'Meza',
      title: 'HEAD OF DIGITAL STRATEGY',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/sara.png',
      bio: 'Born in LaCrosse, Wisconsin, Sara leads the Digital Strategy and eCommerce capabilities at PeakActivity. With a degree in Business Administration from the University of Wisconsin-LaCrosse, Sara has launched, led, and grown numerous websites over the course of her career from start-ups to businesses with over $4 billion in annual revenue. In addition, Sara launched enterprise-level order management systems, omnichannel solutions, and both site and marketing personalization. Sara extols what she considers to be her three guiding principles: always put the needs of the customer first, data analytics are the vital signs of a company, and you need to be able to adapt quickly to changes in the market. In her free time, Sara enjoys traveling to new places, doting on her Labradoodle, and spending quality time with family and friends.',
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/sara.jpeg',
      onHover: hover,
      id: 3,
      linkedIn: 'https://www.linkedin.com/in/sarameza/',
    },
    {
      firstName: 'Rob',
      lastName: 'Petrosino',
      title: 'HEAD OF INNOVATION',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/rob.jpg',
      bio: "Despite being happily rooted in South Florida, Rob hails from Hackensack, New Jersey and attended college in Worcester, Massachusetts. His curiosity for innovation began while studying New Media & Digital Arts at The College of the Holy Cross, where he paid close attention to the intersections between art, technology, and culture. From there, his excitement for technology led to a role strategizing with C-Suite executives and implementing breakthrough solutions. At PeakActivity, Rob spearheads efforts around emerging technologies, such as spatial computing and machine learning, and instilling innovation in established businesses. Rob is known for his keen insights on cutting edge technology and his passion for all things digital. He is also a foodie, and so we wouldn't be surprised if he finds a way to combine his passions soon (food technology, anyone?).",
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/rob.jpeg',
      onHover: hover,
      id: 4,
      linkedIn: 'https://www.linkedin.com/in/robpetrosino/',
    },
    {
      firstName: 'Ali',
      lastName: 'Riveira',
      title: 'HEAD OF TECH SOLUTIONS',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/ali.png',
      bio: 'Originally from Connecticut and raised in Bradenton, Florida, Ali leads technology solutions for PeakActivity, where she is responsible for delivering the best technical solutions for our clients and partners. For more than 20 years, Ali has been a recognized change leader in the fields of eCommerce, technology, analytics, and marketing, helping to evangelize and implement new technologies and ways of working. She has held executive roles at marketing agencies and digital publishing companies, as well as national retailers. Ali earned her undergraduate degree from Palm Beach Atlantic University, where she studied psychology and dance (who knew?) and received her MBA in International Business from Florida Atlantic University. Ali is married and a proud parent to two adorable kids. She enjoys daily runs to recharge, and recently finished her second half-marathon.',
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/ali.jpeg',
      onHover: hover,
      id: 5,
      linkedIn: 'https://www.linkedin.com/in/alisonriveira/',
    },
    {
      firstName: 'Cheri',
      lastName: 'Siedle',

      title: 'HEAD OF PEOPLE & CULTURE',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/cheri.png',
      bio: 'Hailing from Orlando, FL, Cheri migrated to South Florida where she has resided since 2000. Cheri heads up Human Resources for PeakActivity, where she oversees recruiting, training and development, performance management and human resources operations. Prior to this role, Cheri led Technology Solutions for PeakActivity, and managed core IT areas and eCommerce for a Fortune 150 company, where she was responsible for consumer and business desktop and mobile websites. She believes in constructive communication and demonstrates an exceptional ability to manage diverse teams across various geographies, and with wide-ranging skill sets. Having visited 42 countries (and counting), Cheri finds that the education and understanding that comes from traveling the world are priceless. On most weekends, Cheri and her family enjoy taking dive trips in the Florida Keys (who wouldn’t?).',
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/cheri.jpeg',
      onHover: hover,
      id: 6,
      linkedIn: 'https://www.linkedin.com/in/cherisiedle/',
    },
    {
      firstName: 'Jeffrey',
      lastName: 'Wilks',
      title: 'CHIEF REVENUE OFFICER',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/jeff.png',
      bio: 'Hailing from New Canaan, Connecticut, Jeffrey joins PeakActivity as its first Chief Revenue Officer, responsible for business development and client success. Jeffrey has extensive experience driving revenue growth for preeminent technology companies, eCommerce platforms and marketplaces, and marketing agencies. He brings a broad perspective as to what is required to compete in today’s business environment, having led sales and marketing teams at Pond5, Experian, eBay, Ogilvy, and other companies at various stages of growth. In addition to spending time with his family, Jeffrey is an avid skier, rock climber, and tennis enthusiast.',
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/jeffrey.jpeg',
      onHover: hover,
      id: 8,
      linkedIn: 'https://www.linkedin.com/in/jeffrey-wilks-35126115/',
    },
    {
      firstName: 'Rajeeb',
      lastName: 'Mohapatra',
      title: 'BOARD ADVISOR',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/defaultLightbox.png',
      bio: 'Rajeeb is an advisor to PeakActivity’s executive team, providing counsel on strategic growth and product innovation. Born in Bhubaneswar, India, Rajeeb has a Masters in Computer Sciences from the National Institute of Technology in Warangal, India, and an MBA from The Fuqua School of Business at Duke University. His extensive experience as a product leader spans several global companies over the course of his career, including Pitney Bowes, Dell, PayPal, and Office Depot. In his personal life, Rajeeb enjoys reading, traveling, hiking, and when he can find the time, he also loves to paint. ',
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/rajeeb.jpeg',
      onHover: hover,
      id: 9,
      linkedIn: 'https://www.linkedin.com/in/rajeebmohapatra/',
    },
    {
      firstName: 'Mark',
      lastName: 'Landry',
      title: 'BOARD ADVISOR',
      lifestyle: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/lifestyle/defaultLightbox.png',
      bio: 'Mark is an advisor to PeakActivity’s executive team, providing counsel on important aspects of the business by tapping into his long history of corporate experience and executive leadership. Mark had an impressive career with Unilever spanning more than 20 years, where he worked in finance, supply chain, IT, and general , eventually leading its consolidation and unification of 16 European countries into one powerful European company. After Europe, he successfully led major acquisitions, the overall transformation of North America’s $8 billion personal care business, and a management buyout of brands from Unilever, Colgate Palmolive and Procter and Gamble. Since 2015, as CEO of Arrow Digital, Mark built and led a strong leadership team which generated significant growth in sales and EBITDA, culminating in Arrow’s sale to Softvision in July of 2018.',
      url: 'https://storage.googleapis.com/peakactivity-site-assets/leadership/headshots/mark.jpeg',
      onHover: hover,
      id: 10,
      linkedIn: 'https://www.linkedin.com/in/mark-landry-181b57152/',
    },
  ]
  const ViewProfile = (e: any) => {
    setShowModal(true)
    setSelectedData(e)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  function OutsideAlerter() {
    return (
      <Modal onClose={toggleModal} showTitle={false} closeIcon width="713px">
        <div className={css.modalContainer}>
          <div className={css.modalCard}>
            <div className={css.card}>
              <div className={css.items}>
                <svg
                  onClick={() => setShowModal(!showModal)}
                  className={css.x}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 18 18"
                >
                  <path
                    fill="#FFFFFF"
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                  />
                </svg>
                <img className={css.modalImage} src={selectedData?.lifestyle} />
              </div>
            </div>
            <div className={css.modalText}>
              <h2 className={css.modalTitle}>
                {selectedData?.firstName} {selectedData?.lastName}
                <a href={selectedData.linkedIn} target={'_blank'} rel="noreferrer">
                  <svg
                    className={css.linkedin}
                    xmlns="http://www.w3.org/2000/svg"
                    width="19px"
                    height="19px"
                    viewBox="0 0 19 19"
                    version="1.1"
                  >
                    <title>4F66EDE2-4C44-4F65-8798-82B05D191673</title>
                    <g id="Desktop" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g
                        id="PeakActivity_LeadershipLB-2"
                        transform="translate(-699.000000, -767.000000)"
                        fill="#839398"
                      >
                        <g id="Leadership-LB" transform="translate(344.000000, 318.000000)">
                          <path
                            d="M370.926819,464.507692 C370.926819,464.73905 370.73905,464.926819 370.507692,464.926819 L367.992931,464.926819 C367.761573,464.926819 367.573805,464.73905 367.573805,464.507692 L367.573805,459.897297 C367.573805,458.847804 367.103544,458.22079 366.316424,458.22079 C365.529304,458.22079 365.059044,458.847804 365.059044,459.897297 L365.059044,464.507692 C365.059044,464.73905 364.871275,464.926819 364.639917,464.926819 L362.125156,464.926819 C361.893798,464.926819 361.706029,464.73905 361.706029,464.507692 L361.706029,456.125156 C361.706029,455.893798 361.893798,455.706029 362.125156,455.706029 L364.639917,455.706029 C364.871275,455.706029 365.059044,455.893798 365.059044,456.125156 L365.059044,456.388368 C365.603909,455.962535 366.246011,455.706029 367.154678,455.706029 C369.445625,455.706029 370.926819,457.350683 370.926819,459.897297 L370.926819,464.507692 Z M359.191268,454.867775 C358.266674,454.867775 357.514761,454.115862 357.514761,453.191268 C357.514761,452.266674 358.266674,451.514761 359.191268,451.514761 C360.115862,451.514761 360.867775,452.266674 360.867775,453.191268 C360.867775,454.115862 360.115862,454.867775 359.191268,454.867775 L359.191268,454.867775 Z M360.867775,464.507692 C360.867775,464.73905 360.680007,464.926819 360.448649,464.926819 L357.933888,464.926819 C357.70253,464.926819 357.514761,464.73905 357.514761,464.507692 L357.514761,456.125156 C357.514761,455.893798 357.70253,455.706029 357.933888,455.706029 L360.448649,455.706029 C360.680007,455.706029 360.867775,455.893798 360.867775,456.125156 L360.867775,464.507692 Z M371.765073,449 L356.676507,449 C355.751914,449 355,449.751914 355,450.676507 L355,465.765073 C355,466.689667 355.751914,467.44158 356.676507,467.44158 L371.765073,467.44158 C372.689667,467.44158 373.44158,466.689667 373.44158,465.765073 L373.44158,450.676507 C373.44158,449.751914 372.689667,449 371.765073,449 L371.765073,449 Z"
                            id="Fill-111"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </a>
              </h2>
              <div className={css.photoTitle}> {selectedData?.title}</div>
              <div className={css.bodyText}>
                <div style={{ marginBottom: 40 }}> {selectedData?.bio}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <div>
      <div className={css.cards}>
        {photoData.map((profile, i) => {
          return (
            <div
              onClick={() => ViewProfile(profile)}
              key={i}
              onMouseOver={() => setHover(i)}
              onMouseLeave={() => setHover(!i)}
              className={css.photoBoxDesktop}
              style={{
                // eslint-disable-next-line no-useless-concat
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, #000000 100%),url(${profile.url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              {profile?.onHover === profile.id ? (
                <div className={css.buttonContainer}>
                  <button className={css.hoverButton}>VIEW PROFILE</button>
                </div>
              ) : (
                <div className={css.title}>
                  <div className={css.photoName}>
                    {profile.firstName} <br />
                    {profile.lastName}
                  </div>
                  <div className={css.photoTitle}>{profile.title}</div>
                </div>
              )}
            </div>
          )
        })}
        {photoData.map((e, i) => {
          return (
            <div
              onClick={() => ViewProfile(e)}
              key={i}
              className={css.photoBoxMobile}
              style={{
                // eslint-disable-next-line no-useless-concat
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, #000000 100%),url(${e.url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <div className={css.title}>
                <div className={css.photoName}>
                  {e.firstName} <br />
                  {e.lastName}
                </div>
                <div className={css.photoTitle}>{e.title}</div>
              </div>

              <div className={css.mask} />
            </div>
          )
        })}
      </div>
      {showModal && <OutsideAlerter />}
    </div>
  )
}

export default LeadershipSection
