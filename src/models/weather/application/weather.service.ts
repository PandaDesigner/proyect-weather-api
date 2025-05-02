import { WeatherEntity } from '../domain/entities/weather.entity';
import { GetWeatherUseCase } from '../domain/usecase/getWeather.usecase';
import {WeatherRepository} from "../domain/repositories/weather.repository.ts";


export class WeatherService implements GetWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) { }

    async execute(city: string): Promise<WeatherEntity> {
        return this.weatherRepository.getWeatherForCity(city);
    }
}