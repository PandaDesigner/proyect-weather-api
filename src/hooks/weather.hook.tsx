import { useEffect, useState } from 'react'
import {WeatherEntity} from "../models/weather/domain/entities/weather.entity.ts";
import {WeatherController} from "../models/weather/presentation/weather.controller.ts";
import {WeatherService} from "../models/weather/application/weather.service.ts";
import {WeatherRepositoryImpl} from "../models/weather/infrastructure/repositories/weatherRepository.impl.ts";

const weatherRepository = new WeatherRepositoryImpl()
const weather = new WeatherService(weatherRepository)
const weatherDate = new WeatherController(weather)

export const WeatherHook = () => {
    const [data, setData] = useState<WeatherEntity | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {

        if (query) {
            setIsLoading ( true );
            setError ( '' );
            weatherDate.setWeatherState(query, setData)
                .then(() => {
                    setIsLoading ( false );
                })
                .catch((error) => {
                    setError ( String(error) );
                    setIsLoading ( false );
                });
        }

    }, [query])

    console.log(data)

    return {
        isLoading,
        data,
        error,
        query,
        setQuery
    }
}