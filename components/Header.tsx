
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { signOut } from '@/auth'
import { Button } from './ui/button'

const Header = () => {

    return (
        <header className='flex justify-between gap-5 my-10'>
            <Link href={"/"}>
                <Image
                    src={"/icons/logo.svg"}
                    alt='logo'
                    className=''
                    width={40}
                    height={40}

                />
            </Link>

            <ul className='flex flex-row  items-center gap-8'>
                <li>
                    <form action={async () => {
                        "use server";
                        await signOut();
                    }}
                        className='mb-10'
                    >
                        <Button>Logout</Button>
                    </form>

                    {/* <Link href='/my-profile'>
                        <Avatar>
                            <AvatarFallback className='bg-amber-100'>
                                {getInitials(session?.user?.name || "IN")}
                            </AvatarFallback>
                        </Avatar>
                    </Link> */}
                </li>
            </ul>
        </header>
    )
}

export default Header