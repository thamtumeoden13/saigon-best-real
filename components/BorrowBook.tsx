'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/books';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    }
}

const BorrowBook = ({ bookId, userId, borrowingEligibility: { isEligible, message } }: Props) => {

    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false)

    const handleBorrow = async () => {
        if (!isEligible) {
            toast.error('Error', {
                description: message
            })
            return
        }

        setBorrowing(true)

        try {
            const result = await borrowBook({ bookId, userId });

            if (result.success) {
                toast.success('Success', { description: 'Book borrowed successfully' })
                router.push("/my-profile");
            } else {
                toast.error('Error', { description: "An error occurred while borrowing the book" })
            }
        } catch (error) {
            toast.error('Error', {
                description: 'An error occurred borrowing the book'
            })
        } finally {
            setBorrowing(false)
        }
    }

    return (
        <Button className='book-overview_btn' onClick={handleBorrow} disabled={borrowing}>
            <Image
                src="/icons/book.svg"
                alt='borrow book'
                width={20}
                height={20}
            />
            <p className='font-bebas-neue text-xl text-dark-100'>
                {borrowing ? 'Borrwing...' : 'Borrow book'}
            </p>
        </Button>
    )
}

export default BorrowBook