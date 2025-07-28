import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class HomeBtn extends Component {
  render() {
    return (
      <div>
        
              {/* Floating Go to Home button */}
              <Link
          to="/"
          className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Home
        </Link>
      </div>
    )
  }
}
