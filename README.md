# Better Weather

A weather dashboard built with Next.js 16 and the OpenWeatherMap One Call 3.0 API. Search any city to see current conditions, a 7-day forecast, hourly precipitation, and active weather alerts.

## Setup

**Prerequisites:** Node.js 20+, an [OpenWeatherMap API key](https://openweathermap.org/api/one-call-3) with One Call 3.0 enabled.

```bash
git clone <repo-url>
cd interview-assignment
npm install
cp .env.example .env.local
# Add your API key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production:** [your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)

### Environment variables

| Variable | Description |
|----------|-------------|
| `OPENWEATHER_API_KEY` | OpenWeatherMap API key |

---

## Assumptions & trade-offs

### API vs. domain contracts
I chose to keep the raw OpenWeatherMap types isolated in `lib/helpers/normalize.ts`. The rest of the app uses the app’s own domain types, so the application itself doesn’t need to know about OWM’s data structure. The idea is that if I later want to switch to a different weather provider, I primarily need to change the normalization layer rather than the rest of the app.

Trade-off: This adds more upfront structure than necessary for a single provider, but the architecture makes it clear where the external API dependency actually lives.

### Mock-data fallback instead of an error page
If the OWM API fails to deliver data, the app renders a complete UI with mock data, an error banner as feedback to the user, and a retry button — instead of a blank error page. This keeps the interface usable during data issues and gives the user a clear action to take.

Trade-off: The displayed data is not real, which can be confusing from a user’s perspective. The error banner is therefore shown prominently and remains visible until the issue is resolved.

### Modular architecture with clear layer boundaries
The project is structured into distinct layers: API integration (`lib/owm/`) → normalization (`lib/helpers/`) → domain contracts (`contracts/`) → UI components (`components/`). Each layer has a single responsibility, which promotes separation of concerns and makes it easy to understand where in the codebase changes should be made.

Trade-off: More structure than strictly necessary for a project of this size, but it produces a codebase that is easy to navigate where changes in one layer don’t bleed uncontrollably into others.

### Data fetching and caching strategy
Data fetching happens server-side to optimize performance and SEO. Each layer is cached independently with a lifetime that matches the nature of the data: coordinates never change (`cacheLife("max")`), weather data updates continuously (`cacheLife("hours")`). A central `owmFetch` layer handles the primary fetch logic across all calls.

Trade-off: Server-side data fetching can lead to longer initial loads compared to client-side fetching, but it provides better SEO and performance, especially on slower devices.

---

## What I would improve with more time

- **Tests** — unit tests and integration tests
- **Temperature unit toggle** — °C/°F stored in a cookie so the preference persists across sessions
- **Geolocation** — an explicit "Use my location" button
- **Weather chatbot** — a conversational interface powered by the OpenAI/Gemini API where users can ask NLP questions like "should I bike or drive to work today?"
- **Favourite cities** — save a handful of cities in localStorage and switch between them instantly without re-searching
---

## Time spent

17 hours approx.
