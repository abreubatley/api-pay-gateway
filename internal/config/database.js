const { PrismaClient } = require('@prisma/client');
import prisma from "../prisma/prismaClient";


if (process.env.NODE_ENV === 'test') {
    const { setupTestDatabase } = require('../../tests/testDatabase');
    const { prisma: testPrisma } = setupTestDatabase();
    prisma.prisma = testPrisma;
} else {
    prisma.prisma = new PrismaClient();
}

module.exports = prisma;
