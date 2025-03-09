import BookList from '@/components/BookList'
import BookOverview from '@/components/BookOverview'
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { sampleBooks } from '@/lib/constants'
import React from 'react'

const Home = async () => {

  const result = await db.select().from(users);

  console.log(JSON.stringify(result, null, 2));

  return (
    <>
      <BookOverview 
        {...sampleBooks[0]}
      />

      <BookList 
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  )
}

export default Home