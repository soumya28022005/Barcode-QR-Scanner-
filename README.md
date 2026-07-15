# Harvest Line — QR Food Distribution (Frontend)

A frontend-only React app for scanning recipient QR tickets, capturing a food
preference, and giving organizers a live dashboard. **No backend or database
is included** — every network call goes through `src/services/api.js` and is
ready for another developer to wire up.

## Stack

- React 18 + Vite
- React Router v6
- Axios (single instance in `src/services/api.js`)
- Tailwind CSS
- [`@yudiel/react-qr-scanner`](https://www.npmjs.com/package/@yudiel/react-qr-scanner) for camera QR scanning

## Getting started

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE_URL to the real backend
npm run dev
```

The camera scanner requires HTTPS or `localhost` — most browsers block camera
access on plain HTTP for any other host.

## Project structure

```
src/
  components/   Navbar, QRScanner, FoodCard, SummaryCard, SearchBar, Loader, Toast, Modal
  pages/        QRScannerPage, FoodSelectionPage, TotalViewPage
  services/     api.js — the only file that knows about HTTP endpoints
  hooks/        useToast.jsx — global toast notifications
  utils/        format.js — food type constants + display formatters
```

## Routes

| Path              | Page             |
|-------------------|------------------|
| `/`               | QR Scanner (default) |
| `/food-selection` | Food selection (reached via router state after a successful scan) |
| `/total-view`     | Organizer dashboard |

## Backend integration points

All endpoints are called from `src/services/api.js` only — update that file
(and `.env`) once the real API is live. Nothing else needs to change.

| Function             | Method & path              | Request body / params        | Expected response |
|-----------------------|----------------------------|-------------------------------|--------------------|
| `verifyQrCode`        | `POST /verify-qr`          | `{ qrData }`                  | `{ alreadyCollected: true, message }` **or** `{ alreadyCollected: false, name, email }` |
| `submitFoodSelection` | `POST /food-selection`     | `{ email, foodType }`         | any 2xx response |
| `searchByEmail`       | `GET /search?email=`       | query param `email`           | array of records, or `{ results: [...] }` |
| `fetchSummary`        | `GET /summary`             | —                              | `{ totalRegistered, totalCollected, vegCount, nonVegCount, pureVegCount }` |
| `fetchRecords`        | `GET /records`             | optional query params         | array of records, or `{ results: [...] }` |

A "record" is expected to look like:

```json
{
  "name": "Soumya Chatterjee",
  "email": "soumya@gmail.com",
  "foodType": "veg",
  "collectedTime": "2026-07-15T10:22:00Z",
  "status": "Collected"
}
```

`foodType` should be one of `nonveg`, `veg`, `pureveg` (see `FOOD_TYPES` in
`src/utils/format.js`) so the UI can render the matching emoji/label.

`fetchSummary` and `fetchRecords` are not explicitly described in the original
brief but were added so the dashboard has something concrete to call — swap
or remove them freely to match the real API contract.

## Notes on behavior

- The scanner stops decoding the instant a code is read and won't fire twice
  for the same scan; it only starts listening again after the "Scan next"
  action or a successful selection submit.
- Camera permission/device errors are shown inline with a retry button
  instead of a blank camera view.
- The "Food already collected" state is a modal and intentionally does **not**
  navigate to Food Selection.
- After a successful food selection, a success toast fires and the app
  returns to the scanner automatically.
