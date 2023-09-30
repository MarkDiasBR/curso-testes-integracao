import fibonacciSequence from "../src/utils/fibonacciSequence";
import random1to20 from "../src/utils/random1to20";
import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

describe("Consistency", () => {
  it("should return status code 200 for a valid query parameter", async () => {
    const { status } = await api.get("/fibonacci").query({ elements: random1to20() });
  });

  it("should return the expected array for a valid query parameter", async () => {
    const random = random1to20();
    const fibonacciArray = fibonacciSequence(random);
    const { body } = await api.get("/fibonacci").query({ elements: random });
    expect(body).toEqual(fibonacciArray);
  });
});

describe("Exceptions", () => {
  it("should return status code 400 when not given a query parameter called \"elements\"", async () => {
    const { status } = await api.get("/fibonacci").query({ element: 10 });
    expect(status).toBe(400);
  });

  it("should return status code 400 when \"elements\" query parameter is 0", async () => {
    const { status: status1 } = await api.get("/fibonacci").query({ elements: 0 });
    expect(status1).toBe(400);
  });

  it("should return status code 400 when \"elements\" query parameter is negative", async () => {
    const { status: status2 } = await api.get("/fibonacci").query({ elements: -1 });
    expect(status2).toBe(400);
  });

  it("should return status code 400 when \"elements\" query parameter is undefined", async () => {
    const { status: status3 } = await api.get("/fibonacci").query({ elements: undefined });
    expect(status3).toBe(400);
  });

  it("should return status code 400 when \"elements\" query parameter is null", async () => {
    const { status: status4 } = await api.get("/fibonacci").query({ elements: null });
    expect(status4).toBe(400);
  });

  it("should return status code 400 when \"elements\" query parameter is a NaN string starting with a number", async () => {
    const { status: status5 } = await api.get("/fibonacci").query({ elements: "5a" });
    expect(status5).toBe(400);
  });

  it("should return status code 400 when \"elements\" query parameter is a NaN string ending with a number", async () => {
    const { status: status6 } = await api.get("/fibonacci").query({ elements: "a5" });
    expect(status6).toBe(400);
  });

  it("should return status code 400 when \"elements\" query parameter is NaN", async () => {
    const { status: status7 } = await api.get("/fibonacci").query({ elements: NaN });
    expect(status7).toBe(400);
  });
});
