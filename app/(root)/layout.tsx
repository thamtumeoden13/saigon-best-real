import Header from '@/components/Header'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <main className='root-container'>
        <div className="mx-auto max-w-7xl">
            <Header />
            <div className='pb-20 mt-20'>
                {children}
            </div>
        </div>
    </main>
  )
}

export default Layout