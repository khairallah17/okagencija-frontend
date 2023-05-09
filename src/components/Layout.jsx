import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div>
        <Header/>
        <main className='flex h-[92%]'>
            <Sidebar/>
            <div className="main-content p-5 max-h-full bg-primary-light w-full overflow-scroll">
                { children }
            </div>
        </main>
    </div>
  )
}

export default Layout