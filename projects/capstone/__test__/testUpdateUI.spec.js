import { updateUI } from "../src/client/js/updateUI";

/**
 * @jest-environment jsdom
 */
describe("Test Update UI", () => {
    test("Testing update with countdown less than 7 days", () => {
        // Mock DOM
        document.body.innerHTML = `
        <input id="zip" type="text" />
        <input id="cntry" type="text" />
        <input id="state" type="text" />
        <input id="start" type="date" />
        <input id="end" type="date" />

        <div id="title"></div>
        <div id="msg"></div>
        <div id="hiTemp"></div>
        <div id="loTemp"></div>
        <div id="forecast"></div>
        <div id="length"></div>
        <div id="imgHolder"></div>`;
        let data = {
            city: "Atlanta",
            country: "United States",
            state: "Georgia",
            count: "3",
            length: "4",
            hiTemp: "75",
            loTemp: "54",
            weather: "Partly cloudy",
            picURL: "https://www.pinclipart.com/picdir/middle/527-5275692_transparent-question-mark-clipart-question-marks-free-clip.png"
            
        };
        updateUI(data);
            
        expect(document.getElementById("loTemp").innerHTML).toEqual("");
    })
    test("Testing with error input", () => {
         // Mock DOM
         document.body.innerHTML = `
         <input id="zip" type="text" />
         <input id="cntry" type="text" />
         <input id="state" type="text" />
         <input id="start" type="date" />
         <input id="end" type="date" />
 
         <div id="title"></div>
         <div id="msg"></div>
         <div id="hiTemp"></div>
         <div id="loTemp"></div>
         <div id="forecast"></div>
         <div id="length"></div>
         <div id="imgHolder"></div>`;

         let data = {
             error: "There was an error"
         };

         updateUI(data);

         expect(document.getElementById("msg").innerHTML).toEqual("");
    })
})