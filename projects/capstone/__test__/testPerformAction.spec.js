/**
 * @jest-environment jsdom
 */

import { performAction } from "../src/client/js/app";

describe("Test Perform Action", () => {
    test("Test empty input", () => {
        // Mock DOM
        document.body.innerHTML = `
        <input id="zip" type="text" />
        <input id="cntry" type="text" />
        <input id="state" type="text" />
        <input id="start" type="date" />
        <input id="end" type="date" />
        <button id="generate"></button>

        <div id="title"></div>
        <div id="msg"></div>
        <div id="hiTemp"></div>
        <div id="loTemp"></div>
        <div id="forecast"></div>
        <div id="length"></div>
        <div id="imgHolder"></div>`;

        const btn = document.getElementById("generate");
        btn.addEventListener('click', performAction);

        expect(() => {
            btn.simulate('click');
        }).toThrow();
    })
})