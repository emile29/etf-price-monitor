# ETF Price Monitor App

## Setup Instructions

### Prerequisites
- Node.js and npm installed on your machine.
- Requires at least Node v20.20.2
- If older version, install via nvm `nvm install 20`

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
- ETFRoutes and ETFService modules are created to separate the routing logic from the main business logic of processing ETF data. This separation also allows for better scalability if ever we decide to cater to other types of funds like mutual or index funds in the future.
- An 'ETF' model is used to load the intitial ETF data, facilitate retrieving constituent weights, and handle invalid data format.

### Frontend
- The frontend is built using React and Vite.
- Reusable components such as DataTable, DataGraph, and DataBarChart are created in case we might want to scale the application in the future to a multipage application where we can reuse these components on different pages.

## Assumptions
- We already have access to the historical price data for all the constituents on application startup.
- In the case that a constituent is not found in the ETF file but is present in the historical price data, it will have a default weight of 0.
- The application will only accept ETF csv files that are in a specific format, and in the case of invalid formats, it will display an error message.