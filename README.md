# ETF Price Monitor App

## Setup Instructions

### Backend
`cd backend` \
`npm install` \
`npm run dev`

### Frontend
`cd frontend` \
`npm install` \
`npm run dev`

## API
POST /api/uploadEtfFile \
GET /api/getEtfPriceByTime \
GET /api/getLatestTop5Holdings

## Design and Implementation

### Backend
- The backend is built using Node.js and Express.
- ETFRoutes and ETFService modules are created to separate routing logic from the main business logic of processing ETF data.
- An 'ETF' model is used to load the intitial ETF data and facilitate retrieving constituent weights.

### Frontend
- The frontend is built using React and Vite.
- Reusable components such as DataTable, DataGraph, and DataBarChart are created in case we might want to scale the application in the future to a multipage application where we can reuse these components on different pages.

## Assumptions
- In the case that a constituent is not found in the ETF file but is present in the historical price data, it will have a default weight of 0.
- The application assumes that the ETF file is in a specific format, and in the case that a csv file in a different format is uploaded, it will cause errors in processing the data.