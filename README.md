# 🌤️ Skies — Weather App

A clean, real-time weather app built with React, TypeScript, Vite, and Tailwind CSS. Search any city in the world to get current weather conditions and a 4-day forecast — all with smooth Framer Motion animations.

## ✨ Features

- 🔍 **City search** — real-time weather for any city worldwide
- 📍 **Geolocation** — one-click weather for your current location
- 🌡️ **Unit toggle** — switch between °C and °F instantly
- ⏱️ **Hourly forecast** — next 8 time slots with precipitation probability
- 📅 **4-day forecast** — daily min/max with weather icons
- 💨 **Weather details** — humidity, wind speed & direction, pressure, visibility, sunrise/sunset
- 🎨 **Dynamic backgrounds** — gradient changes based on weather condition (sunny, rainy, cloudy, night...)
- ✨ **Framer Motion animations** — smooth transitions, staggered reveals, animated loading states

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 12 |
| API | OpenWeatherMap (free tier) |
| Fonts | Plus Jakarta Sans, Syne, JetBrains Mono |

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/mahmoud-codeee/weather-app.git
cd weather-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your API key

Copy `.env.example` to `.env` and add your free API key from [openweathermap.org](https://openweathermap.org/api):

```bash
cp .env.example .env
```

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 4. Run locally
```bash
npm run dev
```

Open [http://localhost:5173/weather-app/](http://localhost:5173/weather-app/)

### 5. Build for production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── SearchBar.tsx       # Search input + location button
│   │   └── UnitToggle.tsx      # °C / °F switcher with spring animation
│   ├── CurrentWeather.tsx      # Main weather display (temp, icon, description)
│   ├── WeatherDetails.tsx      # 8-tile detail grid (humidity, wind, etc.)
│   ├── ForecastCard.tsx        # 4-day daily forecast list
│   ├── HourlyForecast.tsx      # Horizontal hourly scroll
│   ├── LoadingState.tsx        # Animated loading rings
│   ├── EmptyState.tsx          # Initial state with city suggestions
│   └── ErrorState.tsx          # Error display with message
├── hooks/
│   ├── useWeather.ts           # Main weather data hook
│   └── useGeolocation.ts       # Browser geolocation wrapper
├── services/
│   └── weatherApi.ts           # OpenWeatherMap API integration
├── types/
│   └── weather.ts              # TypeScript types
├── utils/
│   ├── formatters.ts           # Time, temp, wind, visibility formatting
│   └── weatherHelpers.ts       # Condition mapping, gradients, accent colors
├── App.tsx
├── main.tsx
└── index.css
```

## 📝 License

MIT — free to use and modify.
