import { WeatherResponse } from "../../interface/weather.interface.ts";
import { WeatherEntity } from "../../domain/entities/weather.entity.ts";
import { WeatherRepository } from "../../domain/repositories/weather.repository.ts";
import { WeatherApiClient } from "../api/weatherApi.client.ts";


const mapWeatherResponseToEntity = (weather: WeatherResponse): WeatherEntity => {
    if (!weather || !weather.weather || weather.weather.length === 0) {
        throw new Error("Invalid weather data");
    }
    return {
        id: weather.id,
        nameCity: weather.name,
        base: weather.base,
        visibility: weather.visibility,
        clouds: {
            all: weather.clouds.all,
        },
        main: weather.main,
        weather: {
            main: weather.weather[0].main,
            description: weather.weather[0].description,
            icon: weather.weather[0].icon,
            urlIcon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        },
        wind: weather.wind
    }
}

export class WeatherRepositoryImpl implements WeatherRepository {
    constructor(private readonly apiClient = new WeatherApiClient()) { }

    async getWeatherForCity(city: string): Promise<WeatherEntity> {
        const response = await this.apiClient.getWeatherData(city);
        return mapWeatherResponseToEntity(response);
    }
}