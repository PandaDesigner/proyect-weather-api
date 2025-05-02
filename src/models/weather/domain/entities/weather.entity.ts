export interface WeatherEntity {
    id: number;
    nameCity: string;
    base: string;
    visibility: number;
    clouds: {
        all: number;
    };
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: {
        main: string;
        description: string;
        icon: string;
        urlIcon: string;
    };
    wind: {
        speed: number;
        deg: number;
    };
}