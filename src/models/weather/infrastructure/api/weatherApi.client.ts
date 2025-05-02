import {WeatherResponse} from "../../interface/weather.interface.ts";

export class WeatherApiClient {
    private readonly url: string;

    constructor ( url: string = 'http://api.openweathermap.org/data/2.5/weather' ) {
        this.url = url;
    }

    async getWeatherData ( city: string ):Promise<WeatherResponse> {
        if(!import.meta.env.VITE_API_WEATHER) {
            throw new Error('API key is not defined');
        }
        const trimemedCity = city.trim();
        const response = await fetch(`${this.url}?q=${trimemedCity}&appid=${import.meta.env.VITE_API_WEATHER}&units=metric`);
        if ( !response.ok ) {
            throw new Error('Error fetching weather data');
        }
        return response.json();
    }
}