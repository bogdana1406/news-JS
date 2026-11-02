# The Daily Dispatch

An adaptive news portal migrated from the [RS School news-JS starter](https://github.com/rolling-scopes-school/news-JS) to strict TypeScript. Browse sources and open the latest stories in a responsive editorial layout.

## Run locally

```bash
npm ci
npm start
```

Without a `.env` file, the app uses the [RS School News API proxy](https://rss-news-api.onrender.com/) mock endpoints. The mock data is static and only contains articles from ABC News.

To use live NewsAPI data locally, copy `.env.example` to `.env` and set your own key:

```text
API_URL=https://newsapi.org/v2/
API_KEY=your-own-newsapi-key
```

The `.env` file is ignored by Git. Webpack embeds environment values into browser code, so **never publish a build made with a private API key**. The demo deployment command explicitly clears the key and uses the mock endpoints.

## Checks and deployment

```bash
npm run typecheck   # TypeScript strict check
npm run lint        # ESLint with typescript-eslint/recommended
npm run build       # Production build with local environment
npm run build:demo  # Public build without an API key
npm run deploy      # Publish the demo build to gh-pages
```

Demo: [bogdana1406.github.io/news-JS](https://bogdana1406.github.io/news-JS/)

## TypeScript migration

-   `src/types/news.ts` describes NewsAPI sources, articles, success and error responses, request options and callbacks.
-   `Endpoint` is an enum; `ApiResult<T>` is a union type; `Loader.getResp<T>` uses a generic response map.
-   `Pick`, `Partial`, and `Readonly` express source summaries, optional query options, and immutable request data.
-   Application, controller, loader, and view classes use typed members, parameters, return values, and access modifiers.
-   `tsconfig.json` enables `strict` and `noImplicitAny`; ESLint enforces `@typescript-eslint/no-explicit-any`.

The [RS School logo](https://github.com/rolling-scopes-school/rs.school-site/blob/master/docs/images/rs_school_js.svg) is included in the footer.
