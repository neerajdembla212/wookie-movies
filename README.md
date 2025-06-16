### Brief
A React + TypeScript application that connects to the Wookiee Movie Database API to display genre-based carousels of movies and routing to detailed pages. Features robust scroll-restoration logic, accessibility compliance, and testing with Vitest + React Testing Library.

### Features
<b>Movie listing by genre</b>: grouped into carousels with titles.

<b>Infinite-title Routing</b>: each MovieCard routes to /movie/:slug, backed by React Router.

<b>Scroll Restoration</b>: using data-slug anchors, original scroll position is restored when navigating back to home.

<b>Lazy-rendered images</b>: via custom Image component featuring shimmer loading, error fallback, optimized attributes, and loading state.

<b>Search functionality</b>: input tied to React Router q parameter, with form-based handling and debouncing.

<b>Error boundaries</b>: route-level errorElement setup handles loader/renderer errors gracefully.

<b>Loading feedback</b>: per-route shimmer loaders (Home/Details) displayed while fetching.

### Architecture & Folder Structure

```
src/
├── assets/                      # static assets (fallback image, etc)
├── components/
│   ├── movie-card/             # MovieCard with intersection observer and scroll slug logic
│   ├── movie-carousel/         # Title + horizontal scroll container
│   ├── movie-list/             # Groups movies by genre & renders carousels
│   ├── movie-details/          # Details screen display
│   ├── loaders/                # HomePageLoader, DetailsPageLoader
│   └── header/                 # Header with search bar
├── hooks/
│   ├── useScrollRestoration.ts # Anchor-based scroll restoration logic
│   ├── useMoviesByGenre.ts     # Memo grouping by genres
│   └── useIntersectionObserver.ts # reusable logic for intersection observer
├── lib/
│   ├── http.ts                 # `http.get()` wrapper calling Wookie API
│   └── utils.ts                # Helper functions (format rating, get movie release year)
├── pages/
│   ├── Home.tsx                # Route `/` with loader & MovieList
│   └── Details.tsx             # Route `/movie/:slug` with loader & detail screen
├── routes.tsx                  # createBrowserRouter config
├── ui/
│   ├── image/
│   │   └── Image.tsx           # Custom image with loading and error handling
│   └── search-bar/
│       └── SearchBar.tsx       # Debounced search tied to query params
└── App.tsx                     # RouterProvider + global layout
```

### Setup Instructions
Clone this repo

Install dependencies

```
npm install
```
Add .env file:

```
VITE_WOOKIE_API_KEY=Bearer Wookie2021
```

Run dev server:

```
npm run dev
```
Run tests:

```
npm test
```

### Testing Coverage

#### Unit tests using Vitest + @testing-library:

Image component: "shimmer → loaded" state, error fallback.

http.get() wrapper behavior: success, error, missing keys.

useMoviesByGenre grouping consistency & memoization.

useScrollRestoration: scroll-trigger, presence / absence of anchors, route conditions.

#### Integration tests:

MovieCard renders correctly using mocked image module.

MovieList renders correct number of carousels/images.

Debounce-Enabled Search
Built with HTML <Form> from React Router.

Debounce logic via useRef + useCallback, delays navigation until 300ms pause in typing.

Uses defaultValue for controlled initial display, clears query on route back.

Scroll Restoration Logic
On click of card → store data-slug in sessionStorage('scroll-element').

On Home mount:

Read stored string.

Attempt querySelector([data-slug=…]).

If found → element.scrollIntoView({ behavior: "instant", block: "center" }) and remove key.

If missing → quietly preserve key.

If route ≠ '/', do nothing.

Fully tested for expected and edge-path behavior.

### Error Boundaries & Loading States
Configured React Router with errorElement and loader per route for better UX.

UI displays shimmer during pending navigation.state === 'loading' using per-route loader components.

