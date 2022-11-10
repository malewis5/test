import { Col, IBlogOptions, Row } from '@peakactivity/merce-shared-frontend-components'
import React, { useState } from 'react'

import ThemedButton from '../../../Common/Button/ThemedButton'
import { THEME_BUTTON_TYPES } from '../../../Common/Theme/ThemeWrapper'
import SubscribeModal from '../../../Widgets/Hubspot/SubscribeModal/SubscribeModal'
import { IBlogPostPage } from '../'
import BlogThumbnail from '../BlogThumbnail/BlogThumbnail'
import FeaturedBlogs from '../FeaturedBlog/FeaturedBlog'
import css from './BlogLanding.scss'

export interface IBlogLandingProps {
  blogs: IBlogPostPage[]
  featureBlog: IBlogPostPage[]
  options?: IBlogOptions
}

const BlogLanding: React.FC<IBlogLandingProps> = ({ blogs, featureBlog, options }) => {
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [signUpModal, setSignUpModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [limit, setLimit] = useState(9)

  const loadMore = () => {
    if (window.innerWidth < 767) {
      setLimit(limit + 3)
    } else {
      setLimit(limit + 9)
    }
  }
  React.useEffect(() => {
    if (window.innerWidth < 767) {
      setLimit(3)
    } else {
      setLimit(9)
    }
  }, [categoryIndex])

  const modernizationBlogs = blogs.filter((page) => page.tags.toLowerCase().includes('modernization'))
  const optimizationBlogs = blogs.filter((page) => page.tags.toLowerCase().includes('optimization'))
  const innovationBlogs = blogs.filter((page) => page.tags.toLowerCase().includes('innovation'))
  const engineeringBlogs = blogs.filter((page) => page.tags.toLowerCase().includes('engineering services'))
  const generalBlogs = blogs.filter((page) => page.tags.toLowerCase().includes('general'))

  const length =
    categoryIndex === 0
      ? blogs.length
      : categoryIndex === 1
      ? modernizationBlogs.length
      : categoryIndex === 2
      ? optimizationBlogs.length
      : categoryIndex === 3
      ? innovationBlogs.length
      : categoryIndex === 4
      ? engineeringBlogs.length
      : categoryIndex === 5
      ? generalBlogs.length
      : 0

  const filter = (e: any) => {
    const change =
      e.target.value === '0'
        ? setCategoryIndex(0)
        : e.target.value === '1'
        ? setCategoryIndex(1)
        : e.target.value === '2'
        ? setCategoryIndex(2)
        : e.target.value === '3'
        ? setCategoryIndex(3)
        : e.target.value === '4'
        ? setCategoryIndex(4)
        : e.target.value === '5'
        ? setCategoryIndex(5)
        : null
    return change
  }

  return (
    <>
      {signUpModal && <SubscribeModal onClose={() => setSignUpModal(false)} />}
      <div className={css.pageHeader}>
        <Row>
          <Col md={8} sm={12}>
            <div>
              <p>INSIGHTS</p>
              <h2>Insights, Ideas, and POVs From The Peak</h2>
            </div>
          </Col>
          <Col md={4} sm={12}>
            <div className={css.signUpBtn} onClick={() => setSignUpModal(true)}>
              <ThemedButton type={THEME_BUTTON_TYPES.SECONDARY}>SIGN UP FOR MORE INSIGHTS IN YOUR INBOX</ThemedButton>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          <FeaturedBlogs blogs={featureBlog} />
        </Col>
      </Row>
      <div className={css.blogPostContainer}>
        <Row>
          <Row>
            <Col>
              <div className={css.categories}>
                <p
                  className={`${categoryIndex === 0 ? css.clicked : css.notClicked}`}
                  onClick={() => setCategoryIndex(0)}
                >
                  ALL
                </p>
                <p
                  className={`${categoryIndex === 1 ? css.clicked : css.notClicked}`}
                  onClick={() => setCategoryIndex(1)}
                >
                  MODERNIZATION
                </p>
                <p
                  className={`${categoryIndex === 2 ? css.clicked : css.notClicked}`}
                  onClick={() => setCategoryIndex(2)}
                >
                  OPTIMIZATION
                </p>
                <p
                  className={`${categoryIndex === 3 ? css.clicked : css.notClicked}`}
                  onClick={() => setCategoryIndex(3)}
                >
                  INNOVATION
                </p>
                <p
                  className={`${categoryIndex === 4 ? css.clicked : css.notClicked}`}
                  onClick={() => setCategoryIndex(4)}
                >
                  ENGINEERING SERVICES
                </p>
                <p
                  className={`${categoryIndex === 5 ? css.clicked : css.notClicked}`}
                  onClick={() => setCategoryIndex(5)}
                >
                  GENERAL
                </p>
                <input
                  type="text"
                  placeholder="Search Archives..."
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onClick={() => setCategoryIndex(10)}
                />
              </div>
              <div className={css.mobileDropdown}>
                <select className={css.dropInput} defaultValue="0" onChange={filter}>
                  <option value="0">ALL</option>
                  <option value="1"> MODERNIZATION</option>
                  <option value="2"> OPTIMIZATION</option>
                  <option value="3"> INNOVATION</option>
                  <option value="4"> ENGINEERING SERVICES</option>
                  <option value="5"> GENERAL</option>
                </select>
              </div>
            </Col>
          </Row>
          <Col>
            <div className={css.blogPosts}>
              {blogs.slice(0, limit).map((page: IBlogPostPage, index: number) => {
                if (categoryIndex === 0) {
                  return (
                    <React.Fragment key={index}>
                      <div className={css.posts}>
                        <BlogThumbnail post={page} options={options} />
                      </div>
                    </React.Fragment>
                  )
                }
                return <div key={index}></div>
              })}
              {modernizationBlogs.slice(0, limit).map((page: IBlogPostPage, index: number) => {
                if (categoryIndex === 1) {
                  return (
                    <React.Fragment key={index}>
                      <div className={css.posts}>
                        <BlogThumbnail post={page} options={options} />
                      </div>
                    </React.Fragment>
                  )
                }
                return <div key={index}></div>
              })}
              {optimizationBlogs.slice(0, limit).map((page: IBlogPostPage, index: number) => {
                if (categoryIndex === 2) {
                  return (
                    <React.Fragment key={index}>
                      <div className={css.posts}>
                        <BlogThumbnail post={page} options={options} />
                      </div>
                    </React.Fragment>
                  )
                }
                return <div key={index}></div>
              })}
              {innovationBlogs.slice(0, limit).map((page: IBlogPostPage, index: number) => {
                if (categoryIndex === 3) {
                  return (
                    <React.Fragment key={index}>
                      <div className={css.posts}>
                        <BlogThumbnail post={page} options={options} />
                      </div>
                    </React.Fragment>
                  )
                }
                return <div key={index}></div>
              })}
              {engineeringBlogs.slice(0, limit).map((page: IBlogPostPage, index: number) => {
                if (categoryIndex === 4) {
                  return (
                    <React.Fragment key={index}>
                      <div className={css.posts}>
                        <BlogThumbnail post={page} options={options} />
                      </div>
                    </React.Fragment>
                  )
                }
                return <div key={index}></div>
              })}
              {generalBlogs.slice(0, limit).map((page: IBlogPostPage, index: number) => {
                if (categoryIndex === 5) {
                  return (
                    <React.Fragment key={index}>
                      <div className={css.posts}>
                        <BlogThumbnail post={page} options={options} />
                      </div>
                    </React.Fragment>
                  )
                }
                return <div key={index}></div>
              })}
              {blogs.map((page: IBlogPostPage, index: number) => {
                if (categoryIndex === 10) {
                  if (searchQuery === '') {
                    return (
                      <React.Fragment key={index}>
                        <div className={css.posts}>
                          <BlogThumbnail post={page} options={options} />
                        </div>
                      </React.Fragment>
                    )
                  } else if (
                    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    page.tags.toLowerCase().includes(searchQuery.toLowerCase())
                  ) {
                    return (
                      <React.Fragment key={index}>
                        <div className={css.posts}>
                          <BlogThumbnail post={page} options={options} />
                        </div>
                      </React.Fragment>
                    )
                  }
                }
                return <div key={index}></div>
              })}
            </div>

            {limit < length && (
              <div className={css.loadBtn}>
                <ThemedButton type={THEME_BUTTON_TYPES.PRIMARY} onClick={loadMore}>
                  LOAD MORE
                </ThemedButton>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  )
}
export default BlogLanding
