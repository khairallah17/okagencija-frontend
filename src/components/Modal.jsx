import React from 'react'

const Modal = ({ open, children, onClose }) => {

  if (!open)
    return

  return (
    <div className='modal fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.48)] z-30'>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-30">
        <button onClick={onClose} className='curs'>x</button>
        {children}
      </div>
    </div>
  )
}

export default Modal