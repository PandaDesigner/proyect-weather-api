
export interface WeatherResponse {
    id: number;
    name: string;
    base: string;
    visibility: number;
    clouds: { all: number };
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
}