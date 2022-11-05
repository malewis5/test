import React from 'react'

import BlogCarousel from './BlogCarousel/BlogCarousel'
import AboutGradient from './GradientSections/AboutGradient/AboutGradient'
import ContactGradient from './GradientSections/ContactGradient/ContactGradient'
import HomeHero from './HomeHero/HomeHero'
import ContactForm from './Hubspot/ContactForm/ContactForm'
import MountainBackgroundForm from './Hubspot/ContactForm/MountainBackgroundForm'
import StaffBackgroundForm from './Hubspot/ContactForm/StaffBackgroundForm'
import PartnerForm from './Hubspot/PartnerForm/PartnerForm'
import SubscribeForm from './Hubspot/SubscribeForm/SubscribeForm'
import WidgetSubscribeModal, { IWidgetSubscribeModalProps } from './Hubspot/SubscribeModal/WidgetSubscribeModal'
import ImageCarousel, { IImageCarouselProps } from './ImageCarousel/ImageCarousel'
import InsightCards from './InsightCards/InsightCards'
import JobsSection from './Jobs/JobsSection'
import LeadershipSection from './Leadership/LeadershipSection'
import LogoSection from './LogoSection/LogoSection'
import NewsCarousel, { INewsCarouselProps } from './NewsCarousel/NewsCarousel'
import TestimonialCarousel, { ITestimonialProps } from './TestimonialCarousel/TestimonialCarousel'
import VerticalCarousel from './VerticalCarousel/VerticalCarousel'

const renderNewsCarousel = (props: INewsCarouselProps) => {
  return <NewsCarousel {...props} />
}
const renderSubscribeForm = () => {
  return <SubscribeForm />
}
const renderSubscribeModal = (props: IWidgetSubscribeModalProps) => {
  return <WidgetSubscribeModal {...props} />
}
const renderContactForm = () => {
  return <ContactForm />
}
const renderPartnerForm = () => {
  return <PartnerForm />
}
const renderImageCarousel = (props: IImageCarouselProps) => {
  return <ImageCarousel {...props} />
}
const renderVerticalCarousel = () => {
  return <VerticalCarousel />
}
const renderHomeHero = () => {
  return <HomeHero />
}
const renderTestimonialCarousel = (props: ITestimonialProps) => {
  return <TestimonialCarousel {...props} />
}
const renderContactGradient = () => {
  return <ContactGradient />
}
const renderAboutGradient = () => {
  return <AboutGradient />
}
const renderStaffBackgroundForm = () => {
  return <StaffBackgroundForm />
}
const renderMountainBackgroundForm = () => {
  return <MountainBackgroundForm />
}
const renderBlogCarousel = () => {
  return <BlogCarousel />
}
const renderInsightCards = (props: any) => {
  return <InsightCards {...props} />
}
const renderLogoSection = () => {
  return <LogoSection />
}
const renderLeadershipSection = () => {
  return <LeadershipSection />
}
const renderJobs = () => {
  return <JobsSection />
}

export default {
  newsCarousel: renderNewsCarousel,
  subscribeForm: renderSubscribeForm,
  subscribeModal: renderSubscribeModal,
  contactForm: renderContactForm,
  partnerForm: renderPartnerForm,
  imageCarousel: renderImageCarousel,
  verticalCarousel: renderVerticalCarousel,
  homeHero: renderHomeHero,
  testimonialCarousel: renderTestimonialCarousel,
  contactGradient: renderContactGradient,
  aboutGradient: renderAboutGradient,
  logoSection: renderLogoSection,
  staffBackgroundForm: renderStaffBackgroundForm,
  mountainBackgroundForm: renderMountainBackgroundForm,
  blogCarousel: renderBlogCarousel,
  insightCards: renderInsightCards,
  leadershipSection: renderLeadershipSection,
  jobs: renderJobs,
}
