import app from "../src/app";
import supertest from "supertest";

describe("GET /health", () => {
    it("should return the string \"OK!\" with status code 201", async () => {
        const result = await supertest(app).get("/health");
        expect(result.text).toEqual("OK!");
        expect(result.statusCode).toEqual(200);
    })
});