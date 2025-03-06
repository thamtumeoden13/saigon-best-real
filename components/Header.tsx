"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {

    const pathname = usePathname();

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
                    <Link href='/library'
                        className={cn('text-base cursor-pointer capitalize',
                            pathname === '/library' ? 'text-light-200' : 'text-light-100'
                        )}
                    >
                        Library
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header