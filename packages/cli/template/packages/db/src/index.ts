import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    });
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const client = globalThis.prismaGlobal ?? prismaClientSingleton();

export * from "@prisma/client";

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = client;
