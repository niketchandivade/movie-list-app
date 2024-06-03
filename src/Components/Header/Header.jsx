import React from 'react'
import './header.css'

const Header = ({title =''}) => {
  return (
    <div className='header'>
      {title && <div className='header-title'>{title}</div>}
    </div>
  )
}

export default Header