import { auth } from '@/auth';
import Header from '@/components/Header'
import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { after } from 'next/server';
import React, { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {

  const session = await auth();

  if (!session) return redirect('/sign-in');

  after(async () => {
    if (!session?.user?.id) return;

    // get the user and see if the last acitvity date is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1)

      console.log('user',user)

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));

  });

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