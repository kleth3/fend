const request = require('supertest');
import {app} from "../src/server/index";

describe('Post Endpoints', () => {
    test('Call location api', async () => {
        const data = {
            city: "atlanta"
        };
        const response = await request(app).post('/location').send(data);

        expect(response.status).toEqual(200);

    })
    test('Call current weather api', async() => {
        const locData = {
            city: "atlanta",
            country: "united states",
            state: "georgia",
            lat: "33.753746",
            lng: "-84.386330",
            days: 1
        };
        const response = await request(app).post('/currentWeather').send(locData);
        expect(response.statusCode).toEqual(200);
    })
    test('Call future weather api', async() => {
        const locData = {
            city: "atlanta",
            country: "united states",
            state: "georgia",
            lat: "33.753746",
            lng: "-84.386330",
            days: 8
        };
        const response = await request(app).post('/currentWeather').send(locData);
        expect(response.statusCode).toEqual(200);
    })
    test('Call pictureapi', async() => {
        const locData = {
            city: "atlanta",
            country: "united states",
            state: "georgia",
            lat: "33.753746",
            lng: "-84.386330",
            days: 8,
            hiTemp: "76",
            loTemp: "35",
            weather: "Partly cloudy"
        };
        const response = await request(app).post('/currentWeather').send(locData);
        expect(response.statusCode).toEqual(200);
    })
})
