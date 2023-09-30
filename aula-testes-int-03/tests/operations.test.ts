import calculator from "calculator";

describe('Default calculator operations', () => {
    it("should return 3 for 4 and 1 params", () => {
        const sub = calculator.sub(4, 1);
        expect(sub).toEqual(3);
    });

    it("should return 7 for 4 and 3 params", () => {
        const sum = calculator.sum(4, 3);
        expect(sum).toEqual(7);
    });

    it("should return 3 for 9 and 3 params", () => {
        const div = calculator.div(9, 3);
        expect(div).toEqual(3);
    });

    it("should return 12 for 4 and 3 params", () => {
        const mul = calculator.mul(4, 3);
        expect(mul).toEqual(12);
    });
});