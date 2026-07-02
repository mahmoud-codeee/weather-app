export type Unit = "metric" | "imperial";

export interface CurrentWeather {
  city: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  description: string;
  icon: string;
  conditionCode: number;
  conditionMain: string;
  timezone: number;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  conditionCode: number;
  conditionMain: string;
  pop: number;
}

export interface DailyForecast {
  date: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  conditionCode: number;
  pop: number;
  items: ForecastItem[];
}

export type WeatherCondition =
  | "thunderstorm"
  | "drizzle"
  | "rain"
  | "snow"
  | "atmosphere"
  | "clear"
  | "clouds";
