import React, { PureComponent } from 'react'
import Projects from '../components/Projects'
import Navbar from '../components/Navbar'

export default class Project extends PureComponent {
  render() {
    return (
      <div>
        <Navbar />
       <Projects />
      </div>
    )
  }
}
