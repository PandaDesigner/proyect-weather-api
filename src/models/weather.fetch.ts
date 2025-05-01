import {WeatherResponse , WeatherMapper} from '../interface/weather.interface';
import {WeatherRepository} from './weather.repository';


export class WeatherFetch implements WeatherRepository {
    private readonly url: string;

    constructor(url: string = 'https://api.openweathermap.org/data/2.5/weather') {
        this.url = url;
    }

    async getWeatherForCity(city: string): Promise<WeatherResponse> {
        try {
            if (!import.meta.env.VITE_API_WEATHER) {
                throw new Error('Problema con las variables de entorno');
            }

            const trimmedCity = city.trim();

            const response = await fetch(
                `${this.url}?units=metric&q=${encodeURIComponent(trimmedCity)}&appid=${import.meta.env.VITE_API_WEATHER}`
            );

            if (!response.ok) {
                throw new Error(`Error en la API: 
                    ${response.status} ${response.statusText}`);
            }

            return await response.json ();
        } catch (error) {
            throw new Error(error instanceof Error
                ? error.message
                : 'Failed to fetch weather data');
        }
    }
    mapperWeaterCity(weather: WeatherResponse): WeatherMapper {
        if (!weather || !weather.weather || weather.weather.length === 0) {
            throw new Error('Datos de clima inválidos');
        }
        return {
            id: weather.id,
            nameCity: weather.name,
            base: weather.base,
            visibility: weather.visibility,
            clouds: {
                all: weather.clouds.all
            },
            main: {
                temp: weather.main.temp,
                feels_like: weather.main.feels_like,
                temp_min: weather.main.temp_min,
                temp_max: weather.main.temp_max,
                pressure: weather.main.pressure,
                humidity: weather.main.humidity,
            },
            weather: {
                main: weather.weather[0]?.main,
                description: weather.weather[0].description,
                icon: weather.weather[0].icon,
                urlIcon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
            },
            wind: {
                speed: weather.wind.speed,
                deg: weather.wind.deg,

            }
        }
    }
}
