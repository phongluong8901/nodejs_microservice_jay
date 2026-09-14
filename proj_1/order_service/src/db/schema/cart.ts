import type { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";


export const carts = pgTable("carts", {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updateAt: timestamp("update_at").notNull().defaultNow(),
});

export type Cart = InferSelectModel<typeof carts>;

