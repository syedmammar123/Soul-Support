import React from 'react'
import LiveSession from '../../components/Livesession'
import Test from '../../components/Test'

const Session = () => {
  return (
    <div>
        <Test/>
        {/* Happening now! */}
        <br />

        <LiveSession/>
    </div>
  )
}

export default Session