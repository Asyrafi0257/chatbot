import {PrismaClient} from "@/app/generated/prisma/client";
import {PrismaPg } from "@prisma/adapter-pg";

//buat connection dulu
const connectionString = process.env.DATABASE_URL;

//check if connection not exist
if(!connectionString){
    throw new Error("DATABASE_URL not exist inside file.env");
}

//build postgresSQL adapter using connection string - guna ni untuk communicate dengan postgres
//kita guna new untuk cipta object baru daripada class PrismaPg
const adapter = new PrismaPg({
    connectionString,
})

//globalThis => adalah object global dalam node.js
//           => means ia object yang boleh diakses dari mana ii fail in applikasi
//Bahagian ni nak elak daripada PrismaClient dibuat banyak kalo semasa Nextjs development
const globalForPrisma = globalThis as unknown as {
    prisma : PrismaClient | undefined;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter});

//digunakan untuk production
if(process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma
}