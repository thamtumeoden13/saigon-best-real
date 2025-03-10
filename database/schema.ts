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

