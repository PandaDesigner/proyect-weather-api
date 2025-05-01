// weather.controller.ts
import { Dispatch, SetStateAction } from 'react';
import { WeatherMapper } from "../interface/weather.interface";
import { WeatherUseCase } from './weather.repository';
import { WeatherFetch } from './weather.fetch';

export class WeatherController implements WeatherUseCase {
    private static instance: WeatherController;
    private weatherFetch: WeatherFetch;

    constructor() {
        this.weatherFetch = new WeatherFetch();
    }

    public static getInstance(): WeatherController {
        if (!WeatherController.instance) {
            WeatherController.instance = new WeatherController();
        }
        return WeatherController.instance;
    }

    async setWeatherState(
        city: string,
        setState: Dispatch<SetStateAction<WeatherMapper | null>>
    ): Promise<void> {
        console.log('event desde setWeather:', city)
        try {
            const response = await this.weatherFetch.getWeatherForCity(city);
            const mapperData = this.weatherFetch.mapperWeaterCity(response);
            console.log('estamos aqui', mapperData)
            setState(mapperData);
        } catch (error) {
            throw new Error(String(error));
        }
    }
}