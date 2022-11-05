import React from 'react'

import ContactForm from './ContactForm'
import css from './ContactForm.scss'

// const staff = '../../../../../../static/Staff-Grid.jpg'

const StaffBackgroundForm = () => {
  return (
    <div
      className={css.staffForm}
      // role={'img'}
      // title={'A collage of photos representing the people who work at PeakActivity.'}
    >
      <ContactForm />
    </div>
  )
}

export default StaffBackgroundForm
