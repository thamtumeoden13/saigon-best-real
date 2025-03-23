import { Session } from 'next-auth'
import React from 'react'
import { SearchInput } from '../ui/search-input'

const Header = ({ session,
  subtitle = "Monitor all of your projects and tasks here",
  onSearch,
}: {
  session: Session;
  subtitle?: String;
  onSearch?: (value: string) => void
}) => {
  return (
    <header className='admin-header'>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {session?.user?.name}</h1>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>

      <div className="w-full md:w-auto max-w-md">
        <SearchInput onSearch={onSearch} containerClassName="w-full md:w-[400px]" />
      </div>
    </header>
  )
}

export default Header