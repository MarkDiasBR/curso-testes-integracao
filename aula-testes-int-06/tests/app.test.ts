import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return status code 200", async () => {
    const { status } = await api.get("/event");
    expect(status).toBe(200);
  });

  it("should return the expected object", async () => {
    const { body } = await api.get("/event");
    expect(body).toMatchObject(expect.objectContaining({
      id: 1,
      title: "Super Event!",
      image: "https://img.freepik.com/fotos-gratis/publico-animado-assistindo-fogos-de-artificio-de-confete-e-se-divertindo-no-festival-de-musica-a-noite-copiar-espaco_637285-559.jpg",
      date: "2023-07-21T00:00:00.000Z"
    }));
  });
    
});
