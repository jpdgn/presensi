import React from 'react'
/* component styles */


const Notification = ({text, message, hide}) => {

  return (
    <div className={"growler " + (text) + (hide)}>
      {message}
    </div>
  )
}

export default Notification
