# Latasha Storefront

Latasha is a React storefront for browsing products and collections, managing a shopping cart, and completing checkout. It uses Vite, React Router, Tailwind CSS, Motion, GSAP, and Three.js.

## Requirements

- Node.js 22.12 or newer (or Node.js 20.19 or newer)
- npm
- A running Latasha API backend for product and account data

## Run locally

Install the dependencies:

```sh
npm ci
```

Create a local environment file from the example:

```sh
cp .env.example .env
```

On PowerShell, use `Copy-Item .env.example .env` instead. Set `VITE_BACKEND_URL` in `.env` to the backend origin. The default is `http://127.0.0.1:8000`.

Start the development server:

```sh
npm run dev
```

Vite serves the app locally and proxies `/api` and `/media` requests to `VITE_BACKEND_URL`.

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `/api` | API base path used by the browser. Set this at build time if the API uses another URL. |
| `VITE_BACKEND_URL` | `http://127.0.0.1:8000` | Backend origin used by Vite's development proxy. |
| `API_PROXY_URL` | `http://host.docker.internal:8000` | Backend origin that the Docker Nginx server proxies `/api` and `/media` requests to. |

`VITE_*` variables are included in the client bundle at build time. Do not put secrets in them.

## Production build

Build the static app and preview it locally:

```sh
npm run build
npm run preview
```

The generated site is written to `dist/`. In production, configure the web server to serve the SPA fallback (`index.html`) and route `/api` and `/media` to the backend.

## Docker

Build the production image from the project directory:

```sh
docker build -t latasha-frontend .
```

Run it on port 8080 and connect it to a backend running on the host at port 8000:

```sh
docker run --rm -p 8080:80 --add-host=host.docker.internal:host-gateway -e API_PROXY_URL=http://host.docker.internal:8000 latasha-frontend
```

Open `http://localhost:8080`. If the backend runs at a different address, change `API_PROXY_URL`. On Linux, the backend must listen on an address reachable from Docker, such as `0.0.0.0:8000`. The container exposes an Nginx health endpoint at `/healthz`.

To use a different API base path in the built frontend, pass a build argument:

```sh
docker build --build-arg VITE_API_BASE_URL=https://api.example.com -t latasha-frontend .
```

## Pages

- `/` — Home and hero slider
- `/shop` — Shop
- `/product/:id` — Product details
- `/new-arrivals` — New arrivals
- `/collections` — Collections
- `/about` — About Latasha
- `/cart` — Shopping cart
- `/checkout` — Checkout

## Useful scripts

```sh
npm run dev      # Start the Vite development server
npm run build    # Create the production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```
