import dummyBooks from '@/constants/books.json'
import { books } from '@/database/schema';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import ImageKit from 'imagekit'

config({path: '.env.local'})

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKET_PRIVATE_KEY!,
})

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle({client:sql});

const uploadToImageKit = async ({ url, fileName, folder }: { url: string, fileName: string, folder: string }) => {

    try {
        const response = await imagekit.upload({
            file: url,
            fileName,
            folder,
        });

        return response.filePath;

    } catch (error) {
        console.log('Error uploading image to Imagekit: ', error);
        return ''
    }
}

const seed = async () => {
    console.log('Seeding data ...');

    try {

        for (const book of dummyBooks) {
            const coverUrl = await uploadToImageKit({
                url: book.coverUrl,
                fileName: `${book.title}.jpg`,
                folder: '/books/covers'
            })

            const videoUrl = await uploadToImageKit({
                url: book.videoUrl,
                fileName: `${book.title}.mp4`,
                folder: '/books/videos'
            })

            await db.insert(books).values({
                ...book,
                coverUrl,
                videoUrl
            })
        }

        console.log('Data seeded successfully')

    } catch (error) {
        console.error('Error seeding data: ',error)
    }
}

seed();