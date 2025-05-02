import { WeatherEntity } from '../entities/weather.entity.ts';

export interface WeatherRepository {
    getWeatherForCity(city: string): Promise<WeatherEntity>;
}