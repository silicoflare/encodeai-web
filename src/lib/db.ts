import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
await db.$connect();

export default db;
