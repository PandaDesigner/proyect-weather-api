import { Dispatch, SetStateAction } from 'react';
import { WeatherResponse, WeatherMapper } from '../interface/weather.interface';

export interface WeatherRepository {
    getWeatherForCity(city: string): Promise<WeatherResponse>;
    mapperWeaterCity(weather: WeatherResponse): WeatherMapper;
}

export interface WeatherUseCase {
    setWeatherState(
        city: string,
        setState: Dispatch<SetStateAction<WeatherMapper | null>>
    ): Promise<void>;
}