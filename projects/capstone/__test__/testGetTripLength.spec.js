import { TestScheduler } from "jest";
import { getTripLength } from "../src/client/js/getTripLength";

describe("Testing getting the trip length", () => {
    test("Get length of trip", () => {
        const start = new Date("11/5/2020");
        const end = new Date("11/7/2020");
        expect(getTripLength(start, end)).toEqual(2);
    })
})