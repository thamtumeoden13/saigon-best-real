'use server'

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"

export const createBook = async (params: BookParams) => {
  console.log('createBook', { params })
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      succes: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    }

  } catch (error) {
    console.log(error)

    return {
      success: false,
      message: 'An error occurred while creating the book',
    }
  }
}