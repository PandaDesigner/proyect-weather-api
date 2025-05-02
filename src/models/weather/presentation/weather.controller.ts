import { Dispatch, SetStateAction } from 'react';
import { WeatherEntity } from '../domain/entities/weather.entity';
import { GetWeatherUseCase } from '../domain/usecase/getWeather.usecase';


export class WeatherController {
    constructor(private readonly getWeatherUseCase: GetWeatherUseCase) {
    }

    async setWeatherState(
        city: string,
        setState: Dispatch<SetStateAction<WeatherEntity | null>>
    ): Promise<void> {
        try {
            const weather = await this.getWeatherUseCase.execute(city);
            setState(weather);
        } catch (error) {
            setState(null);
            throw new Error(String(error));
        }
    }
}