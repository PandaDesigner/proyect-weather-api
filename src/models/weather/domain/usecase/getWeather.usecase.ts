import { WeatherEntity } from '../entities/weather.entity';

export interface GetWeatherUseCase {
   execute(city: string): Promise<WeatherEntity>;
}