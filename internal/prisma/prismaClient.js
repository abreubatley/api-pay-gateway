const { PrismaClient } = require('@prisma/client');

let prisma = new PrismaClient();

const setPrismaInstance = (newPrisma) => {
    prisma = newPrisma;
};

module.exports = { prisma, setPrismaInstance };
