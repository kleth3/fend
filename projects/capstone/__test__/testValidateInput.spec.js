import { validateInput } from "../src/client/js/validateInput";

describe ("Testing input validation", () => {
    test("Testing missing city", () => {
       
        function callValidateCity(){
            const missingCity = {
                city: "",
                start: "12/18/2020",
                end: "12/19/2020"
            };
            validateInput(missingCity);
        }
        
       expect(callValidateCity).toThrow();
    })
    test("Testing missing start date", () => {
        function callValidateStart(){
            const missingStart = {
                city: "atlanta",
                start: "",
                end: "12/20/2020"
            };
            validateInput(missingStart);
        }
        expect(callValidateStart).toThrow();
    })
    test("Testing missing end date", () => {
        function callValidateEnd(){
            const missingEnd = {
                city: "atlanta",
                start: "12/20/2020",
                end: ""
            };
            validateInput(missingEnd);
        }
        expect(callValidateEnd).toThrow();
    })
    test("Testing start before current date", () => {
        function callValidateEarlyStart(){
            const earlyStart = {
                city: "atlanta",
                start: "1/4/2020",
                end: "1/5/2020"
            }
            validateInput(earlyStart);
        }
        expect(callValidateEarlyStart).toThrow();
    })
    test("Testing end date before start date", () => {
        function callValidateEarlyEnd(){
            const earlyEnd = {
                city: "atlanta",
                start: "12/20/2020",
                end: "12/18/2020"
            }
            validateInput(earlyEnd);
        }
        expect(callValidateEarlyEnd).toThrow();
    })
})