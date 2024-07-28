import React from 'react'
import WeHelp from '../Home/Sections/WeHelp'
import ExporeProducts from '../Home/Sections/ExporeProducts'
import Testimonials from '../../components/Testimonials'
import Hero from '../../components/Hero'

const Services = () => {
  return (
    <div>
        <Hero title="Services"/>
        <WeHelp/>
        <ExporeProducts />
        <Testimonials/>
    </div>
  )
}

export default Services