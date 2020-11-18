import { getCountdown } from "../src/client/js/getCountdown";

describe("Testing countdown", () => {
    test("Test getCountdown", () => {
        const inDate = new Date();
        const day = inDate.getDate();
        inDate.setDate(day + 1);
        expect(getCountdown(inDate)).toEqual(2);
    })
})