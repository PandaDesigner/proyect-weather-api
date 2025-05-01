import { useEffect, useState } from 'react'
import { WeatherMapper } from '../interface/weather.interface'
import { WeatherController } from '../models/weather.controller';



export const WeatherHook = () => {
    const responseData = WeatherController.getInstance();
    const [data, setData] = useState<WeatherMapper | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {

        if (query) {
            setIsLoading(true);
            setError('');
            responseData.setWeatherState(query, setData).catch(error => {
                setError(error.message);
            }).finally(() => {
                setIsLoading(false)
            })
        }
    }, [query])

    return {
        isLoading,
        data,
        error,
        query,
        setQuery
    }
}