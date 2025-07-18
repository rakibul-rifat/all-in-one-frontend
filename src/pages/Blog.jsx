import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import BlogPage from '../components/BlogPage'
export default class Blog extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <BlogPage />
      </div>
    )
  }
}
