import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import BlogPage from '../components/BlogPage'
import BottomNav from '../components/BottomNav'
export default class Blog extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <BlogPage />
        <BottomNav />
      </div>
    )
  }
}
