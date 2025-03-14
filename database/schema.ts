import { varchar, pgTable, serial, text, timestamp, uuid, integer, pgEnum, date } from 'drizzle-orm/pg-core';

export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVE', 'REJECT']);
export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);
export const BORROW_STATUS_ENUM = pgEnum('borrow_status', ['OVERDUE', 'BORROWED', 'RETURNED']);

export const users = pgTable('users', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    fullName: varchar('full_name').notNull(),
    email: text('email').notNull().unique(),
    universityId: integer('university_id').notNull().unique(),
    universityCard: text('university_card').notNull(),
    password: text('password').notNull(),
    status: STATUS_ENUM('status').default('PENDING'),
    role: ROLE_ENUM('role').default('USER'),
    lasActivityDate: date("last_activity_date").defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const books = pgTable('books', {
    id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    author: varchar('author', { length: 255 }).notNull(),
    genre: text('genre').notNull(),
    rating: integer('string').notNull(),
    coverUrl: text('cover_url').notNull(),
    coverColor: varchar('cover_color', { length: 7 }).notNull(),
    description: text('description').notNull(),
    totalCopies: integer('total_copies').notNull().default(1),
    availableCopies: integer('available_copies').notNull().default(0),
    videoUrl: text('video_url').notNull(),
    summary: text('summary').notNull(),
    createAt: timestamp('create_at', { withTimezone: true }).defaultNow(),
})