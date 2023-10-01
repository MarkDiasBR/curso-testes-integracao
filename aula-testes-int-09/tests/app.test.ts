import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should return 201 when creating a user", async () => {
    const user = {
      email: "teste@teste.com",
      password: "123456"
    }
    const { status } = await api.post("/users").send(user);
    expect(status).toBe(201);

    const { email } = await prisma.user
    .findUnique({ where: { email: user.email } });
    expect(email).toBe(user.email);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user = {
      email: "teste@teste.com",
      password: "123456"
    }
    await prisma.user.create({ data: user });

    const { status } = await api.post("/users").send(user);
    expect(status).toBe(409);
  });
});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user = {
      email: "teste@teste.com",
      password: "123456"
    }
    const insertion = await prisma.user.create({ data: user });

    const { status, body } = await api.get(`/users/${insertion.id}`);
    expect(status).toBe(200);
    expect(body).toMatchObject({ email: user.email, password: expect.any(String), id: insertion.id });
  });

  it("should return 404 when can't find a user by id", async () => {
    const { status } = await api.get("/users/1");
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    await prisma.user.create({
      data: {
        email: "teste1@teste.com",
        password: "123456"
      }
    });
    await prisma.user.create({
      data: {
        email: "teste2@teste.com",
        password: "123456"
      }
    });
    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(expect.arrayContaining([
      {
        email: "teste1@teste.com"
      },
      {
        email: "teste2@teste.com"
      }
    ]))
  });

})