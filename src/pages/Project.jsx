import React, { PureComponent } from 'react'
import Projects from '../components/Projects'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'

export default class Project extends PureComponent {
  render() {
    return (
      <div className='mb-10'>
        <Navbar />
       <Projects />
       <BottomNav />
      </div>
    )
  }
}
