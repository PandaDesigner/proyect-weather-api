import { useEffect, useState } from 'react'
import {WeatherResponse} from "../models/weather/interface/weather.interface.ts";
import {WeatherEntity} from "../models/weather/domain/entities/weather.entity.ts";


export const HookWeather = () => {
    const [data, setData] = useState<WeatherEntity>()
    const [error, setError] = useState('')
    const [query, setQuery] = useState('')

    const mapperWeaterCity: (weather: WeatherResponse) => WeatherEntity = (weather: WeatherResponse) => {
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

    async function fecthData(param: string) {
        const url: string = 'https://api.openweathermap.org/data/2.5/weather'
        try {
            setError('');
            const response = await fetch(`${url}?units=metric&q=${param}&appid=${import.meta.env.VITE_API_WEATHER}`);
            const data = await response.json()
            console.log(mapperWeaterCity(data))
            setData(mapperWeaterCity(data))
        } catch (e) {
            setError('An error occurred while fetching data');
            console.error(e);
        }
    }


    useEffect(() => {
        if (query) {
            fecthData(query);
        }
    }, [query]);

    return {
        data,
        setQuery,
        error,
    };
}
