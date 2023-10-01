import prisma from "../../src/database";

async function createUser(email: string, password: string) {
    return await prisma.user.create({
        data: {
            email,
            password
        }
    });
}

export default createUser;